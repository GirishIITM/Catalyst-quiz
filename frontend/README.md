# Catalyst Quiz

**Learn Smarter, Not Harder.**

Catalyst Quiz is an intelligent learning platform designed to bridge the gap between traditional teaching methods and modern technology. It provides a seamless environment where teachers can upload notes and create quizzes, and students can submit answers in various formats, including typed text and handwritten responses via image uploads.

The core of Catalyst Quiz is its advanced AI-powered grading system. Unlike traditional systems that rely on simple keyword matching, our platform uses a sophisticated two-step process to evaluate student answers:

1.  **Fast Semantic Matching**: The system first performs a quick semantic check to determine if an answer is relevant to the question. Irrelevant or nonsensical responses are filtered out efficiently.
2.  **Deep LLM Analysis**: For relevant answers, a Large Language Model (LLM) conducts a deep analysis to understand the student's reasoning, conceptual understanding, and the steps they took to arrive at the answer.

This approach allows for a more nuanced and fair evaluation, akin to a more intelligent and optimized version of Gradescope. It's a smart grading system that understands context, not just text.

## Pages and UI Layout

### 1. Landing Page (Home)
- Hero section: logo, tagline “Learn Smarter, Not Harder”
- Login / Register buttons
- Overview of key features: AI Grading, Handwriting Recognition, Smart Feedback
- Footer: About | Contact | Terms

### 2. Authentication Pages
#### Register (`Register.tsx`)
- Email & password fields
- Role selection: Teacher / Student
- Onboarding flow to create or join a classroom.
#### Login (`Login.tsx`)
- Email & password fields
- Role-based redirection to the appropriate dashboard (Teacher or Student).

### 3. Teacher Dashboard (`TeacherDashboard.tsx`)
- A centralized hub for each classroom, displaying key statistics and activities.
- Sidebar links: Dashboard | Create Quiz | Upload Notes | My Quizzes | Classroom | Logout
- Main panel:
  - Recent uploads & activities
  - “Create New Quiz” button
  - “Upload Lecture Notes” button

### 4. Create Quiz Page (`CreateQuiz.tsx`)
- Form fields:
  - Quiz Title & Description
  - Add Questions: text, answer key, tags, difficulty
  - Save / Publish buttons

### 5. Upload Notes Page (`UploadNotes.tsx`)
- File upload (PDF / DOC)
- Title, tags & description fields
- Submit button

### 6. Student Dashboard (`StudentDashboard.tsx`)
- Sidebar links: Dashboard | View Notes | Take Quiz | My Submissions | Logout
- Main panel:
  - Recently viewed notes
  - Assigned quizzes

### 7. View Notes Page (`ViewNotes.tsx`)
- Search / filter by tags & subjects
- Note cards with title & preview
- Full view via modal or redirect

### 8. Take Quiz Page (`TakeQuiz.tsx`)
- List of available quizzes
- Quiz interface:
  - Question display
  - Answer input (text or image upload)
  - Submit button

### 9. My Submissions Page (`Submissions.tsx`)
- List of past quizzes
- Status indicator: Evaluated / Pending
- “View Feedback” button

### 10. AI Evaluation
- Semantic answer matching (beyond keyword checks)
- Automated grading with LLM reasoning
- Plagiarism detection
- Optional: feedback request & re-evaluation flow

### 11. Classroom Overview
- Teacher view: class roster, statistics, activity feed

## Tech Stack
- Backend: Flask, PostgreSQL / SQLite, SQLAlchemy ORM  
- Frontend: React + Vite, TypeScript  
- UI Library: ShadUI  
- AI Evaluation: Gemini / DeepSeek LLM models  

A one-stop platform where teachers upload notes & quizzes and students access/submit (typed or handwritten) answers. The system uses AI to understand and grade responses semantically rather than by exact text match—making grading smarter and more flexible.
