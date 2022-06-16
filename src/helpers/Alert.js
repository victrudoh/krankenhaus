import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const success = (message) => {
  toast.success(message, {
    theme: "colored",
  });
};

export const error = (message) => {
  toast.error(message, {
    theme: "colored",
  });
};

export const warning = (message) => {
  toast.warning(message, {
    theme: "colored",
  });
};

export const info = (message) => {
  toast.info(message, {
    theme: "colored",
  });
};
