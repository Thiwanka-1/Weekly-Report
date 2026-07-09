import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export const generateAIResponse = async (managerQuestion, reportsContext) => {
    try {
        // We instruct Llama 3 on how to behave using a system prompt
        const systemPrompt = `You are a helpful AI assistant for a team manager. 
        You analyze weekly work reports. Use the provided reports context to answer the manager's question. 
        Keep your answers concise, professional, and directly related to the provided data.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Context (Recent Reports):\n${reportsContext}\n\nManager Question: ${managerQuestion}` }
            ],
            // Llama 3 8B is lightning fast and perfect for this task
            model: 'llama3-8b-8192', 
            temperature: 0.5,
        });

        return chatCompletion.choices[0]?.message?.content || 'No response generated.';
    } catch (error) {
        console.error('Groq API Error:', error);
        throw new Error('Failed to generate AI response');
    }
};