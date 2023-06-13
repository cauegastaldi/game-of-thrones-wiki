const style = {
	boxForm: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		maxWidth: 400,
		minHeight: 300,
		bgcolor: "white",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
		display: "flex",
		justifyContent: "center",
	},
	form: {
		"& .MuiTextField-root": { marginLeft: 0, marginBottom: 1, width: "35ch" },
		display: "flex",
		flexDirection: "column",
	},
};

export default style;
