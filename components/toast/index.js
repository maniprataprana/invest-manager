import { toast } from "react-toastify";

import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  SupportIcon,
} from "@heroicons/react/outline";

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return (
        <CheckCircleIcon
          className="flex-shrink-0 mr-1.5 h-5 w-5"
          aria-hidden="true"
        />
      );
    case "info":
      return (
        <InformationCircleIcon
          className="flex-shrink-0 mr-1.5 h-5 w-5"
          aria-hidden="true"
        />
      );
    case "error":
      return (
        <ExclamationCircleIcon
          className="flex-shrink-0 mr-1.5 h-5 w-5"
          aria-hidden="true"
        />
      );
    case "warning":
      return (
        <ExclamationIcon
          className="flex-shrink-0 mr-1.5 h-5 w-5"
          aria-hidden="true"
        />
      );
    default:
      return (
        <SupportIcon
          className="flex-shrink-0 mr-1.5 h-5 w-5"
          aria-hidden="true"
        />
      );
  }
};

const ToastMessage = ({ type, message }) =>
  toast[type](
    <div style={{ display: "flex", color: "white" }}>
      <div
        style={{
          fontSize: 15,
          paddingTop: 8,
          flexShrink: 0,
          textAlign: "center",
          width: "30px",
        }}
      >
        {displayIcon(type)}
      </div>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>
  );

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
