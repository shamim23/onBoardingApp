import { ComponentType } from '../store/adminStore';

export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const getComponentLabel = (component: ComponentType): string => {
  switch (component) {
    case 'about':
      return 'About Me';
    case 'address':
      return 'Address';
    case 'birthdate':
      return 'Date of Birth';
    default:
      return component;
  }
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

