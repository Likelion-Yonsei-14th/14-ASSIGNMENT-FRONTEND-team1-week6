import CrownIcon from "../../assets/Crown.png";
import ProfileIcon from "../../assets/Ellipse 50.svg";

type MessageBubbleProps = {
  type: "me" | "other" | "admin";
  message: string;
  profileType?: "host" | "admin" | "user";
  showAvatar?: boolean;
};

export default function MessageBubble({
  type,
  message,
  profileType,
  showAvatar = true,
}: MessageBubbleProps) {
  const isMe = type === "me";
  const isAdmin = type === "admin";
  const isHost = profileType === "host";

  const Avatar = (
    <div className="relative h-[43px] w-[43px] shrink-0">
      <img
        src={ProfileIcon}
        alt="프로필"
        className="h-[43px] w-[43px]"
      />

      {isAdmin && (
        <span className="absolute inset-0 flex items-center justify-center text-[13px] text-black">
          관리자
        </span>
      )}

      {isHost && (
        <img
          src={CrownIcon}
          alt="방장"
          className="absolute -left-[10px] -top-[16px] z-10 h-[32px] w-[32px]"
        />
      )}
    </div>
  );

  return (
    <div
      className={`flex items-start gap-[10px] ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe &&
  (showAvatar ? Avatar : <div className="w-[43px] shrink-0" />)}

      <div
        className={`
          max-w-[260px]
          rounded-[20px]
          px-[18px]
          py-[10px]
          text-[14px]
          leading-normal
          text-black
          ${isMe || isAdmin ? "bg-[#64DDBA]" : "bg-[#E0E0E0]"}
        `}
      >
        {message}
      </div>

{isMe &&
  (showAvatar ? Avatar : <div className="w-[43px] shrink-0" />)}
    </div>
  );
}