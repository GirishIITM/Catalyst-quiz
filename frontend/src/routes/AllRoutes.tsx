import NotFound from '@/components/not-found';
import { StudentSidebar } from '@/components/sidbars/StudentSidebar';
import { TeacherSidebar } from '@/components/sidbars/TeacherSidebar';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import StudentDashboard from '@/pages/StudentDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';
import { routes } from '@/types/routes';
import { Route, Routes } from 'react-router-dom';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.quizes} element={<div>Quizzes</div>} />
      <Route path={routes.quiz + "/id:"} element={<div>Quiz</div>} />

      <Route path={routes.student.dashboard} element={
        <StudentSidebar>
          <StudentDashboard />
        </StudentSidebar>
      } />
      <Route path={routes.student.viewNotes} element={
        <StudentSidebar>
          <div>View Notes</div>
        </StudentSidebar>
      } />
      <Route path={routes.student.takeQuiz} element={
        <StudentSidebar>
          <div>Take Quiz</div>
        </StudentSidebar>
      } />
      <Route path={routes.student.submissions} element={
        <StudentSidebar>
          <div>Submissions</div>
        </StudentSidebar>
      } />
      <Route path={routes.student.feedback} element={
        <StudentSidebar>
          <div>Feedback</div>
        </StudentSidebar>
      } />
      <Route path={routes.student.profile} element={
        <StudentSidebar>
          <div>Profile</div>
        </StudentSidebar>
      } />

      <Route path={routes.teacher.dashboard} element={
        <TeacherSidebar>
          <TeacherDashboard />
        </TeacherSidebar>} />
      <Route path={routes.teacher.createQuiz} element={
        <TeacherSidebar>
          <div>Create Quiz</div>
        </TeacherSidebar>
      } />
      <Route path={routes.teacher.uploadNotes} element={
        <TeacherSidebar>
          <div>Upload Notes</div>
        </TeacherSidebar>
      } />
      <Route path={routes.teacher.myQuizzes} element={
        <TeacherSidebar>
          <div>My Quizzes</div>
        </TeacherSidebar>
      } />
      <Route path={routes.teacher.classroom} element={
        <TeacherSidebar>
          <div>Classroom</div>
        </TeacherSidebar>
      } />
      <Route path={routes.teacher.evaluation} element={
        <TeacherSidebar>
          <div>Evaluation</div>
        </TeacherSidebar>
      } />
      <Route path={routes.student.profile} element={
        <StudentSidebar>
          <div>profile</div>
        </StudentSidebar>
      } />

      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
