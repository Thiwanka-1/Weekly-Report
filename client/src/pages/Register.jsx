import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Team Member' // Default role
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const userData = await register(formData);
            // Route based on their newly selected role
            if (userData.role === 'Manager') {
                navigate('/dashboard');
            } else {
                navigate('/my-reports');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // The animated gradient background
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 absolute inset-0 z-[-1]">
            
            {/* The Glassmorphic Card (slightly taller to accommodate more fields) */}
            <div className="w-full max-w-md p-8 m-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Join the Team</h1>
                    <p className="text-gray-300 mt-2">Create your account to get started</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            placeholder="Alex Morgan"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            placeholder="you@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Account Role</label>
                        <select 
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                        >
                            {/* We use a dark background for the options so they are visible when the dropdown opens */}
                            <option value="Team Member" className="bg-slate-800 text-white">Team Member</option>
                            <option value="Manager" className="bg-slate-800 text-white">Manager / Admin</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-300 hover:text-white font-medium transition-colors">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;