import { useState, useEffect, useCallback } from 'react';
import api from '../utils/axios';

const ProjectsAdmin = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); // I see you added this in your screenshot!

    // 1. Wrap the function in useCallback
    const fetchProjects = useCallback(async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch {
            console.error('Failed to fetch projects');
            setError('Failed to fetch projects');
        }
    }, []); // Empty dependency array means this function is only created once

    // 2. Add it to the useEffect dependency array
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // ... the rest of your handleAddProject and handleDelete functions remain exactly the same!
    const handleAddProject = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/projects', { name, description });
            setName('');
            setDescription('');
            setError('');
            fetchProjects(); // Refresh the list
        } catch (error) {
            console.error('Failed to add project', error);
            setError('Failed to add project');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this project?')) return;
        try {
            await api.delete(`/projects/${id}`);
            setError('');
            fetchProjects();
        } catch (error) {
            console.error('Failed to delete project', error);
            setError('Failed to delete project');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 p-6 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">Manage Projects</h1>
                
                {/* Add Project Form */}
                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-400">Add New Project</h2>
                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleAddProject} className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="text" 
                            required 
                            placeholder="Project Name (e.g., Marketing)" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
                        />
                        <input 
                            type="text" 
                            placeholder="Description (Optional)" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none focus:border-indigo-500"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                            {isLoading ? 'Adding...' : 'Add Project'}
                        </button>
                    </form>
                </div>

                {/* Active Projects List */}
                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-white">Active Projects</h2>
                    <div className="space-y-3">
                        {projects.length === 0 ? <p className="text-gray-400">No active projects found.</p> : null}
                        {projects.map(project => (
                            <div key={project._id} className="flex justify-between items-center bg-slate-900 border border-slate-700 p-4 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-indigo-300">{project.name}</h3>
                                    <p className="text-sm text-gray-500">{project.description}</p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(project._id)}
                                    className="text-red-400 hover:text-red-300 text-sm border border-red-900 hover:bg-red-900/30 px-3 py-1 rounded-md transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsAdmin;

