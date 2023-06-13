import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import style from "../../Assets/Styles/Form/FormStyle";
import { useLoaderData, useNavigate } from "react-router-dom";
import CharacterForm from "../Form/CharacterForm";

const CharacterModalForm = ({ isOpen }) => {
	const [open, setOpen] = useState(isOpen);

	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
		navigate("/personagens");
	};

	const character = useLoaderData() || null;

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
						<CharacterForm
							closeModal={handleClose}
							character={character}
						/>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default CharacterModalForm;
