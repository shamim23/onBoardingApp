import { Mail, Lock } from 'lucide-react';

interface AuthStepProps {
  userData: {
    email: string;
    password?: string;
  };
  updateUserData: (data: any) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export function AuthStep({ userData, updateUserData, isLogin, setIsLogin }: AuthStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1 relative">
          <input
            type="email"
            className="w-full p-2 pl-10 border rounded-md"
            value={userData.email}
            onChange={(e) => updateUserData({ email: e.target.value })}
          />
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1 relative">
          <input
            type="password"
            className="w-full p-2 pl-10 border rounded-md"
            value={userData.password}
            onChange={(e) => updateUserData({ password: e.target.value })}
          />
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Toggle between Sign Up and Log In */}
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-indigo-600 hover:text-indigo-500"
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
      </button>
    </div>
  );
}
