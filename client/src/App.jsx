import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Placeholder components - we will move these to their own files in the /pages folder next!
const Login = () => <div className="p-8 text-2xl font-bold text-blue-600">Login Page</div>;
const Register = () => <div className="p-8 text-2xl font-bold text-green-600">Register Page</div>;
const PersonalReport = () => <div className="p-8 text-2xl font-bold">My Weekly Report</div>;
const TeamDashboard = () => <div className="p-8 text-2xl font-bold">Manager Dashboard</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes (We will add an Auth Wrapper to these later) */}
        <Route path="/my-reports" element={<PersonalReport />} />
        <Route path="/dashboard" element={<TeamDashboard />} />

        {/* Catch-all: Redirect to login if they try to access the root url */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;