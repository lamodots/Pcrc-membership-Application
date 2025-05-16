interface ConfirmationModalProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  action?: string;
}

function ConfirmationModal({
  onCancel,
  onConfirm,
  action,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 px-4 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xs p-6">
        <h3 className="text-center">
          <span className=" font-bold">{action}</span> Do you want to continue?
        </h3>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
