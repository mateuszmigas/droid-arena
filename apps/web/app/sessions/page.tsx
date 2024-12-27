"use client";

import { useEffect, useState, FormEvent } from "react";

export default function Page() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Array<{ content: string }>>([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const handleMessageSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          username: "user",
          content: message,
        })
      );
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        {!isConnected && (
          <span className="text-red-500 ml-2">Disconnected</span>
        )}
      </div>

      <div className="border rounded p-4 h-[400px] mb-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleMessageSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}

