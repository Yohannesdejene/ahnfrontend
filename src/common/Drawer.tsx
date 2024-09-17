import React from "react";
import {
  Drawer,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 

interface LeftDrawerProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => void;
  content: React.ReactNode;
  direction: "left" | "right" | "top" | "bottom";
  width: number;
}

const CommonDrawer: React.FC<LeftDrawerProps> = ({
  isOpen,
  toggleDrawer,
  content,
  direction,
  width,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is mobile

  return (
    <Drawer
      anchor={direction}
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : width ? width : 250,
          mihHeight: "100vh", // Full width for mobile, specified width for larger screens
        },
      }}
    >
      <Box
        role="presentation"
        className="w-full  bg-white px-2 dark:bg-boxdark"
        sx={{ minHeight: "100vh" }}
      >
        {/* Close Button */}
        <Box className="flex justify-end p-2">
          <IconButton
            onClick={() => toggleDrawer(false)}
            aria-label="close"
            style={{
              backgroundColor: "#000000",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>

        {/* Drawer Content */}
        <Box className="mt-0 w-full px-2">{content}</Box>
      </Box>
    </Drawer>
  );
};

export default CommonDrawer;
