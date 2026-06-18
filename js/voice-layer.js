/**
 * Mariam AI - Voice Layer (Web Speech API)
 *
 * Independent abstraction over the browser's SpeechRecognition (STT) and
 * SpeechSynthesis (TTS) APIs. Designed so it can later be swapped for a
 * professional voice service (e.g. server-side STT/TTS) without touching
 * the chat UI or the conversation engine.
 *
 * No audio is ever recorded, stored, or uploaded by this layer - the browser
 * streams audio directly to the OS speech engine for transcription only.
 *
 * Public API:
 *   MARIAM_VOICE.isRecognitionSupported()
 *   MARIAM_VOICE.isSynthesisSupported()
 *   MARIAM_VOICE.startListening({ lang, onResult, onInterim, onError, onEnd })
 *   MARIAM_VOICE.stopListening()
 *   MARIAM_VOICE.speak(text, { lang, onStart, onEnd, onError })
 *   MARIAM_VOICE.stopSpeaking()
 *   MARIAM_VOICE.isListening()
 *   MARIAM_VOICE.isSpeaking()
 */
(() => {
  const SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition;
  const synth = window.speechSynthesis;

  let recognizer = null;
  let listening = false;
  let speaking = false;

  function isRecognitionSupported() {
    return Boolean(SpeechRecognitionImpl);
  }

  function isSynthesisSupported() {
    return Boolean(synth);
  }

  function isListening() {
    return listening;
  }

  function isSpeaking() {
    return speaking;
  }

  /**
   * Start listening for speech. Microphone permission is requested by the
   * browser only when this is called - never automatically on page load.
   *
   * @param {object} options
   * @param {string} options.lang BCP-47 language tag, e.g. "ar-SA" or "en-US"
   * @param {(finalText:string)=>void} options.onResult called once with the final transcript
   * @param {(interimText:string)=>void} [options.onInterim] called repeatedly while speaking
   * @param {(error:string)=>void} options.onError called with a human-readable error code
   * @param {()=>void} [options.onEnd] called when listening stops (success, error, or manual stop)
   */
  function startListening({ lang = "ar-SA", onResult, onInterim, onError, onEnd } = {}) {
    if (!isRecognitionSupported()) {
      onError?.("unsupported");
      return;
    }
    if (listening) return;

    recognizer = new SpeechRecognitionImpl();
    recognizer.lang = lang;
    recognizer.interimResults = Boolean(onInterim);
    recognizer.continuous = false;
    recognizer.maxAlternatives = 1;

    let finalTranscript = "";

    recognizer.onstart = () => { listening = true; };

    recognizer.onresult = event => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript;
        else interim += transcript;
      }
      if (interim) onInterim?.(interim.trim());
      if (finalTranscript) onResult?.(finalTranscript.trim());
    };

    recognizer.onerror = event => {
      const map = {
        "not-allowed": "permission-denied",
        "service-not-allowed": "permission-denied",
        "no-speech": "no-speech",
        "audio-capture": "no-microphone",
        network: "network"
      };
      onError?.(map[event.error] || "unknown");
    };

    recognizer.onend = () => {
      listening = false;
      onEnd?.();
    };

    try {
      recognizer.start();
    } catch {
      listening = false;
      onError?.("unknown");
    }
  }

  function stopListening() {
    if (recognizer && listening) {
      recognizer.stop();
    }
  }

  /**
   * Speak text aloud. Voice/language is chosen automatically based on `lang`.
   *
   * @param {string} text
   * @param {object} options
   * @param {string} options.lang "ar" or "en" (or a full BCP-47 tag)
   */
  function speak(text, { lang = "ar", onStart, onEnd, onError } = {}) {
    if (!isSynthesisSupported() || !text) {
      onError?.("unsupported");
      return;
    }
    stopSpeaking();

    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = lang.startsWith("ar") ? "ar-SA" : (lang.startsWith("en") ? "en-US" : lang);
    utterance.rate = lang.startsWith("ar") ? 0.88 : 0.92;
    utterance.pitch = 1.03;
    utterance.volume = 0.94;

    const voices = synth.getVoices();
    const languageVoices = voices.filter(voice => voice.lang === utterance.lang || voice.lang.startsWith(utterance.lang.split("-")[0]));
    const preferred = languageVoices.find(voice => /female|woman|samantha|laila|layla|majedah|maged|zira/i.test(voice.name))
      || languageVoices.find(voice => voice.localService)
      || voices.find(voice => voice.lang === utterance.lang)
      || voices.find(voice => voice.lang.startsWith(utterance.lang.split("-")[0]));
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => { speaking = true; onStart?.(); };
    utterance.onend = () => { speaking = false; onEnd?.(); };
    utterance.onerror = () => { speaking = false; onError?.("unknown"); };

    synth.speak(utterance);
  }

  function stopSpeaking() {
    if (synth && (synth.speaking || synth.pending)) {
      synth.cancel();
    }
    speaking = false;
  }

  const api = Object.freeze({
    isRecognitionSupported,
    isSynthesisSupported,
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.MARIAM_VOICE = api;
})();
