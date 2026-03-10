const ServiceIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <rect x="64" y="64" width="160" height="160" rx="16" />
    <rect x="288" y="64" width="160" height="160" rx="16" />
    <rect x="64" y="288" width="160" height="160" rx="16" />
    <rect x="288" y="288" width="160" height="160" rx="16" />
  </svg>
);

export default ServiceIcon;
