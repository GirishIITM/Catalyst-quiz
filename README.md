# QuizCatalyst AI

QuizCatalyst AI is an AI-powered educational platform built by **Code Catalyst** to empower teachers and students with intelligent quiz creation, automated grading, and real-time feedback.

Whether you're uploading handwritten answers, evaluating student performance, or generating personalized quizzes, QuizCatalyst AI makes learning smarter and more adaptive.

---

## 🚀 Features

- 🔒 **Role-based Login**: Secure registration and login for teachers and students  
- 📚 **Smart Classrooms**: Teachers can create, manage, and share notes and quizzes within virtual classrooms  
- 📝 **Quiz Management**: Teachers build quizzes with text and multiple-choice questions  
- 📤 **Note Uploads**: Upload lecture notes (PDF/DOC), tag them for easy student access  
- 🤖 **AI Feedback**: Automatic grading and contextual feedback using LLMs  
- 🖊️ **Handwriting Recognition**: Upload image answers; AI extracts and evaluates content  
- 📈 **Score Dashboard**: Track submissions, view scores, and monitor learning progress  
- 🔁 **Student Issue Tracker**: Students can raise issues related to notes, quizzes, or feedback  
- 🔔 **Real-time Notifications**: Stay updated with classroom events and feedback  
- 🧠 **Future-Ready AI Additions**:
  - Plagiarism Detection
  - Semantic Evaluation & Token Optimization
  - Re-Review Requests
  - Personalized Quiz Generation

---

## 🛠 Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Frontend    | React + Shadcn UI (Tailwind)       |
| Backend     | Flask (Python) + SQLAlchemy ORM    |
| Database    | PostgreSQL / SQLite (dev)          |
| AI Models   | Gemini / DeepSeek LLMs             |
| Auth        | Session-based, Google OAuth (optional) |

---

## 🗃️ Database Schema

![Database Diagram](/frontend/src/assets/db.png)

##  Flowchart
![Flowchart](/frontend/src/assets/catalystflow.png)

---

## ⚙️ Installation

> Prerequisites: Python 3.10+, Node.js 18+, Git, UV (recommended) or pip

1. **Clone the repo**
   ```bash
   git clone https://github.com/GirishIITM/quizcatalyst-ai.git
   cd quizcatalyst-ai
   ```

2. **Backend setup**

   ### Method 1: Using UV (Recommended)
   
   **Linux/Mac:**
   ```bash
   cd backend
   # Install UV if not already installed
   curl -LsSf https://astral.sh/uv/install.sh | sh
   # Run the application (automatically installs dependencies)
   uv run main.py
   ```
   
   **Windows:**
   ```bash
   cd backend
   # Install UV if not already installed
   powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
   # Run the application (automatically installs dependencies)
   uv run main.py
   ```

   ### Method 2: Traditional pip method
   
   **Linux/Mac:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python main.py
   ```
   
   **Windows:**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```

3. **Frontend setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 💡 Future Scope

We aim to turn QuizCatalyst AI into a personalized tutor that learns from student weaknesses and evolves its quiz content dynamically using large language models.

---

## 🤝 Team – Code Catalyst

- **Girish Bhat**
- **Arnav Labhasetwar** 
- **Vedika Vangar**
- **Preethi Munnaluri**
