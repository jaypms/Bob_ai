import { useState, useEffect } from 'react';

type BobAgentState = {
  loading: boolean;
  error: string | null;
  response: string | null;
};

export function useBobAgent() {
  const [state, setState] = useState<BobAgentState>({
    loading: false,
    error: null,
    response: null,
  });

  async function sendPrompt(prompt: string) {
    setState({ loading: true, error: null, response: null });
    try {
      // Ici, appeler une API d'IA gratuite comme Hugging Face inference API
      const res = await fetch('https://api-inference.huggingface.co/models/gpt2', {
        method: 'POST',
        headers: {
          Authorization: `Bearer YOUR_HUGGINGFACE_API_TOKEN`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          options: { wait_for_model: true },
        }),
      });
      const data = await res.json();
      if (data.error) {
        setState({ loading: false, error: data.error, response: null });
      } else {
        setState({ loading: false, error: null, response: data[0]?.generated_text ?? '' });
      }
    } catch (err) {
      setState({ loading: false, error: (err as Error).message, response: null });
    }
  }

  return { ...state, sendPrompt };
}