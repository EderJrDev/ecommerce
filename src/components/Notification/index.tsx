import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg ${type === "success" ? "bg-teal-500" : "bg-red-500"
        } text-white`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
