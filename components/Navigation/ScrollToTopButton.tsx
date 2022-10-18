import { FC, useCallback } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";

const ScrollToTopButton: FC = (): JSX.Element => {
  const trigger = useScrollTrigger();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Fade in={trigger}>
      <Box
        role="presentation"
        sx={{ position: "fixed", bottom: 75, right: 16, zIndex: 2 }}
      >
        <Fab onClick={scrollToTop} size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
};

export default ScrollToTopButton;
