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
  content: React.ReactNode;
  actions?: React.ReactNode; // Optional actions (e.g., buttons)
}

const CommonDialogFull: React.FC<CommonDialogProps> = ({
  isOpen,
  toggleDialog,
  content,
  actions,
}) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is mobile

  return (
    <div className="bg-white dark:bg-boxdark">
      <Dialog
        open={isOpen}
        onClose={() => toggleDialog(false)}
        fullWidth
        maxWidth={"md"} // Adjust width based on screen size
        style={{ zIndex: 10000 }}
        // style={{ p: "0px", m: "0px",  }}
      >
        {/* <DialogTitle>
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
        </DialogTitle> */}
        <DialogContent sx={{ m: "0px", p: "0px" }}>{content}</DialogContent>
        {actions && (
          <DialogActions sx={{ m: "0px", p: "0px" }}>{actions}</DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default CommonDialogFull;
