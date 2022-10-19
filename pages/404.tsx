import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const Custom404 = () => {
  return (
    <Box
      component="section"
      sx={{
        width: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        fontWeight: 500,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: 50, fontWeight: 700 }}>
        Error 404
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: 24 }}>Oops !</Typography>
        <Typography sx={{ fontSize: 18 }}>Something went wrong</Typography>
      </Box>
    </Box>
  );
};

export default Custom404;
