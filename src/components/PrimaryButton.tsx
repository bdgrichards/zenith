import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PrimaryButton({
  children,
  disabled,
  loading,
  onClick,
  className,
}: Props) {
  const style =
    "text-sm text-white py-2 px-4 rounded-md font-semibold bg-gradient-to-br from-pink-500 to-yellow-500 shadow-none hover:shadow-md hover:disabled:shadow-none saturate-100 disabled:saturate-0 transition ease-in-out duration-200 cursor-pointer disabled:cursor-default flex items-center";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(style, className)}
    >
      {children}
      {loading && (
        <svg
          className="animate-spin ml-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="white"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  );
}
