# LTU BandLab AI — Production Architecture

Updated: 2026-09-11

## Product definition

The production target is **2,000 complete IELTS-aligned practice sets**, not 2,000 individual questions.

Each complete Academic set is designed around:

- Listening: 4 parts / 40 questions
- Reading: 3 passages / 40 questions
- Writing: Task 1 + Task 2
- Speaking: Part 1 + Part 2 + Part 3

At the set level this represents about **170,000 answerable nodes** across 2,000 sets, before adding weakness drills, vocabulary reviews and grammar remediation.

The platform must not describe LTU-created content as official IELTS questions or past papers. Test format alignment and scoring criteria may be calibrated against current public IELTS specifications, while the commercial question content remains LTU-original or separately licensed.

## Membership model

Monthly price is fixed at **NT$3,000**.

| Plan | Duration | Total |
| --- | ---: | ---: |
| 1 month | 30 days | NT$3,000 |
| 2 months | 60 days | NT$6,000 |
| 3 months | 90 days | NT$9,000 |

All paid plans unlock the same core feature set. The difference is membership duration and personalized study-plan length.

Free users receive **3 short Mini Tests**, not full 2,000-set access. Free Writing and Speaking AI scoring should be limited to a small trial allowance.

## Student flow

1. Sign up / sign in.
2. Complete initial profile and target Band.
3. Choose 30 / 60 / 90-day plan.
4. Payment order is created server-side.
5. Payment provider callback is verified server-side.
6. Membership is activated only after verified payment.
7. AI generates the first weekly schedule.
8. Student completes two full mocks per week.
9. Wrong answers create weakness evidence.
10. Non-mock days prioritize the highest-impact weakness clusters.
11. Vocabulary and grammar use spaced review.
12. Every seven days the schedule is recalculated from recent evidence.

## 2,000-set content factory

A set is not publishable merely because AI generated it. Each set moves through these states:

`draft -> ai_checked -> editor_checked -> published`

### Listening pipeline

For each set:

1. Generate 4 original scenarios/scripts with topic and accent targets.
2. Generate exactly 40 questions with a controlled mix of completion, multiple choice, matching, map/plan/diagram and short-answer types.
3. Validate every answer against transcript evidence.
4. Validate spelling/word limits and distractor logic.
5. Generate audio from approved scripts for development; production should use high-quality licensed or commissioned voices/audio where appropriate.
6. Human editor listens to final audio while answering the paper.
7. Store transcript, audio path, question answer keys, explanations and weakness tags.

### Reading pipeline

For each set:

1. Generate or commission 3 original passages with distinct topics and appropriate academic register.
2. Detect near-duplicate passages against the whole bank.
3. Generate exactly 40 questions with IELTS-aligned type distribution.
4. Require an evidence span for every objective answer.
5. Run contradiction checks for True/False/Not Given and Yes/No/Not Given.
6. Check heading uniqueness and summary-completion word limits.
7. Human editor completes the passage under timed conditions before publication.

### Writing pipeline

Each set has 2 original tasks:

- Task 1: chart/table/map/process/diagram prompt with source data generated and validated together.
- Task 2: opinion/discussion/problem-solution/two-part/advantages-disadvantages prompt.

Store prompt type, topic, target Band, planning hints, model-outline components, vocabulary/collocation suggestions and rubric-linked feedback rules. Model essays are supporting material and should not become memorization templates.

### Speaking pipeline

Each set contains Part 1, Part 2 and Part 3 as a coherent topic family. Avoid duplicate cue cards across sets through semantic similarity checking. Store expected language opportunities rather than one “correct answer.”

## QA gates

Every objective question should have:

- unique question ID
- set ID and module
- question type
- target Band / difficulty
- answer key
- evidence or transcript support
- explanation
- distractor explanation when applicable
- vocabulary
- phrases/collocations
- grammar focus
- solving strategy
- trap type
- weakness tags
- source/license status
- QA status

Automated publishing must stop when any of the following occurs:

- duplicate set code
- incorrect module question total
- missing answer
- answer unsupported by passage/transcript
- multiple defensible answers in a single-answer item
- word-limit conflict
- duplicate or near-duplicate prompt above threshold
- missing license/provenance status
- failed language-quality check

## AI weakness engine

A wrong answer is converted into evidence, not merely stored as “wrong.” Example dimensions:

- Reading: scope, negation, paraphrase, inference, heading discrimination, word limit, scanning speed
- Listening: correction signal, distractor-first-answer, number/date, spelling, map direction, plural/singular, synonym
- Writing: task response, thesis, paragraph control, reasoning depth, example quality, cohesion, lexical precision, grammar patterns
- Speaking: fluency, hesitation, development, lexical precision, grammatical range, pronunciation/acoustic features

Suggested priority score:

`priority = severity × recurrence × recency × expected_band_impact × (1 - mastery)`

The daily plan draws first from the highest priority weaknesses while keeping periodic mixed review to prevent overfitting to one skill.

## Production backend

Recommended stack:

- Frontend: Next.js App Router
- Auth / DB / Storage: Supabase
- Hosting: Vercel when the account connector is available; GitHub Pages remains suitable only for the current static Beta
- AI scoring: server-side model calls; never expose provider secret keys in browser code
- Speaking audio: private object storage, user-owned paths, short retention policy configurable by LTU
- Payments: Taiwan payment provider integration via server-side order creation + signed callback verification

The current public Beta intentionally uses localStorage and simulated checkout. It is for UX testing only and must not be treated as the production membership/payment system.

## Security requirements

- RLS enabled on every exposed student-data table.
- Students can read only their own attempts, plans, weaknesses, writing and speaking submissions.
- Payment and membership activation cannot be written by the browser.
- Full question-bank access requires an active membership checked server-side/RLS-side.
- Frontend uses only a Supabase publishable key.
- Supabase secret/service-role keys and AI/payment secrets remain server-side only.
- Authorization must not depend on user-editable `user_metadata`.

## Current Beta vs production

The public Beta now represents 2,000 deterministic set identities and can generate full-module practice for UX testing. This is **not the same as having 2,000 editor-checked final examinations**. Production readiness requires materializing the content factory, running automated QA, and completing editorial review before each set is marked `published`.
