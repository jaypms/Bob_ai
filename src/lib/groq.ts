import 'dotenv/config';

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("La clé GROQ_API_KEY est manquante dans le fichier .env");
}

export async function callGroq(prompt: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: 'Tu es Bob, un assistant expert.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Aucune réponse.';
}