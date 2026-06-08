import { memo, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { ConversationListItemDto } from "../../types";
import { cn } from "../../lib/utils";
import { useTypingUsers } from "../../store/conversation.selectors";
import { useIsOnline } from "../../store/presence.selectors";
import { useConversationStore } from "../../store/conversation.store";
import { useMessageStore } from "../../store/message.store";
import { conversationService } from "../../services/conversation.service";
import { Pin, BellOff, Trash2 } from "../ui/icons";

interface ConversationItemProps {
  conversation: ConversationListItemDto;
  isActive: boolean;
}

function formatConversationTime(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  const diffMs = Math.max(0, Date.now() - date.getTime());
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function getPreview(conversation: ConversationListItemDto): string {
  const msg = conversation.lastMessage;
  if (!msg) return "No messages yet";
  switch (msg.type) {
    case "image": return "Photo";
    case "audio": return "Voice message";
    case "video": return "Video";
    case "file":  return msg.fileName ?? "File";
    default:      return msg.content?.trim() || "Empty message";
  }
}

function ConversationItemComponent({ conversation, isActive }: ConversationItemProps) {
  const navigate   = useNavigate();
  const typingUsers = useTypingUsers(conversation.id);
  const liveOnline  = useIsOnline(conversation.peer?.id ?? "");
  const isOnline    = conversation.type === "direct" && liveOnline;

  const displayName = conversation.name ?? "Unknown conversation";
  const initials    = displayName.split(" ").slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join("");
  const previewText = useMemo(
    () => typingUsers.size > 0 ? "Typing..." : getPreview(conversation),
    [conversation, typingUsers],
  );

  const [confirming, setConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Long-press (mobile) ────────────────────────────────────────────────
  const lpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Prevent scroll interfering with long-press detection
    const startY = e.touches[0].clientY;
    lpTimer.current = setTimeout(() => { lpTimer.current = null; setConfirming(true); }, 500);
    // Cancel if the finger moves more than 10px (scroll intent)
    const onMove = (ev: TouchEvent) => {
      if (Math.abs(ev.touches[0].clientY - startY) > 10) cancelLP();
    };
    window.addEventListener("touchmove", onMove, { once: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const cancelLP = useCallback(() => {
    if (lpTimer.current) { clearTimeout(lpTimer.current); lpTimer.current = null; }
  }, []);

  // ── Delete (optimistic) ────────────────────────────────────────────────
  const handleDelete = useCallback(async () => {
    setConfirming(false);
    setIsDeleting(true);
    const snap = useConversationStore.getState().byId[conversation.id];
    useConversationStore.getState().removeConversation(conversation.id);
    useMessageStore.getState().clearConversationMessages(conversation.id);
    if (isActive) navigate("/chat");
    try {
      await conversationService.deleteConversation(conversation.id);
    } catch {
      if (snap) useConversationStore.getState().upsertConversation(snap);
    } finally {
      setIsDeleting(false);
    }
  }, [conversation.id, isActive, navigate]);

  const avatarSrc = conversation.type === "direct" ? conversation.peer?.avatar : conversation.groupAvatar;

  return (
    <div
      className={cn(
        "group relative flex w-full items-center gap-4 border-b border-[#1d2635] px-4 py-4 transition-colors md:px-6",
        isActive ? "bg-white/5" : "hover:bg-white/[0.03]",
        isDeleting && "pointer-events-none opacity-40",
      )}
      onContextMenu={(e) => { e.preventDefault(); setConfirming(true); }}
      onTouchStart={handleTouchStart}
      onTouchMove={cancelLP}
      onTouchEnd={cancelLP}
      onTouchCancel={cancelLP}
    >
      {/* ── Inline confirm overlay ─────────────────────────────────────── */}
      {confirming && (
        <div className="absolute inset-0 z-10 flex items-center justify-between gap-3 rounded-sm bg-[#0d1117]/90 px-4 backdrop-blur-sm">
          <p className="truncate text-sm text-white">Delete <span className="font-semibold">{displayName}</span>?</p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => void handleDelete()}
              className="rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700">
              Delete
            </button>
            <button type="button" onClick={() => setConfirming(false)}
              className="rounded-xl bg-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/20">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Nav button ──────────────────────────────────────────────────── */}
      <button type="button" className="flex min-w-0 flex-1 items-center gap-4 text-left"
        onClick={() => navigate(`/chat/${conversation.id}`)}>

        <div className="relative shrink-0">
          {avatarSrc ? (
            <img src={avatarSrc} alt={displayName} referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-full border border-white/10 object-cover" />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2a2247] text-lg font-semibold text-[#8b5cf6]">
              {initials}
            </div>
          )}
          {isOnline && <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-[#151b2b] bg-[#10b981]" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-xl font-semibold text-white">{displayName}</p>
            <div className="flex shrink-0 items-center gap-1.5">
              {conversation.isMuted  && <BellOff className="h-3.5 w-3.5 text-slate-500" />}
              {conversation.isPinned && <Pin     className="h-3.5 w-3.5 text-[#8b5cf6]" />}
              <span className="text-sm text-slate-500">
                {formatConversationTime(conversation.lastMessage?.createdAt ?? conversation.updatedAt)}
              </span>
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <p className={cn("truncate text-sm", typingUsers.size > 0 ? "text-[#a78bfa]" : "text-slate-400")}>
              {previewText}
            </p>
            {conversation.unread.unreadCount > 0 && (
              <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#8b5cf6] px-1.5 text-xs font-semibold text-white">
                {conversation.unread.unreadCount}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* ── Desktop: hover trash ─────────────────────────────────────────── */}
      <button type="button" aria-label="Delete conversation"
        onClick={(e) => { e.stopPropagation(); setConfirming(true); }}
        className="ml-1 hidden shrink-0 rounded-xl p-1.5 text-slate-600 opacity-0 transition-all hover:text-rose-400 group-hover:opacity-100 md:flex">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export const ConversationItem = memo(ConversationItemComponent);
