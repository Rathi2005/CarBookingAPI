import { X, AlertTriangle } from "lucide-react";

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
      "
    >
      {/* Modal */}

      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-600
              "
            >
              <AlertTriangle size={22} />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-extrabold
                  text-slate-900
                "
              >
                {title}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Please confirm this action.
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="
              rounded-lg
              p-2
              text-slate-400
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}

        <p
          className="
            mt-5
            text-sm
            leading-6
            text-slate-600
          "
        >
          {message}
        </p>

        {/* Actions */}

        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >
          <button
            onClick={onCancel}
            disabled={loading}
            className="
    rounded-xl
    border
    border-slate-200
    bg-white
    px-5
    py-2.5
    text-sm
    font-bold
    text-slate-600
    hover:bg-slate-50
    disabled:opacity-50
  "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
    rounded-xl
    bg-red-600
    px-5
    py-2.5
    text-sm
    font-bold
    text-white
    hover:bg-red-700
    disabled:opacity-70
    flex
    items-center
    justify-center
    gap-2
  "
          >
            {loading && (
              <span
                className="
        h-4
        w-4
        animate-spin
        rounded-full
        border-2
        border-white
        border-t-transparent
      "
              />
            )}

            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
