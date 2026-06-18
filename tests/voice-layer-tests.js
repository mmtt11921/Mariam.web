const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const base = path.join(__dirname, "..");

function loadVoiceLayer(windowMock) {
  const context = { window: windowMock };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(base, "js/voice-layer.js"), "utf8"), context);
  return context.window.MARIAM_VOICE;
}

const failures = [];
let total = 0;

function check(label, condition) {
  total += 1;
  if (!condition) failures.push(label);
}

// --- 1. Browser without SpeechRecognition / SpeechSynthesis (full text fallback) ---
(() => {
  const voice = loadVoiceLayer({});
  check("unsupported: isRecognitionSupported() is false", voice.isRecognitionSupported() === false);
  check("unsupported: isSynthesisSupported() is false", voice.isSynthesisSupported() === false);

  let errorCode = null;
  voice.startListening({ onError: code => { errorCode = code; } });
  check("unsupported: startListening reports 'unsupported'", errorCode === "unsupported");

  let speakError = null;
  voice.speak("hello", { onError: code => { speakError = code; } });
  check("unsupported: speak reports 'unsupported'", speakError === "unsupported");
})();

// --- 2. Microphone permission denied ---
(() => {
  class FakeRecognition {
    constructor() { FakeRecognition.instance = this; }
    start() {
      this.onstart?.();
      // Simulate the browser immediately rejecting microphone access.
      this.onerror?.({ error: "not-allowed" });
      this.onend?.();
    }
    stop() { this.onend?.(); }
  }
  const voice = loadVoiceLayer({ SpeechRecognition: FakeRecognition });

  let errorCode = null;
  let ended = false;
  voice.startListening({ onError: code => { errorCode = code; }, onEnd: () => { ended = true; } });
  check("permission-denied maps to 'permission-denied'", errorCode === "permission-denied");
  check("permission-denied still calls onEnd", ended === true);
  check("listener is not stuck listening after error", voice.isListening() === false);
})();

// --- 3. No speech detected ---
(() => {
  class FakeRecognition {
    start() {
      this.onstart?.();
      this.onerror?.({ error: "no-speech" });
      this.onend?.();
    }
    stop() {}
  }
  const voice = loadVoiceLayer({ SpeechRecognition: FakeRecognition });
  let errorCode = null;
  voice.startListening({ onError: code => { errorCode = code; } });
  check("no-speech maps to 'no-speech'", errorCode === "no-speech");
})();

// --- 4. Successful recognition returns final transcript ---
(() => {
  class FakeRecognition {
    start() {
      this.onstart?.();
      this.onresult?.({
        resultIndex: 0,
        results: [[{ transcript: "وش مشاريعك" }]].map(alts => Object.assign(alts, { isFinal: true }))
      });
      this.onend?.();
    }
    stop() {}
  }
  const voice = loadVoiceLayer({ SpeechRecognition: FakeRecognition });
  let finalText = null;
  voice.startListening({ onResult: text => { finalText = text; } });
  check("successful recognition returns transcript", finalText === "وش مشاريعك");
})();

// --- 5. Text-to-speech start/stop lifecycle ---
(() => {
  let cancelled = false;
  let spokenUtterance = null;
  class FakeUtterance {
    constructor(text) { this.text = text; this.lang = ""; this.rate = 1; this.pitch = 1; }
  }
  const fakeSynth = {
    speaking: false,
    pending: false,
    getVoices: () => [],
    speak: utterance => {
      spokenUtterance = utterance;
      fakeSynth.speaking = true;
      utterance.onstart?.();
    },
    cancel: () => { cancelled = true; fakeSynth.speaking = false; }
  };
  const voice = loadVoiceLayer({ SpeechSynthesisUtterance: FakeUtterance, speechSynthesis: fakeSynth });

  let started = false;
  voice.speak("أهلاً وسهلاً", { lang: "ar", onStart: () => { started = true; } });
  check("speak() invokes synth.speak", spokenUtterance !== null);
  check("speak() sets Arabic voice lang", spokenUtterance.lang === "ar-SA");
  check("onStart callback fires", started === true);
  check("isSpeaking() true while speaking", voice.isSpeaking() === true);

  voice.stopSpeaking();
  check("stopSpeaking() calls synth.cancel", cancelled === true);
  check("isSpeaking() false after stop", voice.isSpeaking() === false);
})();

// --- 6. English TTS uses en-US ---
(() => {
  let spokenUtterance = null;
  class FakeUtterance {
    constructor(text) { this.text = text; this.lang = ""; }
  }
  const fakeSynth = {
    speaking: false, pending: false,
    getVoices: () => [],
    speak: utterance => { spokenUtterance = utterance; },
    cancel: () => {}
  };
  const voice = loadVoiceLayer({ SpeechSynthesisUtterance: FakeUtterance, speechSynthesis: fakeSynth });
  voice.speak("Hello there", { lang: "en" });
  check("speak() sets English voice lang", spokenUtterance.lang === "en-US");
})();

const accuracy = ((total - failures.length) / total) * 100;
console.log(`Mariam AI voice layer: ${accuracy.toFixed(1)}% (${total - failures.length}/${total})`);
failures.forEach(failure => console.log(`FAILED: ${failure}`));
if (accuracy < 100) process.exitCode = 1;
