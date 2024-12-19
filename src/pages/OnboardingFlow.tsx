import { useUserStore } from '../store/userStore';
import { useAdminStore } from '../store/adminStore';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { StepIndicator } from '../components/StepIndicator';
import { AuthStep } from '../components/AuthStep';
import { useUserDataSubmission } from '../hooks/useUserDataSubmission';
import { useAuth } from '../hooks/useAuth';
import { FormStep } from '../components/FormStep';
import { StatusMessage } from '../components/onboarding/StatusMessage';




export default function OnboardingFlow() {
  const { currentStep, userData, setStep, updateUserData } = useUserStore();
  const { pageTwo, pageThree } = useAdminStore();
  const { isLogin, setIsLogin,userId, errorMessage: authError, successMessage: authSuccess, signIn, signUp } = useAuth();
  const { errorMessage: submissionError, successMessage: submissionSuccess, submitUserData } = useUserDataSubmission();

  



  const handleSubmit = async () => {
    try {
      if (currentStep === 1) {
        let success = false;
        if (isLogin) {
          success = await signIn(userData.email, userData.password as string);
        } else {
          success = await signUp(userData.email, userData.password as string);
        }
        if (!success) {
          return; // Don't proceed to next step if authentication failed
        }
        setStep(currentStep + 1);
      } else if (currentStep === 3) {
             
        await submitUserData(userId as string);
   
        } else {
          setStep(currentStep + 1);
       }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  // Get components for the current step based on page configuration
  const getCurrentComponents = () => currentStep === 2 ? pageTwo : pageThree;
  const ErrorMessage = (authError || submissionError);
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {currentStep > 1 ? 'Enter details' : isLogin ? 'Log in to your account' : 'Create your account'}
        </h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <StepIndicator currentStep={currentStep} />
          
          <StatusMessage 
            error={authError || submissionError}
            success={submissionSuccess || authError}
          />
          
       {currentStep === 1 ? (
            <AuthStep 
              userData={userData} 
              updateUserData={updateUserData} 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} 
            />
          ) : (
            <FormStep
              components={getCurrentComponents()}
              userData={userData}
              updateUserData={updateUserData}
            />
          )}

          <div className="mt-6 flex justify-between">
            {currentStep > 2 && (
              <button onClick={() => setStep(currentStep - 1)} className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5 mr-2" /> Previous
              </button>
            )}
            <button onClick={handleSubmit} className="ml-auto flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              {currentStep === 1 ? (isLogin ? 'Log In' : 'Sign Up') : (currentStep === 3 ? 'Submit' : 'Next')}
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
