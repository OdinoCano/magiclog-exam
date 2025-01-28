import { createContext, useState, useContext, ReactNode } from "react";

interface AlertState {
  open: boolean;
  message: string;
  severity?: "error" | "warning" | "info" | "success";
  title?: string;
  action?: ReactNode;
}

interface AlertContextType {
  showAlert: (config: Omit<AlertState, "open">) => void;
  closeAlert: () => void;
  alertState: AlertState;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: "info",
    title: "",
    action: null,
  });

  const showAlert = (config: Omit<AlertState, "open">) => {
    setAlertState({ ...config, open: true });
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert, alertState }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe usarse dentro de un AlertProvider");
  }
  return context;
};