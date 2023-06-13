import { Button } from "@mui/material";

const DialogButton = ({ onClick, children }) => {
	return (
		<Button
			onClick={onClick}
			disableRipple
			variant="outlined"
			sx={{
				color: "white",
				borderColor: "transparent",
				borderRadius: "100px",
				"&:hover": {
					borderColor: "transparent",
					backgroundColor: "rgb(59, 59, 64)",
				},
			}}
		>
			{children}
		</Button>
	);
};

export default DialogButton;
