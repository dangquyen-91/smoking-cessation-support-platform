"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Send,
    MessageCircle,
    Users,
    Clock,
    Search,
    MoreVertical,
    Phone,
    Video,
} from "lucide-react";
import {
    useGetChatRoomByCreatedUser,
    useGetChatRoomById,
    useSendMessageToChatRoom,
} from "@/queries/chatroom.query";
import utils from "@/utils/utils";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function ChatRoomMessagePage() {
    const { id } = useParams();
    const router = useRouter();
    const userId = utils.getUserId();
    const [messageInput, setMessageInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const messagesEndRef = useRef(null);
    const limitRemaining = utils.getLimitRemaining();

    const { data: chatRoomInfo, refetch: refetchChatRoom } =
        useGetChatRoomById(id);
    const { data: listChatRoom } = useGetChatRoomByCreatedUser();
    const { mutateAsync: sendMessageToChatRoom, isPending: isSending } =
        useSendMessageToChatRoom();

    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatRoomInfo?.messages]);

    // Handle sending message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim() || isSending) return;

        if (limitRemaining <= 0) {
            alert("Bạn đã đạt giới hạn số lượng tin nhắn.");
            return;
        }

        try {
            const payload = {
                content: messageInput.trim(),
                user: chatRoomInfo?.createdById === userId,
            };

            await sendMessageToChatRoom({
                chatRoomId: id,
                messageData: payload,
            });
            utils.setLimitRemaining(limitRemaining - 1);

            setMessageInput("");
            await refetchChatRoom();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Format timestamp
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Navigate to different chat room
    const handleSelectChatRoom = (chatRoomId) => {
        router.push(`/dashboard/chat-room/${chatRoomId}`);
    };

    // Filter chat rooms based on search
    const filteredChatRooms = listChatRoom?.filter(
        (room) =>
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!chatRoomInfo) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">
                        Đang tải cuộc trò chuyện...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] max-w-full bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
            {/* Sidebar - Chat Room List */}
            <div className=" bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col shadow-lg flex-shrink-0">
                {/* Sidebar Header */}
                <div className=" border-b border-gray-200/50 bg-white/50">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-blue-600" />
                            Tin nhắn
                        </h2>
                        <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 text-xs"
                        >
                            {listChatRoom?.length || 0}
                        </Badge>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Tìm kiếm cuộc trò chuyện..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-gray-50/50 border-gray-200/50 focus:bg-white transition-colors"
                        />
                    </div>
                </div>

                {/* Chat Room List */}
                <ScrollArea className="flex-1">
                    <div className="p-2">
                        {filteredChatRooms?.map((room) => (
                            <Card
                                key={room.id}
                                onClick={() => handleSelectChatRoom(room.id)}
                                className={`p-3 mb-2 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
                                    room.id === Number.parseInt(id)
                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-[1.01]"
                                        : "bg-white/70 hover:bg-white/90 text-gray-700"
                                }`}
                            >
                                <div className="flex items-start gap-2">
                                    <Avatar className="w-10 h-10 flex-shrink-0">
                                        <AvatarFallback
                                            className={`${
                                                room.id === Number.parseInt(id)
                                                    ? "bg-white/20 text-white"
                                                    : "bg-blue-100 text-blue-600"
                                            } font-semibold text-sm`}
                                        >
                                            {room.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-medium truncate text-sm">
                                                {room.name}
                                            </h3>
                                            {room.messages?.length > 0 && (
                                                <span
                                                    className={`text-xs ${
                                                        room.id ===
                                                        Number.parseInt(id)
                                                            ? "text-white/70"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    {formatTime(
                                                        room.messages[
                                                            room.messages
                                                                .length - 1
                                                        ]?.createdAt
                                                    )}
                                                </span>
                                            )}
                                        </div>

                                        <p
                                            className={`text-xs mb-1 line-clamp-1 ${
                                                room.id === Number.parseInt(id)
                                                    ? "text-white/80"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {room.description}
                                        </p>

                                        {room.messages?.length > 0 && (
                                            <p
                                                className={`text-xs truncate ${
                                                    room.id ===
                                                    Number.parseInt(id)
                                                        ? "text-white/70"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {
                                                    room.messages[
                                                        room.messages.length - 1
                                                    ]?.content
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white/30 backdrop-blur-sm">
                {/* Chat Header */}
                <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                                    {chatRoomInfo.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">
                                    {chatRoomInfo.name}
                                </h1>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {chatRoomInfo.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-blue-600"
                            >
                                <Phone className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-blue-600"
                            >
                                <Video className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-blue-600"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4 min-h-0">
                    {chatRoomInfo.messages?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6">
                                <MessageCircle className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Bắt đầu cuộc trò chuyện
                            </h3>
                            <p className="text-gray-500 max-w-md">
                                Chưa có tin nhắn nào trong phòng chat này. Hãy
                                gửi tin nhắn đầu tiên để bắt đầu cuộc trò
                                chuyện!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {chatRoomInfo.messages?.map((message, index) => {
                                const isCurrentUser = message.user;
                                const showAvatar =
                                    index === 0 ||
                                    chatRoomInfo.messages[index - 1]?.user !==
                                        message.user;

                                return (
                                    <div
                                        key={message.id}
                                        className={`flex items-end gap-2 ${
                                            isCurrentUser
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        {!isCurrentUser && (
                                            <Avatar
                                                className={`w-8 h-8 ${
                                                    showAvatar
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                }`}
                                            >
                                                <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                                                    AI
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div
                                            className={`max-w-xs lg:max-w-md ${
                                                isCurrentUser ? "order-1" : ""
                                            }`}
                                        >
                                            <div
                                                className={`px-4 py-3 rounded-2xl shadow-sm ${
                                                    isCurrentUser
                                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                                                        : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
                                                }`}
                                            >
                                                <p className="text-sm leading-relaxed">
                                                    {message.content}
                                                </p>
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 mt-1 px-2 ${
                                                    isCurrentUser
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <Clock className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                    {formatTime(
                                                        message.createdAt
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {isCurrentUser && (
                                            <Avatar
                                                className={`w-8 h-8 ${
                                                    showAvatar
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                }`}
                                            >
                                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                                    Bạn
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </ScrollArea>

                {/* Message Input */}
                <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-4">
                    <form
                        onSubmit={handleSendMessage}
                        className="flex items-end gap-2"
                    >
                        <div className="flex-1 relative">
                            <Input
                                type="text"
                                value={messageInput}
                                onChange={(e) =>
                                    setMessageInput(e.target.value)
                                }
                                placeholder="Nhập tin nhắn của bạn..."
                                className="pr-4 py-2 bg-gray-50/50 border-gray-200/50 focus:bg-white transition-colors rounded-lg resize-none"
                                disabled={isSending}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={!messageInput.trim() || isSending}
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? (
                                <div className="flex items-center gap-1">
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                    <span className="text-sm">Gửi</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <Send className="w-3 h-3" />
                                    <span className="text-sm">Gửi</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    <p className="text-xs text-gray-500 mt-1 text-center">
                        <p className="text-xs text-blue-500 mt-1 text-center">
                               {" "}
                            {limitRemaining > 0
                                ? `Bạn còn ${limitRemaining} tin nhắn.`
                                : "Bạn đã hết lượt gửi tin nhắn."}
                        </p>
                    </p>
                </div>
            </div>
        </div>
    );
}
