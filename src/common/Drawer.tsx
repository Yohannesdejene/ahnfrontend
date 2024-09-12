import React from "react";
import { Drawer, Box } from "@mui/material";

interface LeftDrawerProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => void;
  content: React.ReactNode;
  direction: string;
  width: number;
}

const Drawer: React.FC<LeftDrawerProps> = ({
  isOpen,
  toggleDrawer,
  content,
  direction,
  width,
}) => {
  return (
    <Drawer
      anchor={direction}
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: width ? width : 250,
        },
      }}
    >
      <Box
        role="presentation"
        sx={{ width: 250, padding: 2 }}
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        {content}
      </Box>
    </Drawer>
  );
};

export default Drawer;
