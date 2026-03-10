const OrderInfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    role="img"
    aria-label="Order information icon"
  >
    {/* Clipboard / документ суурь */}
    <path d="M384 64h-32a64 64 0 0 0-128 0h-32a48 48 0 0 0-48 48v288a32 32 0 0 0 32 32h320a32 32 0 0 0 32-32V112a48 48 0 0 0-48-48zM256 96a16 16 0 1 1 0-32 16 16 0 0 1 0 32z" />

    {/* Захиалгын мөрүүд — текст мэт гурван мөр */}
    <rect x="128" y="184" width="208" height="20" rx="6" />
    <rect x="128" y="224" width="176" height="20" rx="6" />
    <rect x="128" y="264" width="112" height="20" rx="6" />

    {/* Багц/товч тэмдэг — захиалгын жижиг карт буюу package */}
    <rect x="360" y="200" width="88" height="64" rx="8" />
    <path d="M360 232h88" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M404 200v-12" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Тэмдэглэлийн чек/статус — жижиг дугуй дотор тик */}
    <circle cx="404" cy="248" r="10" fill="white" />
    <path d="M398 247l4 6 8-10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

  </svg>
);

export default OrderInfoIcon;
