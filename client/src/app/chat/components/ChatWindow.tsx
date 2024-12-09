"use client";

import { useChat } from "../hooks/useChat";

export default function ChatWindow({ chatId }: { chatId: string }) {
  const { messages, inputValue, setInputValue, sendMessage } = useChat(chatId);
  const userId = localStorage.getItem("userId");

  return (
    <div className="flex flex-col flex-grow bg-white">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow ${
                message.senderId === userId
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.senderId === userId
                  ? " text-white"
                  : " text-gray-500"
              } `}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-300 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
