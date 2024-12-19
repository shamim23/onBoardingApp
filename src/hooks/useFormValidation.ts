import { useState, useCallback } from 'react';
import { validateEmail, validatePassword } from '../utils/onboardingUtils';

interface ValidationRules {
  [key: string]: (value: any) => boolean;
}

export const useFormValidation = (initialState: any, validationRules: ValidationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = useCallback((name: string, value: any) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
    if (validationRules[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: validationRules[name](value) ? '' : `Invalid ${name}`,
      }));
    }
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors: {[key: string]: string} = {};
    let isValid = true;

    Object.keys(validationRules).forEach(key => {
      if (!validationRules[key](values[key])) {
        newErrors[key] = `Invalid ${key}`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  return { values, errors, handleChange, validateForm };
};

