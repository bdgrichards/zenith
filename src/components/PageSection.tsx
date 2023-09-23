import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageSection({ children, className }: Props) {
  const style = "shadow-md w-full rounded-lg bg-white mx-auto max-w-2xl";
  return <div className={classNames(style, className)}>{children}</div>;
}
