import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  h1({ children }: { children: string }) {
    return <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>;
  },

  h2({ children }: { children: string }) {
    return <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>;
  },

  h3({ children }: { children: string }) {
    return <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>;
  },

  code({
    className,
    children,
    ...props
  }: {
    className: string;
    children: string;
  }) {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    ) : (
      <code
        className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
        {...props}
      >
        {children}
      </code>
    );
  },

  table({ children }: { children: string }) {
    return (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          {children}
        </table>
      </div>
    );
  },

  thead({ children }: { children: string }) {
    return <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>;
  },

  th({ children }: { children: string }) {
    return (
      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">
        {children}
      </th>
    );
  },

  td({ children }: { children: string }) {
    return (
      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
        {children}
      </td>
    );
  },
};
