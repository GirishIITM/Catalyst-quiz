import type { registerFormData } from "@/types/auth.types";

export const emailValidator = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const passwordValidator = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export const nameValidator = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
}

export const usernameValidator = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
}

export const validateForm = (props: { formData: registerFormData, allowWeakPassword: boolean }) => {
  const errors: registerFormData = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    username: "",
    role: "student",
    metadata: {}
  };
  const { formData, allowWeakPassword } = props;
  let hasError = false;


  if (!emailValidator(formData.email)) {
    errors.email = "Invalid email format";
    hasError = true;
  }

  if (!passwordValidator(formData.password) && !allowWeakPassword) {
    errors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    hasError = true;
  }

  if (!nameValidator(formData.name)) {
    errors.name = "Name must be at least 2 characters long and contain only letters";
    hasError = true;
  }

  if (!usernameValidator(formData.username)) {
    errors.username = "Username must be at least 3 characters long and contain only letters, numbers, and underscores";
    hasError = true;
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    hasError = true;
  }

  return { hasError, errors };
};
