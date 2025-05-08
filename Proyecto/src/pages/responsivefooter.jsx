import React from "react";
import { Box, Container, Typography } from "@mui/material";

function ResponsiveFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0D0D0D",
        color: "white",
        py: 2,
        mt: "auto",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
            fontFamily: "monospace",
          }}
        >
          Soporte Técnico
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              color: "white",
              fontFamily: "monospace",
            }}
          >
            Teléfono: +54 11 1234-5678
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              color: "white",
              fontFamily: "monospace",
            }}
          >
            Correo: soporte@nombreweb.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ResponsiveFooter;