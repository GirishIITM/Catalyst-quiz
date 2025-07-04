import NotFound from "@/components/not-found";
import PrivateRoute from "@/components/private-route";
import PublicRoute from "@/components/public-route";
import StudentBottomBar from "@/components/student-bottom-bar";
import { StudentSidebar } from "@/components/student-sidebar";
import TeacherBottomBar from "@/components/teacher-bottom-bar";
import { TeacherSidebar } from "@/components/teacher-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Quiz from "@/pages/Quiz";
import Quizzes from "@/pages/Quizzes";
import Register from "@/pages/Register";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import StudentFeedback from "@/pages/student/StudentFeedback";
import StudentProfile from "@/pages/student/StudentProfile";
import StudentSubmissions from "@/pages/student/StudentSubmissions";
import StudentTakeQuiz from "@/pages/student/StudentTakeQuiz";
import StudentViewNotes from "@/pages/student/StudentViewNotes";
import TeacherClassRooms from "@/pages/teacher/ClassRooms";
import TeacherClassroom from "@/pages/teacher/TeacherClassroom";
import TeacherCreateQuiz from "@/pages/teacher/TeacherCreateQuiz";
import TeacherEvaluation from "@/pages/teacher/TeacherEvaluation";
import TeacherFeedback from "@/pages/teacher/TeacherFeedback";
import TeacherMyQuizzes from "@/pages/teacher/TeacherMyQuizzes";
import TeacherProfile from "@/pages/teacher/TeacherProfile";
import TeacherSubmissions from "@/pages/teacher/TeacherSubmissions";
import TeacherUploadNotes from "@/pages/teacher/TeacherUploadNotes";
import TeacherViewQuiz from "@/pages/teacher/TeacherViewQuiz";
import { routes } from "@/types/routes";
import { Route, Routes } from "react-router-dom";

function wrapTeacherSidebar(element: React.ReactNode) {
  return (
    <div className="flex flex-col">
      <SidebarProvider>
        <TeacherSidebar />
        <PrivateRoute>{element}</PrivateRoute>
      </SidebarProvider>
      <TeacherBottomBar />
    </div>
  );
}

function wrapStudentSidebar(element: React.ReactNode) {
  return (
    <div className="flex flex-col">
      <SidebarProvider>
        <StudentSidebar />
        <PrivateRoute>{element}</PrivateRoute>
      </SidebarProvider>
      <StudentBottomBar />
    </div>
  );
}

export default function AllRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.quizes} element={<Quizzes />} />
      <Route path={routes.quiz + "/id:"} element={<Quiz />} />

      <Route
        path={routes.student.dashboard}
        element={wrapStudentSidebar(<StudentDashboard />)}
      />
      <Route
        path={routes.student.viewNotes}
        element={wrapStudentSidebar(<StudentViewNotes />)}
      />
      <Route
        path={routes.student.takeQuiz}
        element={wrapStudentSidebar(<StudentTakeQuiz />)}
      />
      <Route
        path={routes.student.submissions}
        element={wrapStudentSidebar(<StudentSubmissions />)}
      />
      <Route
        path={routes.student.feedback}
        element={wrapStudentSidebar(<StudentFeedback />)}
      />
      <Route
        path={routes.student.profile}
        element={wrapStudentSidebar(<StudentProfile />)}
      />

      <Route
        path={routes.teacher.dashboard}
        element={wrapTeacherSidebar(<TeacherDashboard />)}
      />
      <Route
        path={routes.teacher.createQuiz}
        element={wrapTeacherSidebar(<TeacherCreateQuiz />)}
      />
      <Route
        path={routes.teacher.viewQuiz}
        element={wrapTeacherSidebar(<TeacherViewQuiz />)}
      />
      <Route
        path={routes.teacher.viewNote}
        element={wrapTeacherSidebar(<TeacherViewQuiz />)}
      />
      <Route
        path={routes.teacher.uploadNotes}
        element={wrapTeacherSidebar(<TeacherUploadNotes />)}
      />
      <Route
        path={routes.teacher.myQuizzes}
        element={wrapTeacherSidebar(<TeacherMyQuizzes />)}
      />
      <Route
        path={routes.teacher.classrooms}
        element={wrapTeacherSidebar(<TeacherClassRooms />)}
      />
      <Route
        path={routes.teacher.classroom}
        element={wrapTeacherSidebar(<TeacherClassroom />)}
      />
      <Route
        path={routes.teacher.evaluation}
        element={wrapTeacherSidebar(<TeacherEvaluation />)}
      />
      <Route
        path={routes.teacher.feedback}
        element={wrapTeacherSidebar(<TeacherFeedback />)}
      />
      <Route
        path={routes.teacher.submissions}
        element={wrapTeacherSidebar(<TeacherSubmissions />)}
      />
      <Route
        path={routes.teacher.profile}
        element={wrapTeacherSidebar(<TeacherProfile />)}
      />

      <Route path={routes.login} element={<PublicRoute><Login /></PublicRoute>} />
      <Route path={routes.register} element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
