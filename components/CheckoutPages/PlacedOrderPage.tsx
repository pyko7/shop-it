import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PlacedOrderPage = () => {
  const orderId = Math.floor(Math.random() * 90000) + 10000;

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: 2,
        }}
      >
        <CheckCircleIcon fontSize="large" sx={{ color: "rgba(0,0,0,0.75)" }} />
        <Typography variant="h2" fontSize={26} textAlign="center">
          Thanks for your purchase!
        </Typography>
        <Typography paragraph textAlign="center">
          Congratulations! Your order has been placed. You can track your order
          number{" "}
          <span
            style={{ textDecoration: "underline", color: "rgba(0,0,0,0.75)" }}
          >
            #{orderId}
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          position: "fixed",
          left: 0,
          bottom: 25,
          width: 1,
          paddingX: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          href="/"
          variant="contained"
          fullWidth
          sx={{ height: 55, maxWidth: 350, margin: "0 auto" }}
        >
          Continue shopping
        </Button>
      </Box>
    </>
  );
};

export default PlacedOrderPage;
