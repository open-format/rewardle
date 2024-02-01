import tw from "tailwind-styled-components";

export const IconButton = tw.button`text-white hover:opacity-80`;

export function Button({ children, isLoading, ...props }) {
  function Loading() {
    return (
      <div
        className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <button
      disabled={isLoading || props.disabled}
      {...props}
      className="rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
}
