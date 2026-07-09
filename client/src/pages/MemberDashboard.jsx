import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';

const MemberDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [myReports, setMyReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMyReports = async () => {
            try {
                // This hits the backend route we already built: getMyReports
                const res = await api.get('/reports');
                setMyReports(res.data);
            } catch (error) {
                console.error("Error fetching reports", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyReports();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 p-6 font-sans">
            {/* Header */}
            <div className="max-w-5xl mx-auto flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
                    <p className="text-sm text-gray-400">Welcome back, {user?.name}</p>
                </div>
                <button onClick={logout} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg border border-slate-600 transition-colors">
                    Logout
                </button>
            </div>

            {/* Action Banner */}
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center border border-indigo-700/50">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold text-white mb-2">Ready to submit this week's report?</h2>
                    <p className="text-indigo-200">Keep your manager updated on your progress and blockers.</p>
                </div>
                <Link to="/my-reports" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105">
                    + Create New Report
                </Link>
            </div>

            {/* Report History */}
            <div className="max-w-5xl mx-auto">
                <h3 className="text-xl font-semibold mb-4 text-white">My Past Submissions</h3>
                
                {isLoading ? (
                    <div className="text-gray-400">Loading your history...</div>
                ) : myReports.length === 0 ? (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center text-gray-400">
                        You haven't submitted any reports yet. Click the button above to get started!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {myReports.map(report => (
                            <div key={report._id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                                <div className="flex justify-between items-start mb-4 border-b border-slate-700 pb-2">
                                    <span className="font-semibold text-indigo-300">
                                        {new Date(report.weekStartDate).toLocaleDateString()} - {new Date(report.weekEndDate).toLocaleDateString()}
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-slate-700 rounded-md text-gray-300">
                                        {report.projectId?.name || 'No Project'}
                                    </span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-500 block text-xs uppercase tracking-wider">Completed</span> <span className="text-gray-200 line-clamp-2">{report.tasksCompleted}</span></p>
                                    <p><span className="text-gray-500 block text-xs uppercase tracking-wider mt-2">Blockers</span> <span className={`${report.blockers ? 'text-red-400' : 'text-gray-400'}`}>{report.blockers || 'None'}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberDashboard;