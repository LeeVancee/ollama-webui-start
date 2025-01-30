import { json } from '@tanstack/start';
import { createAPIFileRoute } from '@tanstack/start/api';
import { createOllama } from 'ollama-ai-provider';
import { streamText, convertToCoreMessages, CoreMessage, UserContent } from 'ai';

export const APIRoute = createAPIFileRoute('/api/chat')({
  POST: async ({ request, params }) => {
    const { messages, selectedModel, data } = await request.json();

    const ollamaUrl = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434';

    const initialMessages = messages.slice(0, -1);
    const currentMessage = messages[messages.length - 1];

    const ollama = createOllama({ baseURL: ollamaUrl + '/api' });

    // Build message content array directly
    const messageContent: UserContent = [{ type: 'text', text: currentMessage.content }];

    // Add images if they exist
    data?.images?.forEach((imageUrl: string) => {
      const image = new URL(imageUrl);
      messageContent.push({ type: 'image', image });
    });

    // Stream text using the ollama model
    const result = await streamText({
      model: ollama(selectedModel),
      messages: [...convertToCoreMessages(initialMessages), { role: 'user', content: messageContent }],
    });

    return result.toDataStreamResponse();
  },
});
