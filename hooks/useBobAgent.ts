import { useState } from 'react';

export function useBobAgent() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendPrompt = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_GROQ_API_KEY`, // Remplace par ta clé
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await res.json();

      if (data.choices?.[0]?.message?.content) {
        setResponse(data.choices[0].message.content.trim());
      } else {
        setError('Réponse invalide.');
      }
    } catch (err: any) {
      setError('Erreur : ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    error,
    sendPrompt,
  };
}