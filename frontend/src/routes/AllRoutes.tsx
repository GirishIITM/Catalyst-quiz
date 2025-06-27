import NotFound from "@/components/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import { routes } from "@/types/routes";
import { Route, Routes } from "react-router-dom";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.quizes} element={<div>Quizzes</div>} />
      <Route path={routes.quiz + "/id:"} element={<div>Quiz</div>} />

      <Route path={routes.student.dashboard} element={<StudentDashboard />} />
      <Route path={routes.student.viewNotes} element={<div>View Notes</div>} />
      <Route path={routes.student.takeQuiz} element={<div>Take Quiz</div>} />
      <Route
        path={routes.student.submissions}
        element={<div>Submissions</div>}
      />
      <Route path={routes.student.feedback} element={<div>Feedback</div>} />
      <Route path={routes.student.profile} element={<div>Profile</div>} />

      <Route path={routes.teacher.dashboard} element={<TeacherDashboard />} />
      <Route
        path={routes.teacher.createQuiz}
        element={<div>Create Quiz</div>}
      />
      <Route
        path={routes.teacher.uploadNotes}
        element={<div>Upload Notes</div>}
      />
      <Route path={routes.teacher.myQuizzes} element={<div>My Quizzes</div>} />
      <Route path={routes.teacher.classroom} element={<div>Classroom</div>} />
      <Route path={routes.teacher.evaluation} element={<div>Evaluation</div>} />
      <Route path={routes.student.profile} element={<div>profile</div>} />

      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
