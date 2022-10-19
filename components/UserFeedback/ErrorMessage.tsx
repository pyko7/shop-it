import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";

const ErrorMessage = () => {
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <ErrorIcon color="primary" fontSize="large"/>
      <Typography sx={{ fontSize: 16 }}>Sorry an error has occured</Typography>
    </Box>
  );
};

export default ErrorMessage;
