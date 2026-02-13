"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, X, Minimize2, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "@/components/motion";

import type { ChatMessage } from "@/lib/types/ai-assistant";
import {
  quickActions,
  initialMessage,
  getAIResponse,
} from "@/lib/mock-data/ai-assistant";

// ==================
// Typing Indicator Component
// ==================
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 mb-4">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex items-center gap-1">
          <span
            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

// ==================
// Message Bubble Component
// ==================
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const timeStr = message.timestamp.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "flex items-start gap-2.5 mb-4",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      ) : (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[75%] flex flex-col",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line",
            isUser
              ? "bg-blue-600 text-white rounded-2xl rounded-tr-md"
              : "bg-gray-100 text-gray-900 rounded-2xl rounded-tl-md",
          )}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-gray-400 mt-1 px-1">{timeStr}</span>
      </div>
    </motion.div>
  );
}

// ==================
// Main Component
// ==================
let messageIdCounter = 1;
function generateId(): string {
  return `msg-${Date.now()}-${messageIdCounter++}`;
}

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change or typing indicator appears
  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: getAIResponse(text),
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiResponse]);
    }, delay);
  };

  const handleSendMessage = () => {
    sendMessage(chatInput);
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => {
              setIsOpen(true);
              setNotifications(0);
            }}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center justify-center group"
          >
            <Bot className="h-7 w-7 transition-transform group-hover:scale-110" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
                {notifications}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-6 right-6 z-50 shadow-2xl rounded-2xl bg-white overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI 智能秘书</h3>
                  <p className="text-xs text-white/80">随时为您服务</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content area */}
            <AnimatePresence initial={false}>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div
                    className="flex flex-col"
                    style={{ width: 440, height: 600 }}
                  >
                    {/* Chat messages area */}
                    <ScrollArea ref={scrollRef} className="flex-1">
                      <div className="p-4">
                        {messages.map((message) => (
                          <MessageBubble key={message.id} message={message} />
                        ))}
                        {isTyping && <TypingIndicator />}
                      </div>
                    </ScrollArea>

                    {/* Quick action chips */}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {quickActions.map((action) => (
                          <Badge
                            key={action}
                            variant="secondary"
                            className="flex-shrink-0 cursor-pointer px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors whitespace-nowrap select-none"
                            onClick={() => handleQuickAction(action)}
                          >
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Input area */}
                    <div className="border-t border-gray-100 p-3 bg-gray-50/50">
                      <div className="flex gap-2">
                        <Input
                          ref={inputRef}
                          placeholder="输入您的问题或指令..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          disabled={isTyping}
                          className="text-sm h-10 flex-1 rounded-xl border-gray-200 bg-white focus-visible:ring-blue-500"
                        />
                        <Button
                          size="sm"
                          className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                          onClick={handleSendMessage}
                          disabled={!chatInput.trim() || isTyping}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
