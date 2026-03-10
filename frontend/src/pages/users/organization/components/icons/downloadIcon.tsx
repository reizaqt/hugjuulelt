import React from "react";

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M376 208h-88V32H224v176h-88l120 120 120-120zM64 352v96c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-96h-32v96H96v-96H64z" />
  </svg>
);

export default DownloadIcon;