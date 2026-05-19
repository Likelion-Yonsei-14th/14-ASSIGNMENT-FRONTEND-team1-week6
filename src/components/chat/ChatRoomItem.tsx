import RideIcon from "../../assets/package_car.svg";
import JobIcon from "../../assets/Lol.svg";

type ChatRoomItemProps = {
  title: string;
  description: string;
  category: "ride" | "job";
  onClick?: () => void;
};

export default function ChatRoomItem({
  title,
  description,
  category,
  onClick,
}: ChatRoomItemProps) {
  const iconSrc = category === "ride" ? RideIcon : JobIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-start
        gap-[18px]
        px-[18px]
        py-[18px]
        text-left
      "
    >
      <img
        src={iconSrc}
        alt=""
        className="mt-[2px] h-[28px] w-[28px] shrink-0"
      />

      <div className="flex flex-col">
        <p className="text-[18px] font-semibold leading-normal text-black">
          {title}
        </p>

        <p className="mt-[4px] text-[12px] font-medium leading-normal text-black">
          {description}
        </p>
      </div>
    </button>
  );
}