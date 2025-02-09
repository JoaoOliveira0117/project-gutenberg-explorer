import { Avatar, Chip, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent } from "react";

interface UserPillProps {
  email: string;
  onLogout: () => void; // Callback para logout
}

export default function UserPill({ email, onLogout }: UserPillProps) {
  const nickname = email.split("@")[0]; // Pega tudo antes do "@"
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Chip
        avatar={<Avatar>{nickname.charAt(0).toUpperCase()}</Avatar>}
        label={nickname}
        variant="outlined"
        color="primary"
        onClick={handleClick}
        sx={{
          fontSize: "14px",
          padding: "4px",
          cursor: "pointer",
        }}
      />

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
