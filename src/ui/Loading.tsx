import { Box, Spinner, Text } from "native-base";
import React from "react";

const Loading = () => {
  return (
    <Box
      flex={1}
      position={"absolute"}
      w={"full"}
      h={"full"}
      zIndex={50}
      justifyContent="center"
      alignItems="center"
      bg="rgba(0,0,0,0.5)" // arkaplan rengi, isteğe bağlı
    >
      <Spinner color="blue.500" size="lg" />
      <Text mt={4} color="white">
        Loading...
      </Text>
    </Box>
  );
};

export default Loading;
