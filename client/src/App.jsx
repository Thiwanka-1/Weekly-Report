import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalReport from './pages/PersonalReport';
import TeamDashboard from './pages/TeamDashboard';
import ProjectsAdmin from './pages/ProjectsAdmin';
import MemberDashboard from './pages/MemberDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes for ANY logged-in user */}
          <Route element={<ProtectedRoute />}>
              <Route path="/member-dashboard" element={<MemberDashboard />} />
              <Route path="/my-reports" element={<PersonalReport />} />
          </Route>
          
          {/* Protected Routes for MANAGERS ONLY */}
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