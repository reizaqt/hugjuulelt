import React from "react";

interface DialogProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title = "Баталгаажуулалт",
  message = "Та итгэлтэй байна уу?",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full animate-fadeIn">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <p className="text-gray-600 mb-5 text-sm">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white text-sm"
          >
            Тийм
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
          >
            Болих
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
