import React from "react";
import { Box } from "@chakra-ui/react";

export type TWrapperVariant = "small" | "regular";

interface IWrapperProps {
  variant?: TWrapperVariant;
}

const Wrapper: React.FC<IWrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
