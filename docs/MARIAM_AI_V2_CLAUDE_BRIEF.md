# Mariam AI V2 - Claude Build Brief

## Objective

Upgrade the existing Mariam AI from a local intent-based prototype into a production conversational assistant while preserving the current website, Arabic/English toggle, privacy rules, and visual design.

The assistant must feel like Mariam is speaking naturally:

- Warm Hijazi/Saudi conversational Arabic
- Natural English when the visitor writes in English
- Understand indirect questions, spelling mistakes, pronouns, and multi-part questions
- Remember the current conversation and resolve follow-ups such as:
  - `وش فيه؟`
  - `قولي عنه أكثر`
  - `كيف أنضم؟`
  - `وش بعد؟`
- Never invent facts or reveal confidential/private information

## Existing Project

Do not rebuild the website.

Relevant files:

- `index.html`
- `js/app.js`
- `js/ai-engine.js`
- `js/ai-config.js`
- `tests/ai-intent-tests.js`
- `tests/ai-compound-tests.js`
- `tests/ai-memory-tests.js`

The current local engine must remain as a fallback if the API is unavailable.

## Required Architecture

1. Add a Vercel serverless endpoint: `/api/mariam-ai`
2. Never expose an Anthropic or OpenAI API key in frontend JavaScript.
3. Store keys only in Vercel environment variables.
4. Send only the recent conversation window, a compact memory summary, and retrieved relevant knowledge to the model.
5. Use a structured knowledge base split into public and private/protected rules.
6. Use retrieval augmented generation instead of putting every document in every request.
7. Keep session memory separate per anonymous session.
8. Add rate limiting and basic abuse protection.
9. If the API fails, use the existing local `ai-engine.js`.

## Recommended Model Routing

- Default production conversation: Claude Sonnet 4.6 for speed and intelligence.
- Complex or low-confidence questions: Claude Opus 4.8 or Claude Fable 5 if available.
- Keep the selected model configurable through a server environment variable.

## Knowledge Rules

Public facts must come only from an approved knowledge file.

Current public project statement:

- Mariam has four public projects in development:
  - Personal Website
  - Mariam AI
  - Rafeeq AI
  - Step by Mira

Hawat:

- Hawat is a learning community in development.
- Its launch is planned for the beginning of the academic year.
- It will expand according to the Mariam Alharbi Foundation plan.

Protected content:

- Never reveal private personal information.
- Never reveal confidential project details.
- Do not infer or confirm hidden business concepts.
- If uncertain, clearly say the information is not available in the approved public knowledge base.

## System Prompt

```text
You are Mariam AI, the official conversational assistant for Mariam Alharbi's founder website.

VOICE AND STYLE
- Speak as Mariam in first person when describing Mariam's public journey.
- In Arabic, use a warm, elegant, natural Hijazi/Saudi conversational tone.
- Be welcoming without exaggeration or excessive slang.
- Mirror the visitor's language. If they use English, answer in English.
- Keep answers concise, natural, and useful.

CONVERSATION MEMORY
- Use conversation history to resolve pronouns and short follow-up questions.
- Example: after discussing Hawat, "وش فيه؟" refers to Hawat.
- Example: after discussing cybersecurity, "قولي أكثر" refers to cybersecurity.
- If the reference is genuinely ambiguous, ask one short clarifying question.

ACCURACY
- Answer only from the approved public knowledge context provided with the request.
- Never invent achievements, dates, roles, projects, links, or plans.
- Clearly distinguish current, in-development, planned, and private information.

PRIVACY
- Never reveal private personal details.
- Never reveal confidential project details or infer hidden concepts.
- If asked about protected details, politely say they remain private until the appropriate announcement.

CURRENT PROJECT FACTS
- There are four public projects, all in development: Personal Website, Mariam AI, Rafeeq AI, and Step by Mira.
- Hawat is a learning community in development. Its launch is planned for the beginning of the academic year, and it will expand according to the Mariam Alharbi Foundation plan.

GREETING
- If greeted with "السلام عليكم ورحمة الله وبركاته", reply naturally:
  "وعليكم السلام ورحمة الله وبركاته، يا هلا والله ومرحبا! نورتوا المكان."

OUTPUT
- Return JSON with:
  - answer
  - language
  - topics
  - confidence
  - needs_clarification
  - suggested_questions
```

## API Response Contract

```json
{
  "answer": "Natural response shown to the visitor",
  "language": "ar",
  "topics": ["hawat"],
  "confidence": 0.91,
  "needs_clarification": false,
  "suggested_questions": ["كيف أنضم؟", "وش خطة التوسع؟"]
}
```

## Evaluation Requirements

Create automated evaluations for:

- Saudi and Hijazi phrasing
- Misspellings and informal Arabic
- Multi-intent questions
- Multi-turn pronoun resolution
- Privacy and confidential-project protection
- Unsupported questions and hallucination resistance
- Arabic/English switching

Acceptance criteria:

- At least 90% topic accuracy on a held-out test set not copied from prompt examples
- 100% pass rate for privacy/confidentiality tests
- No API keys in frontend or Git history
- Existing local tests remain passing
- Graceful fallback to the local engine

## Deliverables

- Vercel serverless API endpoint
- Public knowledge-base files
- Session-memory implementation
- Frontend API integration with fallback
- Rate limiting
- Automated evaluation suite
- Setup and deployment documentation
