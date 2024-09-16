import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon

interface CommonDialogProps {
  isOpen: boolean;
  toggleDialog: (open: boolean) => void;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode; // Optional actions (e.g., buttons)
}

const CommonDialog: React.FC<CommonDialogProps> = ({
  isOpen,
  toggleDialog,
  title,
  content,
  actions,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is mobile

  return (
    <Dialog
      open={isOpen}
      onClose={() => toggleDialog(false)}
      fullWidth
      maxWidth={isMobile ? "xs" : "sm"} // Adjust width based on screen size
    >
      <DialogTitle>
        {title}
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => toggleDialog(false)}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            mr: "10px",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default CommonDialog;
