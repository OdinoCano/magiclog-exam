import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { GlobalAlert } from "./Alert/GlobalAlert";
import { useAlert } from "./Alert/AlertContext";

interface NavbarProps {
  isAuthenticated: boolean;
  userName: string | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, userName, onLoginClick, onLogoutClick }) => {
  const { alertState, closeAlert } = useAlert();

  return (
    <AppBar position="static">
      <GlobalAlert
        open={alertState.open}
        severity={alertState.severity}
        message={alertState.message}
        title={alertState.title}
        action={alertState.action}
        onClose={closeAlert}
      />
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Marketplace
        </Typography>
        {userName && (
          <Typography>
            {userName}
          </Typography>
        )}
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={onLogoutClick}>
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={onLoginClick}>
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;