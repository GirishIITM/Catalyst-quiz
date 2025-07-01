import type {
  AddStudentRequest,
  ApiResponse,
  CreateClassroomRequest,
  CreateClassroomResponse,
  CreateQuestionRequest,
  CreateQuestionResponse,
  CreateQuizRequest,
  CreateQuizResponse,
  EditClassroomRequest,
  EditQuestionRequest,
  EditQuizRequest,
  GetClassroomResponse,
  Notification,
  StudentIssue,
  UpdateProfileRequest,
  UserProfile
} from '../types/api.types';
import api from './config';

export const teacherApi = {
  createClassroom: async (data: CreateClassroomRequest): Promise<CreateClassroomResponse> => {
    const response = await api.post<CreateClassroomResponse>('/teacher/add-classroom', data);
    return response.data;
  },

  getClassrooms: async (): Promise<GetClassroomResponse> => {
    const response = await api.get<GetClassroomResponse>('/teacher/classrooms');
    return response.data;
  },

  editClassroom: async (classroomId: string, data: EditClassroomRequest): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(`/teacher/${classroomId}`, data);
    return response.data;
  },

  deleteClassroom: async (classroomId: string): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/teacher/${classroomId}`);
    return response.data;
  },

  addStudent: async (classroomId: string, data: AddStudentRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>(`/teacher/${classroomId}/add-student`, data);
    return response.data;
  },

  createQuiz: async (classroomId: string, data: CreateQuizRequest): Promise<CreateQuizResponse> => {
    const response = await api.post<CreateQuizResponse>(`/teacher/${classroomId}/add-quiz`, data);
    return response.data;
  },

  editQuiz: async (quizId: string, data: EditQuizRequest): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(`/teacher/quiz/${quizId}`, data);
    return response.data;
  },

  deleteQuiz: async (quizId: string): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/teacher/quiz/${quizId}`);
    return response.data;
  },

  createQuestion: async (quizId: string, data: CreateQuestionRequest): Promise<CreateQuestionResponse> => {
    const response = await api.post<CreateQuestionResponse>(`/teacher/${quizId}/add-question`, data);
    return response.data;
  },

  editQuestion: async (questionId: string, data: EditQuestionRequest): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(`/teacher/question/${questionId}`, data);
    return response.data;
  },

  deleteQuestion: async (questionId: string): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/teacher/question/${questionId}`);
    return response.data;
  },

  getStudentIssues: async (): Promise<StudentIssue[]> => {
    const response = await api.get<StudentIssue[]>('/teacher/student-issues');
    return response.data;
  },

  getUpdates: async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>('/teacher/updates');
    return response.data;
  },

  getMyQuizzes: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/teacher/my-quizzes');
    return response.data;
  },

  getEvaluation: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/teacher/evaluation');
    return response.data;
  },

  getFeedback: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/teacher/feedback');
    return response.data;
  },

  getSubmissions: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/teacher/submissions');
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/teacher/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/teacher/profile', data);
    return response.data;
  },
};
