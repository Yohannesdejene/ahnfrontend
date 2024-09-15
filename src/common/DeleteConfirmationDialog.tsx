import React from "react";
import { Button } from "@mui/material";
import CommonDialog from "./CommonDialogBox";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  toggleDialog: (open: boolean) => void;
  onDelete: (id: number | string | null, onReload?: () => void) => void; // onDelete accepts optional onReload function
  elementName: string; // Name of the element to be deleted
  elementId: number | string | null; // The ID of the element to be deleted
  onReload?: () => void; // Optional reload function
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  toggleDialog,
  onDelete,
  elementName,
  elementId,
  onReload,
}) => {
  return (
    <CommonDialog
      isOpen={isOpen}
      toggleDialog={toggleDialog}
      title={`Delete ${elementName}?`}
      content={
        <div>
          Are you sure you want to delete <strong>{elementName}</strong>? This
          action cannot be undone.
        </div>
      }
      actions={
        <>
          <Button onClick={() => toggleDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete(elementId, onReload); // Pass the element's ID to the onDelete function
              toggleDialog(false); // Close dialog after deletion
            }}
            sx={{ color: "red" }}
            // variant="contained"
          >
            Delete
          </Button>
        </>
      }
    />
  );
};

export default DeleteConfirmationDialog;
