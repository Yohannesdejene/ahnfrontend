import React from "react";
import { Button } from "@mui/material";
import CommonDialog from "./CommonDialogBox";
import { t } from "@/utils/translation";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  toggleDialog: (open: boolean) => void;
  onDelete: (id: number | string | null) => void; // onDelete accepts optional onReload function
  elementName: string; // Name of the element to be deleted
  elementId: number | string | null; // The ID of the element to be deleted
  // onReload?: () => void; // Optional reload function
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  toggleDialog,
  onDelete,
  elementName,
  elementId,
  // onReload,
}) => {
  return (
    <CommonDialog
      isOpen={isOpen}
      toggleDialog={toggleDialog}
      title={`Delete ${elementName}?`}
      content={
        <div>
          {t("common.areYouSureYouWantToDelete")}
          <span style={{ marginRight: "3px" }}></span>
          <strong style={{ marginRight: "3px" }}>{elementName}</strong>?{" "}
          {t("common.thisActionCannotBeUndone")}
        </div>
      }
      actions={
        <>
          <Button onClick={() => toggleDialog(false)} color="primary">
            {t("common.cancel")}
          </Button>
          <Button
            onClick={() => {
              onDelete(elementId); // Pass the element's ID to the onDelete function
              // toggleDialog(false); // Close dialog after deletion
            }}
            sx={{ color: "red" }}
            // variant="contained"
          >
            {t("common.delete")}
          </Button>
        </>
      }
    />
  );
};

export default DeleteConfirmationDialog;
