import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import FamilyForm from "../Form/FamilyForm";
import style from "../../Assets/Styles/Form/FormStyle";
import { useLoaderData, useNavigate } from "react-router-dom";

const FamilyModalForm = ({ isOpen }) => {
	const [open, setOpen] = useState(isOpen);

	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
		navigate("/familias");
	};

	const family = useLoaderData() || null;

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style.boxForm}>
						<FamilyForm
							closeModal={handleClose}
							family={family}
						/>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default FamilyModalForm;
