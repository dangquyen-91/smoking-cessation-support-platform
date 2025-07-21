"use client";

import type React from "react";

import {
    useGetChatRoomByParticipant,
    useGetListMessagesByChatRoomId,
    useSendMessageToChatRoom,
} from "@/queries/chatroom.query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, Clock, User } from "lucide-react";
import { format } from "date-fns";

interface Message {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    user: boolean;
}

interface ChatRoom {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    createdById: number;
    participantId: number;
    messages: Message[];
}

export default function CoachMessagesManagement() {
    const { data: listChatRoom } = useGetChatRoomByParticipant();
    const [chatRoomId, setChatRoomId] = useState<number | null>(null);
    const { data: listMessage } = useGetListMessagesByChatRoomId(chatRoomId);
    const { mutateAsync: sendMessageToChatRoom } = useSendMessageToChatRoom();
    const [messageContent, setMessageContent] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async () => {
        if (!messageContent.trim() || !chatRoomId || isSending) return;

        setIsSending(true);
        try {
            await sendMessageToChatRoom({
                chatRoomId: chatRoomId,
                messageData: {
                    content: messageContent.trim(),
                    user: false, // Coach message
                },
            });
            setMessageContent("");
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const selectedChatRoom = listChatRoom?.find(
        (room: ChatRoom) => room.id === chatRoomId
    );
    const messages = listMessage || selectedChatRoom?.messages || [];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - Chat Rooms List */}
            <div className="w-1/3 bg-white border-r border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <MessageCircle className="h-6 w-6" />
                        Quản lý tin nhắn tư vấn
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Trả lời các câu hỏi từ học viên
                    </p>
                </div>

                <ScrollArea className="h-[calc(100vh-120px)]">
                    <div className="p-4 space-y-3">
                        {listChatRoom?.map((room: ChatRoom) => (
                            <Card
                                key={room.id}
                                className={`cursor-pointer transition-all hover:shadow-md ${
                                    chatRoomId === room.id
                                        ? "ring-2 ring-blue-500 bg-blue-50"
                                        : ""
                                }`}
                                onClick={() => setChatRoomId(room.id)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                                            {room.name}
                                        </h3>
                                        <Badge
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            ID: {room.createdById}
                                        </Badge>
                                    </div>

                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                        {room.description}
                                    </p>

                                    {room.messages.length > 0 && (
                                        <div className="bg-gray-50 rounded p-2 mb-2">
                                            <p className="text-xs text-gray-700 line-clamp-2">
                                                {
                                                    room.messages[
                                                        room.messages.length - 1
                                                    ].content
                                                }
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {format(
                                                new Date(room.updatedAt),
                                                "dd/MM HH:mm"
                                            )}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {room.messages.length} tin nhắn
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {!listChatRoom?.length && (
                            <div className="text-center py-8 text-gray-500">
                                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>Chưa có phòng chat nào</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Content - Messages */}
            <div className="flex-1 flex flex-col">
                {chatRoomId ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {selectedChatRoom?.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {selectedChatRoom?.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <User className="h-4 w-4" />
                                    <span>
                                        Học viên ID:{" "}
                                        {selectedChatRoom?.createdById}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-4 max-w-4xl">
                                {messages.map((message: Message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${
                                            !message.user
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div className="max-w-[70%]">
                                            <div
                                                className={`rounded-lg p-4 ${
                                                    !message.user
                                                        ? "bg-blue-500 text-white" // Student messages - blue, on right
                                                        : "bg-gray-100 border border-gray-200 text-gray-900" // Coach messages - gray, on left
                                                }`}
                                            >
                                                <p className="text-sm">
                                                    {message.content}
                                                </p>
                                            </div>
                                            <div
                                                className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                                                    !message.user
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <span>
                                                    {message.user
                                                        ? "Học viên"
                                                        : "Huấn luyện viên"}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    {format(
                                                        new Date(
                                                            message.createdAt
                                                        ),
                                                        "dd/MM HH:mm"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {messages.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-30" />
                                        <p>
                                            Chưa có tin nhắn nào trong cuộc trò
                                            chuyện này
                                        </p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        {/* Message Input */}
                        <div className="bg-white border-t border-gray-200 p-6">
                            <div className="flex gap-3">
                                <Input
                                    value={messageContent}
                                    onChange={(e) =>
                                        setMessageContent(e.target.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập câu trả lời tư vấn..."
                                    className="flex-1"
                                    disabled={isSending}
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={
                                        !messageContent.trim() || isSending
                                    }
                                    className="px-6"
                                >
                                    {isSending ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            Gửi
                                        </>
                                    )}
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Nhấn Enter để gửi tin nhắn, Shift + Enter để
                                xuống dòng
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Chọn một cuộc trò chuyện
                            </h3>
                            <p className="text-gray-600">
                                Chọn một phòng chat từ danh sách bên trái để bắt
                                đầu trả lời tư vấn
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
