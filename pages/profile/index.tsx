import Head from "next/head";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ScrollToTopButton from "~/components/Navigation/ScrollToTopButton";

import ProfileList from "~/components/Lists/ProfileList";

const ProfilePage = () => {
  const theme = useTheme();
  const isBiggerThanTablet = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Head>
        <title>Profile | Shop-it!</title>
        <meta name="description" content="Handle your profile " />
        {/* Open Graph */}
        <meta property="og:title" content="Profile | Shop-it!" />
        <meta property="og:description" content="Handle your profile " />
      </Head>
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: 1500,
          padding: 2.5,
          marginTop: isBiggerThanTablet ? 6 : 0,
          marginX: "auto",
          backgroundColor: "neutral.light",
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{ marginBottom: 4, fontSize: 24, fontWeight: "bold" }}
        >
          My account
        </Typography>
        <ProfileList />
      </Box>

      <ScrollToTopButton />
    </>
  );
};

export default ProfilePage;
