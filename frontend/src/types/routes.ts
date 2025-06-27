export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  register: "/register",
  teacher: {
    dashboard: "/teacher/dashboard",
    createQuiz: "/teacher/create-quiz",
    uploadNotes: "/teacher/upload-notes",
    myQuizzes: "/teacher/my-quizzes",
    classroom: "/teacher/classroom",
    evaluation: "/teacher/evaluation",
    profile: "/teacher/profile",
  },
  student: {
    dashboard: "/student/dashboard",
    viewNotes: "/student/view-notes",
    takeQuiz: "/student/take-quiz",
    submissions: "/student/submissions",
    feedback: "/student/feedback",
    profile: "/student/profile",
  },
  quizes: "/quizes",
  quiz: "/quiz", //  `/quiz/:id`
};

