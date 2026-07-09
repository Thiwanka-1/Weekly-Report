import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import api from '../utils/axios';

const AiChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', content: 'Hello! I am your team AI assistant. Ask me about recent reports or blockers.' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const userMsg = question;
        setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
        setQuestion('');
        setIsLoading(true);

        try {
            const res = await api.post('/ai/chat', { question: userMsg });
            setChatHistory(prev => [...prev, { role: 'ai', content: res.data.answer }]);
        } catch {
            setChatHistory(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error fetching the data.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] transition-all">
                    <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                        <h3 className="font-semibold flex items-center gap-2">
                            <MessageCircle size={18} /> Team AI Assistant
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/50">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-700 text-gray-100 rounded-bl-none'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-700 text-gray-100 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" /> Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSend} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
                        <input 
                            type="text" 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask about team activity..." 
                            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                        />
                        <button type="submit" disabled={isLoading || !question.trim()} className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-transform hover:scale-110 flex items-center justify-center"
                >
                    <MessageCircle size={28} />
                </button>
            )}
        </div>
    );
};

export default AiChatWidget;