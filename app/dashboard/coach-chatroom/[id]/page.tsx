"use client";

import { useGetChatRoomByParticipant } from "@/queries/chatroom.query";

export default function CoachChat() {
    const { data: listChatRoom } = useGetChatRoomByParticipant();
    console.log("List Chat Room:", listChatRoom);
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col"></div>
        </div>
    );
}
