const IconSidebarArrow = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 14 24"
      fill="none"
      width="10"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 22L2 12L12 2"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSidebarArrow;
