import NotFound from "@/components/not-found";
import PrivateRoute from "@/components/private-route";
import { StudentSidebar } from "@/components/student-sidebar";
import { TeacherSidebar } from "@/components/teacher-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import { routes } from "@/types/routes";
import { Route, Routes } from "react-router-dom";

function wrapTeacherSidebar(element: React.ReactNode) {
  return (
    <SidebarProvider>
      <TeacherSidebar />
      <PrivateRoute>{element}</PrivateRoute>
    </SidebarProvider>
  );
}

function wrapStudentSidebar(element: React.ReactNode) {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <PrivateRoute>{element}</PrivateRoute>
    </SidebarProvider>
  );
}

export default function AllRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.quizes} element={<div>Quizzes</div>} />
      <Route path={routes.quiz + "/id:"} element={<div>Quiz</div>} />

      <Route
        path={routes.student.dashboard}
        element={wrapStudentSidebar(<StudentDashboard />)}
      />
      <Route
        path={routes.student.viewNotes}
        element={wrapStudentSidebar(<div>View Notes</div>)}
      />
      <Route
        path={routes.student.takeQuiz}
        element={wrapStudentSidebar(<div>Take Quiz</div>)}
      />
      <Route
        path={routes.student.submissions}
        element={wrapStudentSidebar(<div>Submissions</div>)}
      />
      <Route
        path={routes.student.feedback}
        element={wrapStudentSidebar(<div>Feedback</div>)}
      />
      <Route
        path={routes.student.profile}
        element={wrapStudentSidebar(<div>Profile</div>)}
      />

      <Route
        path={routes.teacher.dashboard}
        element={wrapTeacherSidebar(<TeacherDashboard />)}
      />
      <Route
        path={routes.teacher.createQuiz}
        element={wrapTeacherSidebar(<div>Create Quiz</div>)}
      />
      <Route
        path={routes.teacher.uploadNotes}
        element={wrapTeacherSidebar(<div>Upload Notes</div>)}
      />
      <Route
        path={routes.teacher.myQuizzes}
        element={wrapTeacherSidebar(<div>My Quizzes</div>)}
      />
      <Route
        path={routes.teacher.classroom}
        element={wrapTeacherSidebar(<div>Classroom</div>)}
      />
      <Route
        path={routes.teacher.evaluation}
        element={wrapTeacherSidebar(<div>Evaluation</div>)}
      />
      <Route
        path={routes.teacher.feedback}
        element={wrapTeacherSidebar(<div>Feedback</div>)}
      />
      <Route
        path={routes.teacher.submissions}
        element={wrapTeacherSidebar(<div>Submissions</div>)}
      />

      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
