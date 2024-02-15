import tw from "tailwind-styled-components";

export const IconButton = tw.button`hover:text-primary`;

interface ButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  disabled: boolean;
}

export function Button({
  children,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  function Loading() {
    return (
      <div
        className="pointer-events-none inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-primary"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <button
      disabled={isLoading || disabled}
      {...props}
      className="min-w-12 rounded border px-5 py-2 font-bold uppercase text-white hover:bg-primary hover:text-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
}
