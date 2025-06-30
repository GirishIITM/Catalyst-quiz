import api from './config';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  SendOtpRequest,
  VerifyOtpRequest,
  ForgotPasswordRequest,
  ApiResponse
} from '../types/api.types';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/register', data);
    return response.data;
  },

  sendOtp: async (data: SendOtpRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/send-otp', data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/verify-otp', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/forgot-password', data);
    return response.data;
  },
};
