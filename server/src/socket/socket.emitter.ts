import Conversation from "../modules/conversation/conversation.model";
import type { MessageDto } from "../modules/message/message.types";
import { isValidObjectId } from "../utils/objectId";

import { presenceStore } from "./presence.store";
import type { TypedIO } from "./socket.types";

const safeEmit = (fn: () => void, context: string) => {
  try {
    fn();
  } catch (err) {
    console.error(`[socket emit error] ${context}`, err);
  }
};

// Generic helper to fan out any event to all participants' individual sockets.
// Emits to the Socket.IO room first (for clients actively viewing the chat),
// then directly to each participant's socket IDs via the presence store
// (for clients in the background / on a different view).
// Double-delivery guard: sockets already in the room are skipped during the
// presence-store loop, so a client never receives the same event twice.
export const emitToConversation = async (
  io: TypedIO,
  conversationId: string,
  event: string,
  payload: unknown,
) => {
  if (!conversationId || !isValidObjectId(conversationId)) return;

  // 1. Emit to the room (reaches any socket that joined via join_conversation)
  safeEmit(() => {
    io.to(conversationId).emit(event as Parameters<typeof io.emit>[0], payload as never);
  }, `emitToConversation_room_${event}`);

  // 2. Direct emit to each participant's socket — skip sockets already in the
  //    room to prevent duplicate delivery.
  try {
    const conversation = await Conversation.findById(conversationId)
      .select("participants")
      .lean<{ participants: { toString(): string }[] }>();

    if (conversation?.participants) {
      // Collect sockets already reached by the room broadcast
      const roomSockets = io.sockets.adapter.rooms.get(conversationId) ?? new Set<string>();

      for (const participantId of conversation.participants) {
        const socketIds = presenceStore.getSockets(participantId.toString());
        for (const socketId of socketIds) {
          // Skip: already received the event via the room emit above
          if (roomSockets.has(socketId)) continue;
          io.to(socketId).emit(event as Parameters<typeof io.emit>[0], payload as never);
        }
      }
    }
  } catch (err) {
    console.error(`[socket emit error] emitToConversation_participants_${event}`, err);
  }
};

// Convenience wrapper for message delivery events
export const emitMessage = async (
  io: TypedIO,
  conversationId: string,
  payload: MessageDto,
) => {
  return emitToConversation(io, conversationId, "receive_message", payload);
};
