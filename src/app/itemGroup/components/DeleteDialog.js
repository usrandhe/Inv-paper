// DeleteDialog.js
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Typography, Button } from "@mui/material";
const DeleteDialog = ({
  open,
  handleClose,
  handleDelete,
  deleteIndex,
  entries,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this entry? This action cannot be
          undone.
        </DialogContentText>
        <Typography variant="body2" color="textSecondary">
          You are about to delete the following entry:
          <br />
          {entries[deleteIndex]?.shortName} ({entries[deleteIndex]?.fullName})
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
