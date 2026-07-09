import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalReport from './pages/PersonalReport';
import TeamDashboard from './pages/TeamDashboard';
import ProjectsAdmin from './pages/ProjectsAdmin';

// Placeholder
//const TeamDashboard = () => <div className="p-8 text-2xl font-bold">Manager Dashboard</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes using the wrapper! */}
          <Route element={<ProtectedRoute />}>
              <Route path="/my-reports" element={<PersonalReport />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
              <Route path="/dashboard" element={<TeamDashboard />} />
              <Route path="/proj" element={<ProjectsAdmin />} />

          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;