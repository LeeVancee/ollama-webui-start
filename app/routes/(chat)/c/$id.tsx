import { ChatLayout } from '@/components/chat/chat-layout';
import React from 'react';
import useChatStore from '@/hooks/useChatStore';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(chat)/c/$id')({
  loader: ({ params }) => {
    const { id } = params;

    return {
      id,
    };
  },
  component: ChatPage,
});

function ChatPage() {
  const { id: chatId } = Route.useParams();
  const getChatById = useChatStore.getState().getChatById;
  const chat = getChatById(chatId);

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center ">
      {chat && (
        <ChatLayout
          key={chatId}
          id={chatId}
          initialMessages={chat.messages}
          navCollapsedSize={10}
          defaultLayout={[30, 160]}
        />
      )}
    </main>
  );
}
