import { IButtonProps } from "../types/components/IButton.types";

function Button({
  btnId,
  leftIcon,
  rightIcon,
  title,
  styleClasses,
}: IButtonProps) {
  return (
    <button
      id={btnId}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${styleClasses}`}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {title}
      </span>
      {rightIcon}
    </button>
  );
}

export default Button;
