import { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AuthContext } from '../context/AuthContext';
import AiChatWidget from '../components/AiChatWidget';
import api from '../utils/axios';

const TeamDashboard = () => {
    const { logout } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [metrics, setMetrics] = useState({ total: 0, blockers: 0, complianceRate: '0%' });
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch reports across the team
                const res = await api.get('/reports/team');
                const data = res.data;
                setReports(data);

                // Calculate Summary Metrics
                const total = data.length;
                const blockersCount = data.filter(r => r.blockers && r.blockers.trim() !== 'None' && r.blockers.trim() !== '').length;
                
                // Assuming compliance is total reports vs expected (Mocking expected at 10 for demo purposes)
                const compliance = Math.min((total / 10) * 100, 100).toFixed(0) + '%';
                
                setMetrics({ total, blockers: blockersCount, complianceRate: compliance });

                // Format data for Recharts (Workload/Task distribution by project)
                const projectCounts = {};
                data.forEach(r => {
                    const pName = r.projectId?.name || 'Unassigned';
                    projectCounts[pName] = (projectCounts[pName] || 0) + 1;
                });
                const formattedChartData = Object.keys(projectCounts).map(key => ({
                    name: key,
                    reports: projectCounts[key]
                }));
                setChartData(formattedChartData);

            } catch (error) {
                console.error("Error fetching team reports", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 p-6 font-sans">
            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manager Dashboard</h1>
                    <p className="text-sm text-gray-400">Team overview and insights</p>
                </div>
                <button onClick={logout} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-lg border border-slate-600 transition-colors">
                    Logout
                </button>
            </div>

            {isLoading ? (
                <div className="text-center text-gray-400 mt-20">Loading dashboard...</div>
            ) : (
                <div className="max-w-7xl mx-auto space-y-6">
                    
                    {/* Summary Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg text-center">
                            <h3 className="text-gray-400 font-medium mb-2">Total Reports (This Week)</h3>
                            <p className="text-4xl font-bold text-indigo-400">{metrics.total}</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg text-center">
                            <h3 className="text-gray-400 font-medium mb-2">Submission Compliance</h3>
                            <p className="text-4xl font-bold text-green-400">{metrics.complianceRate}</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg text-center">
                            <h3 className="text-gray-400 font-medium mb-2">Open Blockers</h3>
                            <p className="text-4xl font-bold text-red-400">{metrics.blockers}</p>
                        </div>
                    </div>

                    {/* Chart & Recent Activity Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Recharts Chart */}
                        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-6 text-white">Reports by Project</h3>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="name" stroke="#94a3b8" />
                                        <YAxis stroke="#94a3b8" allowDecimals={false} />
                                        <Tooltip cursor={{fill: '#334155'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                        <Bar dataKey="reports" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Activity Feed */}
                        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg overflow-y-auto max-h-[380px]">
                            <h3 className="text-xl font-semibold mb-4 text-white">Recent Submissions</h3>
                            <div className="space-y-4">
                                {reports.length === 0 ? (
                                    <p className="text-gray-400">No reports submitted yet.</p>
                                ) : (
                                    reports.map(report => (
                                        <div key={report._id} className="p-4 bg-slate-900 border border-slate-700 rounded-lg">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-indigo-300">{report.userId?.name}</h4>
                                                <span className="text-xs text-gray-500">{new Date(report.submissionDate).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm text-gray-300 mb-1"><span className="text-gray-500">Project:</span> {report.projectId?.name}</p>
                                            <p className="text-sm text-gray-300 truncate"><span className="text-gray-500">Completed:</span> {report.tasksCompleted}</p>
                                            {report.blockers && <p className="text-sm text-red-400 mt-1">Blocker: {report.blockers}</p>}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* The AI Chat Assistant Widget Component */}
            <AiChatWidget />
        </div>
    );
};

export default TeamDashboard;