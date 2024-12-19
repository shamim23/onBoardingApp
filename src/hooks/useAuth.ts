import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useUserStore } from '../store/userStore';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { updateUserData } = useUserStore();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        setIsLogin(true);
        setUserId(session.user.id);
      }
    };
    checkSession();
  }, []);

  const handleAuthError = (error: Error) => {
    let message;
    if (error.message.includes('Invalid login credentials')) {
      message = 'Invalid email or password. Please try again.';
    } else if (error.message.includes('User already registered')) {
      message = 'This email is already registered. Please try logging in instead.';
    } else if (error.message.includes('Email not confirmed')) {
      message = 'Please confirm your email address before logging in.';
    } else if (error.message.includes('Password is too short')) {
      message = 'Your password must be at least 8 characters long.';
    } else {
      message = error.message || 'An error occurred during authentication.';
    }
    
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
    throw new Error(message);
  };

  const fetchUserData = async (email: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('Failed to fetch user data');
      setTimeout(() => setErrorMessage(''), 5000);
    } else if (data) {
      updateUserData({
        email: data.email,
        about: data.about || '',
        address: {
          street: data.street || '',
          city: data.city || '',
          state: data.state || '',
          zip: data.zip || '',
        },
        birthdate: data.birthdate || '',
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUserId(data.user?.id || null);
      setErrorMessage('');
      if (data.user) await fetchUserData(data.user.email);
      return true;
    } catch (error) {
      return handleAuthError(error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setSuccessMessage('Sign-up successful! Please check your email to confirm your account.');
      setTimeout(() => setSuccessMessage(''), 5000);
      return true;
    } catch (error) {
      return handleAuthError(error);
    }
  };

  

  return {
    isLogin,
    setIsLogin,
    userId,
    errorMessage,
    successMessage,
    signIn,
    signUp,
  };
};
