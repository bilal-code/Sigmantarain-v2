import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    toastStyle: {
      zIndex: 999999, // 🔥 ensures it's above all elements
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    toastStyle: {
      zIndex: 999999, // 🔥 ensures it's above all elements
    },
  });
};
