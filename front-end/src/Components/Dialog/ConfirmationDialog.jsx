import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogButton from "../Button/DialogButton";

const ConfirmationDialog = ({ children, acceptAction, isOpen, setOpen }) => {
	const handleClose = () => {
		setOpen(false);
	};

	const handleAcception = () => {
		handleClose();
		acceptAction();
	};

	return (
		<div>
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				PaperProps={{
					style: {
						backgroundColor: "#343438",
					},
				}}
			>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						sx={{ color: "white" }}
					>
						{children}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<DialogButton onClick={handleClose}>Não</DialogButton>
					<DialogButton onClick={handleAcception}>Sim</DialogButton>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ConfirmationDialog;
