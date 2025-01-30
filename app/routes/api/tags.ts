import { createAPIFileRoute } from '@tanstack/start/api';

export const APIRoute = createAPIFileRoute('/api/tags')({
  GET: async ({ request, params }) => {
    const OLLAMA_URL = import.meta.env.VITE_OLLAMA_URL || 'http://127.0.0.1:11434';
    const res = await fetch(OLLAMA_URL + '/api/tags');
    return new Response(res.body, res);
  },
});
