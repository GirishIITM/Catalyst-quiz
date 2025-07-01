export type LoginRequest =
  | {
    email: string;
    username?: never;
    password: string;
  }
  | {
    email?: never;
    username: string;
    password: string;
  };

export interface LoginResponse {
  access_token: string;
  role: 'teacher' | 'student';
  username: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
  metadata?: Record<string, any>;
}

export interface SendOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
  new_password: string;
  otp: string;
}

export interface CreateClassroomRequest {
  name: string;
}

export interface CreateClassroomResponse {
  message: string;
  classroom_id: string;
}

export interface EditClassroomRequest {
  name: string;
}

export interface AddStudentRequest {
  email: string;
}

export interface CreateQuizRequest {
  title: string;
  description?: string;
  difficulty: string;
  deadline?: string;
}

export interface CreateQuizResponse {
  message: string;
  quiz_id: string;
}

export interface EditQuizRequest {
  title?: string;
  description?: string;
  is_published?: boolean;
}

export interface CreateQuestionRequest {
  question_text: string;
  question_type: string;
  answer_key?: string;
  difficulty?: string;
}

export interface CreateQuestionResponse {
  message: string;
  question_id: string;
}

export interface EditQuestionRequest {
  question_text?: string;
  answer_key?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  is_published?: boolean;
}

export interface Question {
  id: string;
  question_text: string;
  question_type: string;
  options: Option[];
  next_question_id?: string;
}

export interface Option {
  id: string;
  label: string;
  text: string;
}

export interface SubmitAnswerRequest {
  response_text?: string;
  response_image_url?: string;
}

export interface QuizResult {
  status: string;
  score: number;
  submitted_at: string;
}

export interface StudentDashboard {
  upcoming_quizzes: Array<{
    id: string;
    title: string;
    deadline: string;
  }>;
  recent_submissions: Array<{
    quiz_title: string;
    score: number;
  }>;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  file_url: string;
  uploaded_at: string;
}

export interface ReportIssueRequest {
  title: string;
  description?: string;
  related_type?: string;
  related_id?: string;
}

export interface StudentIssue {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
}

export interface UserProfile {
  username: string;
  email: string;
  user_metadata: Record<string, any>;
}

export interface UpdateProfileRequest {
  username?: string;
  email?: string;
  user_metadata?: Record<string, any>;
}

export interface QuizStartResponse {
  quiz_id: string;
  title: string;
  description: string;
  first_question_id?: string;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
}
