import { Alert, AlertTitle, IconButton, AlertProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

interface GlobalAlertProps {
  open: boolean;
  severity?: AlertProps["severity"];
  message: string;
  title?: string;
  action?: ReactNode;
  onClose: () => void;
}

export const GlobalAlert = ({
  open = false,
  severity = "info",
  message = "",
  title = "",
  action = null,
  onClose,
}: GlobalAlertProps) => {
  if (!open) return null;

  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1400 }}> {/* Ajusta el z-index */}
      <Alert
        severity={severity}
        action={
          <>
            {action}
            <IconButton onClick={onClose} size="small">
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </>
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </div>
  );
};