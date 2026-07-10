import { useState, useEffect, useContext } from 'react';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';

const PersonalReport = () => {
    const { user, logout } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        weekStartDate: '',
        weekEndDate: '',
        projectId: '',
        tasksCompleted: '',
        tasksPlanned: '',
        blockers: '',
        hoursWorked: '',
        notes: ''
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            } catch {
                console.error('Failed to load projects');
            }
        };

        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const preventManualDateInput = (e) => {
        if (e.key !== 'Tab' && e.key !== 'Shift') {
            e.preventDefault();
        }
    };

    const openDatePicker = (e) => {
        e.currentTarget.showPicker?.();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            await api.post('/reports', formData);

            setMessage({
                type: 'success',
                text: 'Weekly report submitted successfully!'
            });

            setFormData(prev => ({
                ...prev,
                projectId: '',
                tasksCompleted: '',
                tasksPlanned: '',
                blockers: '',
                hoursWorked: '',
                notes: ''
            }));
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to submit report'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 p-6 font-sans">
            {/* Top Navigation Bar */}
            <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
                <div>
                    <h1 className="text-2xl font-bold text-white">My Weekly Reports</h1>
                    <p className="text-sm text-gray-400">Welcome back, {user?.name}</p>
                </div>

                <button
                    onClick={logout}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg transition-colors border border-slate-600"
                >
                    Logout
                </button>
            </div>

            {/* The Form Card */}
            <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-6 text-indigo-400">Submit New Report</h2>

                {message.text && (
                    <div
                        className={`mb-6 p-4 rounded-lg text-sm ${
                            message.type === 'success'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dates & Project Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Week Start Date *
                            </label>

                            <input
                                type="date"
                                name="weekStartDate"
                                required
                                value={formData.weekStartDate}
                                onChange={handleChange}
                                onClick={openDatePicker}
                                onKeyDown={preventManualDateInput}
                                onPaste={(e) => e.preventDefault()}
                                onDrop={(e) => e.preventDefault()}
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Week End Date *
                            </label>

                            <input
                                type="date"
                                name="weekEndDate"
                                required
                                value={formData.weekEndDate}
                                onChange={handleChange}
                                onClick={openDatePicker}
                                onKeyDown={preventManualDateInput}
                                onPaste={(e) => e.preventDefault()}
                                onDrop={(e) => e.preventDefault()}
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Project / Category *
                            </label>

                            <select
                                name="projectId"
                                required
                                value={formData.projectId}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none cursor-pointer"
                            >
                                <option value="" disabled>
                                    Select a project...
                                </option>

                                {projects.map(p => (
                                    <option key={p._id} value={p._id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Text Areas */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Tasks Completed *
                            </label>

                            <textarea
                                name="tasksCompleted"
                                required
                                rows="3"
                                value={formData.tasksCompleted}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-y"
                                placeholder="What did you finish this week?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Tasks Planned for Next Week *
                            </label>

                            <textarea
                                name="tasksPlanned"
                                required
                                rows="3"
                                value={formData.tasksPlanned}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-y"
                                placeholder="What is on the agenda?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Blockers / Challenges *
                            </label>

                            <textarea
                                name="blockers"
                                required
                                rows="2"
                                value={formData.blockers}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-y"
                                placeholder="Anything slowing you down?"
                            />
                        </div>
                    </div>

                    {/* Optionals Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Hours Worked (Optional)
                            </label>

                            <input
                                type="number"
                                name="hoursWorked"
                                min="0"
                                step="0.5"
                                value={formData.hoursWorked}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Additional Notes / Links (Optional)
                            </label>

                            <input
                                type="text"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                placeholder="Jira links, PRs, etc."
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Weekly Report'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalReport;