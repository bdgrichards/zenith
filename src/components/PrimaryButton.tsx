import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PrimaryButton({
  children,
  disabled,
  onClick,
  className,
}: Props) {
  const style =
    "text-sm text-white py-2 px-4 rounded-md font-semibold bg-gradient-to-br from-pink-500 to-yellow-500 shadow-none hover:shadow-md hover:disabled:shadow-none saturate-100 disabled:saturate-0 transition ease-in-out duration-200 cursor-pointer disabled:cursor-default";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(style, className)}
    >
      {children}
    </button>
  );
}
