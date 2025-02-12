"use client"
import { Box, Container, Typography } from "@mui/material";
import UserPill from "../UserPill/UserPill";

type Props = {}

const Header: React.FC<Props> = ({}) => {
  return (
    <Container maxWidth={false} sx={{ 
      maxWidth: "100%", 
        display: "flex", 
        justifyContent: 
        "center", 
        alignItems: "center",
        p: 2,
        boxShadow: "0 0 0.5rem 0.15rem rgba(0,0,0,0.1)",
      }}>
      <Box maxWidth="lg" sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" align="center">
          Betterberg
        </Typography>
        <UserPill email="joao@joao.com" onLogout={console.log}/>
      </Box>
    </Container>
  );
}

export default Header;