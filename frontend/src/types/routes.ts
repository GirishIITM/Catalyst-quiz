export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  register: "/register",
  teacher: {
    dashboard: "/teacher/dashboard",
    createQuiz: "/:classroom/teacher/create-quiz",
    viewQuiz: "/:classroom/teacher/view-quiz/:quizId",
    viewNote: "/:classroom/teacher/view-notes/:noteId",
    uploadNotes: "/:classroom/teacher/upload-notes",
    myQuizzes: "/:classroom/teacher/my-quizzes",
    classrooms: "/teacher/classrooms",
    classroom: "/:classroom/teacher/classroom",
    evaluation: "/:classroom/teacher/evaluation",
    profile: "/:classroom/teacher/profile",
    feedback: "/:classroom/teacher/feedback",
    submissions: "/:classroom/teacher/submissions",
  },
  student: {
    dashboard: "/:classroom/student/dashboard",
    viewNotes: "/:classroom/student/view-notes",
    takeQuiz: "/:classroom/student/take-quiz",
    submissions: "/:classroom/student/submissions",
    feedback: "/:classroom/student/feedback",
    profile: "/:classroom/student/profile",
  },
  quizes: "/:classroom/quizes",
  quiz: "/:classroom/:quiz",

};

