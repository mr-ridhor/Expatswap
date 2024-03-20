import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: ReactNode;
  header?: string;
  maxWidth?: string;
  className?: string;
}
const Card: React.FC<CardProps> = ({
  header = "",
  maxWidth = "w-full",
  className = "",
  children,
}) => {
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    "6xl": "sm:max-w-6xl",
    "w-full": "sm:max-w-full",
  }[maxWidth];
  return (
    <div
      className={twMerge(
        `w-full bg-white dark:bg-primary dark:text-white rounded-sm my-2 flex flex-col ${maxWidthClass} ${className}`
      )}
    >
      {header && (
        <div className="w-full bg-gray-100 dark:bg-slate-700 border dark:border-slate-800 py-1 px-2">
          <p className="text-lg font-semibold">{header}</p>
        </div>
      )}
      <div className="w-full h-full my-2 p-2 flex flex-col space-y-3 overflow-y-auto no-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Card;