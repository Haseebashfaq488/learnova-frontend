# Learnova --- Project Context & Product Brief

**Purpose:** Canonical context for product, design, engineering, and AI
agents working on Learnova.\
**Source baseline:** Learnova SRS Final Aligned V2, system diagram
specification README, and the supplied System Sequence Diagrams (SSDs).\
**Project:** Learnova --- An Adaptive and Gamified Learning Platform\
**Academic context:** Final Year Project, Department of Computer
Science, FAST-NUCES, Chiniot, Pakistan, Fall 2026.

> **Source discipline:** This brief distinguishes established
> requirements from implementation proposals. Do not present proposed or
> future capabilities as already implemented. If a detail is not stated
> in the source documents, treat it as undecided rather than inventing a
> commitment.

## 1. Executive summary

Learnova is a web-based educational platform intended to improve on
rigid, one-size-fits-all learning systems. It organizes education into a
structured curriculum and uses assessment performance and learning
interactions to estimate each learner's mastery by topic. Based on this
evidence, it can recommend a personalized sequence of topics, lessons,
resources, and practice; route learners toward prerequisite remediation
when needed; and accelerate learners who demonstrate stronger mastery.

AI/LLM assistance provides contextual explanations, simplified
analogies, worked examples, and supplementary practice.
Gamification---XP, levels, streaks, badges, milestones, and time-bound
challenges---supports engagement. Academic mastery and gamification are
deliberately separated: rewards must not alter assessment scores or
mastery calculations.

Learnova is not merely a content library or a generic chatbot. Its
central value proposition is the combination of **structured
curriculum + topic-level mastery + adaptive learning paths +
assessments + AI learning support + gamified engagement + teacher
visibility**.

## 2. Problem and opportunity

### Problem

Traditional learning systems commonly provide the same material,
sequence, and difficulty to all students, regardless of prior knowledge,
pace, or misconceptions. This can make proficient students repeat
mastered content while learners who need more support move forward
without prerequisite understanding.

### Opportunity

Learnova aims to bring adaptive learning, AI-assisted support, and
gamification together in one environment for educational institutions,
instructors, e-learning providers, and structured training settings. The
SRS identifies learners from Grade 6 through undergraduate level, with
an initial implementation focus on structured curriculum domains such as
Computer Science.

## 3. Product vision and principles

-   **Personalized, not one-size-fits-all:** recommendations should
    reflect current topic mastery, assessment evidence, and prerequisite
    relationships.
-   **Curriculum first:** AI assistance is contextual to an actual
    course/topic/resource, not an ungrounded general chat experience.
-   **Teacher-governed learning content:** teachers create and manage
    the curriculum and assessments. AI-generated candidate questions are
    reviewed by a teacher before publication where the specified
    workflow applies.
-   **Evidence-led adaptation:** assessment results and interaction
    signals inform mastery estimates and future recommendations.
-   **Encouraging, not distracting:** gamification should support
    consistent learning without obscuring educational progress.
-   **Clear academic integrity:** gamification rewards do not affect
    academic evaluation or mastery.
-   **Resilient AI:** cache generated content and provide fallback
    behavior when an external LLM provider is unavailable.
-   **Simple and accessible UX:** responsive, minimalist interfaces
    across desktop, tablet, and mobile browsers, with intuitive
    navigation and age-appropriate presentation.
-   **Role separation and privacy:** students, teachers, and
    administrators see only the information and actions permitted to
    their roles.

## 4. Target users and stakeholders

### Student / learner

Learners from Grade 6--12, college/intermediate, undergraduate, and
self-paced online learners. Needs: - Browse and enroll in courses. -
Study lessons and resources. - Take diagnostic assessments, adaptive
practice, and formal/final examinations. - Understand topic mastery,
progress, weak areas, readiness, and next recommended steps. - Request
explanations, examples, and extra practice when needed. - Track XP,
level, streaks, achievements, and challenges.

### Teacher / instructor

School teachers, college instructors, university instructors, and
teaching assistants. Needs: - Create and organize courses, topics,
lessons, and prerequisite relationships. - Upload/manage learning
resources and external references. - Build question banks and configure
assessments. - Set question/topic difficulty metadata. - Generate
candidate AI questions when appropriate, then review/edit/approve/reject
them. - Monitor student performance, class-wide topic mastery, score
distributions, attempts, and weak concepts.

### System administrator

Responsible for user and role governance, security, infrastructure
health, database integrity, backups, audit logs, configuration, and
external AI service usage/caching policies.

### Academic supervisors

Provide academic, technical, methodological, and milestone review for
the FYP. They are project stakeholders, not a normal end-user role for
the public landing page.

## 5. Core product capabilities

### 5.1 Curriculum and resource management

The curriculum hierarchy is: **Course → Topic → Lesson → Learning
Resources → Practice/Assessment** Teachers can create, manage, draft,
and publish content. Supported resource types in the SRS include PDFs,
video links, presentation slides, Markdown notes, code snippets,
documents, and external references. Topics can have explicit
prerequisite dependencies; the diagram specification describes these as
a directed acyclic graph (DAG), which should be validated to prevent
cycles.

### 5.2 Assessment system

The question bank supports: - Multiple Choice Questions (MCQs) -
True/False - Fill in the Blank - Matching - Short Answer

Question records can include answers, choices, marks, explanations,
topic associations, and difficulty ratings.

Assessment families described in the source materials: - **Diagnostic
assessment:** estimates initial or prerequisite topic knowledge. -
**Adaptive practice / topic reassessment:** questions are selected or
calibrated using learner proficiency and performance. - **Formal/final
examination or mock test:** teacher-configured evaluation and
examination readiness.

Do not imply that every assessment is fully AI-generated. The documented
model includes a centralized question bank, adaptive selection, and
AI-generated candidate supplementary practice/questions where
appropriate.

### 5.3 Adaptive learning engine

The platform records learning evidence such as: - Correct/incorrect
responses - Attempt counts - Question difficulty - Response
latency/time - Lesson/resource completion and related interactions

The system uses evidence to update topic-wise mastery, evaluate
readiness, and generate a personalized learning path. Learners below a
configured mastery threshold may be routed to prerequisite resources,
remedial content, or easier practice. Learners with high mastery may
move toward advanced concepts.

**Important source invariant:** the system diagram specification says
mastery recalculation happens when a complete assessment is submitted,
not after each interim question response. Interim responses may be
logged, but should not trigger premature mastery updates. Implementers
should preserve this distinction.

### 5.4 AI/LLM learning support

AI-assisted capabilities include: - Contextual concept explanations -
Simplified analogies - Step-by-step worked examples - Supplementary
practice questions aligned with topic and difficulty - Candidate
question generation for teacher review

The architecture specification describes an adapter interface to avoid
hard-coupling to one provider, with potential providers such as OpenAI,
Gemini, or Groq. This is an architectural option stated in the supplied
specification, not a claim that all providers are currently configured.

AI output should be clearly distinguished from official curriculum
content. Cache results by topic/difficulty where appropriate, control
API usage/cost, and offer cached or local fallbacks when external
services fail. Teacher review/approval applies to AI-generated questions
before publication in the documented workflow.

### 5.5 Gamification

Gamification includes: - Experience Points (XP) - Levels - Daily
learning streaks - Badges and achievements - Milestone rewards -
Time-bound challenges

Rewards are triggered by learning events such as lesson completion or
assessment completion and are processed asynchronously. Rewards must not
influence marks, assessment evaluation, or mastery estimates.

### 5.6 Analytics and reporting

Student-facing analytics can show course completion, topic mastery,
assessment history, attempts, learning history, recommended next
lessons, examination readiness, and gamification progress.

Teacher-facing analytics can show class-wide topic mastery heatmaps,
score distributions, individual attempt histories, and identification of
weak concepts/students needing support.

Analytics must respect role-based privacy and access controls.

### 5.7 Account, security, and administration

The SRS describes secure registration/login/logout, profile management,
role-based access, user/role administration, validation and sanitization
of inputs, security audit logs, and protection of student data. It
specifies bcrypt password hashing, JWT authentication tokens, HTTPS, and
RBAC.

## 6. Typical learner journey

1.  Register/sign in.
2.  Browse and enroll in a published course.
3.  View the course curriculum.
4.  Complete an initial diagnostic or prerequisite diagnostic where
    required.
5.  Receive a baseline topic-mastery estimate and personalized starting
    path.
6.  Study a recommended lesson/resource.
7.  Attempt practice; receive feedback.
8.  Submit the complete assessment; mastery is recalculated from the
    completed assessment evidence.
9.  The learning path is updated. The learner may receive remediation,
    continued practice, or acceleration.
10. Request AI support when needed.
11. Complete formal/final examinations or mock tests when appropriate.
12. Review progress and rewards; gamification events are processed
    separately from academic mastery.

## 7. Typical teacher journey

1.  Sign in to the teacher portal.
2.  Create a course and structure it into topics and lessons.
3.  Define prerequisite relationships.
4.  Add/upload learning resources and external references.
5.  Create or maintain question-bank items with topic and difficulty
    metadata.
6.  Configure diagnostic assessments, adaptive practice/reassessments,
    and formal/final exams.
7.  Optionally request AI-generated candidate questions.
8.  Review, edit, approve, or reject candidate questions before
    publication.
9.  Publish curriculum and assessments.
10. Review class and individual student analytics to identify gaps and
    adjust instruction.

## 8. Core architecture and technical context

The supplied architecture specification describes a three-layer logical
architecture: - **Presentation layer:** web/student/teacher/admin
interfaces; responsible for rendering and navigation, not business or
persistence logic. - **Domain layer:** curriculum, prerequisites,
assessment, adaptive engine, users, gamification, and analytics business
logic. - **Technical services layer:** persistence, security, LLM
bridge/adapter, and logging.

The supplied diagram specification identifies the following
implementation context: - Web client applications for Student, Teacher,
and Administrator. - Next.js/React as an inferred/corroborated frontend
choice. - FastAPI/Python behind Uvicorn as the backend API. - PostgreSQL
as relational persistence. - Docker container deployment. - REST/JSON
communication between client and backend. - HTTPS REST integration with
external LLM providers. - JWT-based authentication and role-based access
control.

These are the project specification's described/intended architecture;
do not claim that production deployment or integrations already exist
unless confirmed in the implementation repository.

### Domain services named in the specification

-   Curriculum service
-   Assessment engine
-   Adaptive engine
-   Prerequisite DAG validator
-   AI service / LLM adapter
-   Gamification service
-   Analytics service
-   Persistence/database facade
-   Security and logging services

### Logical data areas

1.  User accounts and roles
2.  Courses, curriculum, and resources
3.  Question bank and assessments
4.  Enrollments and learning activity
5.  Topic mastery and learning paths
6.  AI content cache
7.  Gamification records
8.  Analytics and audit records

## 9. Non-functional requirements stated in the SRS

-   Standard pages should load within 2 seconds.
-   Adaptive recommendation API queries should return within 1,000 ms.
-   Secure password hashing with bcrypt.
-   JWT tokens signed and transmitted over HTTPS.
-   Strict role-based access control.
-   Input validation and sanitization.
-   Audit logging for security-critical actions.
-   Responsive, minimalist, cross-browser UI.
-   Graceful degradation if external LLM APIs are rate-limited or
    unavailable, including cached explanations and local question banks.
-   LLM requests should be throttled/cached to manage cost.

These are target requirements, not verified performance claims.

## 10. Brand and product communication guidance

### Recommended positioning

**Learnova helps every learner find their next best step.** It combines
structured learning, topic-level mastery, adaptive practice, AI
assistance, and motivating progress mechanics in one platform.

### Message pillars

1.  **Learn at your level:** learning recommendations respond to
    mastery, not just a fixed course sequence.
2.  **Know what to work on next:** topic-level insights and personalized
    paths make progress actionable.
3.  **Get support when concepts are difficult:** contextual
    explanations, analogies, worked examples, and extra practice.
4.  **Make progress visible:** XP, streaks, levels, and achievements
    reward consistent learning.
5.  **Teachers stay in control:** instructors manage curriculum,
    assessments, and review AI-generated candidate questions.
6.  **Measure learning, not just activity:** topic mastery and
    assessment evidence are core to the platform.

### Tone

-   Clear, intelligent, encouraging, and credible.
-   Avoid childish, overly cartoonish, or aggressively competitive
    language.
-   Avoid exaggerated claims such as "guaranteed results," "perfectly
    understands every learner," "revolutionary AI," or quantified
    outcome improvements not demonstrated by evidence.
-   Explain adaptation in plain language instead of relying on AI
    jargon.

### Terminology

Prefer: - adaptive learning - topic mastery - personalized learning
path - diagnostic assessment - adaptive practice - learning resources -
contextual AI assistance - teacher-reviewed AI-generated questions - XP,
streaks, achievements

Avoid using "AI does everything," "fully autonomous teacher," or
implying AI replaces teachers.

## 11. Scope and claims discipline

### Supported by the project documents

-   Structured courses, topics, lessons, resources, and assessments
-   Diagnostic assessments and topic-wise mastery estimates
-   Adaptive practice and difficulty calibration
-   Personalized learning paths and prerequisite
    remediation/acceleration
-   AI explanations, analogies, worked examples, and supplementary
    practice
-   Teacher-managed curriculum and question bank
-   Teacher review of AI-generated candidate questions
-   XP, levels, streaks, badges, achievements, and challenges
-   Student/teacher analytics
-   Administrator access/security governance

### Do not claim without further evidence

-   Specific measured learning gains, retention improvements, or
    completion-rate percentages
-   Large-scale production deployment or a particular number of active
    users
-   Accreditation, certification, institutional partnerships, or paying
    customers
-   A mobile-native application; the SRS describes web and
    mobile-accessible interfaces
-   A specific mastery algorithm as finalized. The diagram specification
    mentions BKT/Elo as inferred possibilities, not a definitive
    selected algorithm.
-   Fully automated, error-free question generation
-   Guaranteed sub-second responses under all conditions
-   A feature being implemented merely because it appears in a design
    document

## 12. Product decisions still requiring validation

These are not fully settled by the source baseline and should be
explicitly decided by the team: - The exact mastery estimation formula
and thresholds. - How assessment versions/questions are sampled to
reduce repetition and preserve fairness. - Rules for exam attempts, time
limits, retakes, and grading of short-answer questions. - How teacher
approval is enforced for each class of AI-generated content. - Which LLM
provider(s) are actually configured and what happens under
provider-specific limits. - Whether course enrollment is open,
teacher-assigned, or both. - Which analytics are visible to students
versus teachers. - The MVP feature boundary and what is deferred beyond
the FYP demonstration. - Privacy, consent, and retention policies
appropriate to younger learners.

## 13. Guidance for agents working on Learnova

Before making a product or technical change: 1. Read the relevant SRS
requirements and system diagrams. 2. Preserve existing terms, actor
boundaries, and workflow invariants. 3. Separate source-defined
requirements from proposals. 4. Do not silently alter the
assessment/mastery timing rule or gamification decoupling. 5. Keep
teacher control over curriculum and assessment publication. 6. Keep UI,
domain logic, and technical infrastructure separated. 7. Design
responsive and accessible interfaces; prioritize clarity over decorative
complexity. 8. If the requirement is ambiguous, document the assumption
or ask the team rather than inventing a rule. 9. Do not represent a
feature as implemented without checking the actual codebase. 10. When
communicating to students, focus on their next learning step and visible
progress; when communicating to teachers, focus on curriculum control
and actionable class insights.
