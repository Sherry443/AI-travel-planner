import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your AI travel planner. Where would you like to go?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const formatBold = (text) =>
    text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    const chatHistory = newMessages
      .map((msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
      .join("\n");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`, // <-- Replace this
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-70b-instruct",
          messages: [{ role: "user", content: chatHistory }],
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (data?.choices?.[0]?.message?.content) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.choices[0].message.content }]);
      } else if (data?.error?.message) {
        setMessages((prev) => [...prev, { sender: "bot", text: `API Error: ${data.error.message}` }]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: "Unexpected response from API." }]);
      }
    } catch (error) {
      setIsLoading(false);
      setMessages((prev) => [...prev, { sender: "bot", text: "Network error or invalid response." }]);
    }
  };

  const handleSend = () => sendMessage(inputText);

  return (
    <div>
      {/* Widget Toggle Button */}
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer text-lg font-bold shadow-lg"
      >
        {isOpen ? "×" : "AI"}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-300">
          <div className="bg-red-600 text-white font-semibold p-3 text-center">🌍 AI Travel Chat</div>

          <div className="h-96 overflow-y-auto p-3 flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm px-3 py-2 rounded-xl max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-red-600 text-white self-end"
                    : "bg-black text-white self-start"
                }`}
              >
                {formatBold(msg.text)}
              </div>
            ))}
            {isLoading && <div className="text-gray-400 text-sm mt-2 self-start">Thinking...</div>}
          </div>

          <div className="flex gap-2 border-t p-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about your trip..."
              className="flex-1 p-2 border rounded-md text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
