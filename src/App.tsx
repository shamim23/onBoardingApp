import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnboardingFlow from './pages/OnboardingFlow';
import AdminPage from './pages/AdminPage';
import DataTable from './pages/DataTable';

function App() {

   //const [isLogin,setIsLogin] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingFlow />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/data" element={<DataTable />} />
      </Routes>
    </Router>
  );
}

export default App;