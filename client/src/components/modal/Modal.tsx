import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

function Modal({ title, description, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 px-4  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        {description && <p className="mt-2 text-gray-600">{description}</p>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
