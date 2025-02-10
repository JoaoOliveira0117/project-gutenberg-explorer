import { Box, Skeleton } from "@mui/material";
import CardContainer from "../dummies/CardContainer";

const BookCardSkeleton = () => {
  return (
    <CardContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* Placeholder da Imagem */}
        <Box sx={{ width: "25%" }}>
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Box>

        {/* Placeholder do Conteúdo */}
        <Box
          sx={{
            flexGrow: 5,
            width: "75%",
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="rectangular" width="100%" height={40} />
          
          {/* Botões de Ação */}
          <Box
            sx={{
              alignSelf: "end",
              marginTop: "auto",
              paddingTop: "1rem",
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={100} height={40} />
          </Box>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default BookCardSkeleton;
