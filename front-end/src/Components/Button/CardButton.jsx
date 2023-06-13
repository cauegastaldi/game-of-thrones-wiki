import { Button } from "@mui/material";

const CardButton = ({ mouseIsOverCard, children, color, onClickButton }) => {
	return (
		<Button
			variant="contained"
			color={color}
			disableRipple
			onClick={() => onClickButton()}
			sx={{
				opacity: mouseIsOverCard ? "1" : "0",
				transition: "0.3s",
			}}
		>
			{children}
		</Button>
	);
};

export default CardButton;
