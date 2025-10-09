import React, { useState } from "react";
import CreateOrg from "./crud/createOrg";

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

const OrgCrudSearch: React.FC<Props> = ({ onClose, onAdded }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Шинэ байгууллага нэмэх</h2>
        <CreateOrg onAdded={onAdded} onClose={onClose} />
      </div>
    </div>
  );
};

export default OrgCrudSearch;
