import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useUserStore } from '../store/userStore';

export const useUserDataSubmission = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { userData } = useUserStore();

  const submitUserData = async (userId: string) => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
  
    setErrorMessage('');
    setSuccessMessage('');
  
    const userDataToSubmit = {
      email: userData.email,
      about: userData.about,
      street: userData.address.street,
      city: userData.address.city,
      state: userData.address.state,
      zip: userData.address.zip,
      birthdate: userData.birthdate,
    };
  
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', userData.email)
      .single();
  
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user data:', fetchError);
      setErrorMessage('Failed to fetch user data. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
  
    let response;
    debugger;
    if (existingUser) {
      const { error } = await supabase.from('users').update(userDataToSubmit).eq('email', userData.email);
      
      if (error) {
        console.error('Error updating user data:', error);
        setErrorMessage('Failed to update user data. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        setSuccessMessage('User data updated successfully!');
        setTimeout(() => setSuccessMessage(''), 2000);
      }
    } else {
      const { error } = await supabase.from('users').insert([userDataToSubmit]);
  
      if (error) {
        console.error('Error inserting user data:', error);
        setErrorMessage('Failed to insert user data. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        setSuccessMessage('User data inserted successfully!');
        setTimeout(() => setSuccessMessage(''), 2000);
      }
    }
  };

  return {
    errorMessage,
    successMessage,
    submitUserData,
  };
};

