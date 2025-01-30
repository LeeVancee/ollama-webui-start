import { ChatLayout } from '@/components/chat/chat-layout';
import React from 'react';
import useChatStore from '@/hooks/useChatStore';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(chat)/c/$id')({
  loader: ({ params }) => {
    const { id } = params;
    const getChatById = useChatStore.getState().getChatById;
    const chat = getChatById(id);

    if (!chat) {
      throw redirect({
        //@ts-expect-error
        to: '/not-found',
      });
    }

    return { chat };
  },
  component: ChatPage,
});

function ChatPage() {
  const { chat } = Route.useLoaderData();
  const { id: chatId } = Route.useParams();

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center ">
      <ChatLayout
        key={chatId}
        id={chatId}
        initialMessages={chat.messages}
        navCollapsedSize={10}
        defaultLayout={[30, 160]}
      />
    </main>
  );
}
