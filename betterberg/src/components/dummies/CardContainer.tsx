import { Card } from "@mui/material";

type Props = {
  children: React.ReactNode;
}

const CardContainer: React.FC<Props> = ({ children }) => {
  return (
    <Card sx={{
      p: 1,
      boxShadow: 0,
      borderRadius: 0,
      border: "1px solid var(--gray)",
      height: "100%",
      padding: "1.5rem",
      transition: "all ease-out 0.05s",
      "&:hover": {
        transform: "scale(1.025)"
      }
    }}>
      {children}
    </Card>
  );
}

export default CardContainer;