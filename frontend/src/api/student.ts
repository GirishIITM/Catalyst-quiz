import api from './config';
import type {
  StudentDashboard,
  UserProfile,
  UpdateProfileRequest,
  Note,
  Quiz,
  QuizStartResponse,
  Question,
  SubmitAnswerRequest,
  QuizResult,
  ReportIssueRequest,
  Notification,
  ApiResponse
} from '../types/api.types';

export const studentApi = {
  getDashboard: async (classroomId: string): Promise<StudentDashboard> => {
    const response = await api.get<StudentDashboard>(`/student/${classroomId}/dashboard`);
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/student/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/student/profile', data);
    return response.data;
  },

  getNotes: async (classroomId: string): Promise<Note[]> => {
    const response = await api.get<Note[]>(`/student/${classroomId}/notes`);
    return response.data;
  },

  getQuizzes: async (classroomId: string): Promise<Quiz[]> => {
    const response = await api.get<Quiz[]>(`/student/${classroomId}/quizzes`);
    return response.data;
  },

  startQuiz: async (classroomId: string, quizId: string): Promise<QuizStartResponse> => {
    const response = await api.get<QuizStartResponse>(`/student/${classroomId}/quiz-start/${quizId}`);
    return response.data;
  },

  getQuestion: async (quizId: string, questionId: string): Promise<Question> => {
    const response = await api.get<Question>(`/student/${quizId}/question/${questionId}`);
    return response.data;
  },

  submitAnswer: async (quizId: string, questionId: string, data: SubmitAnswerRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>(`/student/${quizId}/question/${questionId}`, data);
    return response.data;
  },

  getQuizResult: async (quizId: string): Promise<QuizResult> => {
    const response = await api.get<QuizResult>(`/student/${quizId}/result`);
    return response.data;
  },

  reportIssue: async (classroomId: string, data: ReportIssueRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>(`/student/${classroomId}/report-issue`, data);
    return response.data;
  },

  getUpdates: async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>('/student/updates');
    return response.data;
  },

  getSubmissions: async (classroomId: string): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/student/submissions');
    return response.data;
  },

  getFeedback: async (classroomId: string): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/student/feedback');
    return response.data;
  },
};
