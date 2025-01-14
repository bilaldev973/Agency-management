"use client";

import { useState } from "react";

// Define the Toast type
type ToasterToast = {
  id?: string;  // Make id optional
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  // Add a toast with auto-generated id
  const toast = (newToast: Omit<ToasterToast, "id">) => {
    const id = new Date().toISOString(); // Generate a unique id
    setToasts((prevToasts) => [...prevToasts, { ...newToast, id }]);
  };

  // Dismiss a toast by its ID
  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return {
    toasts,  // Returns the list of toasts
    toast,   // Function to add a toast
    dismiss, // Function to dismiss a toast by its ID
  };
}
