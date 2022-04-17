import React from "react";
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { useMeQuery } from "../generated/graphql";

interface INavBarProps {}

const NavBar: React.FC<INavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // data is loading
  if (fetching) {
    body = null;

    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Link href="/login">
          <ChakraLink color="white" mr={2}>
            login
          </ChakraLink>
        </Link>
        <Link href="/register">
          <ChakraLink color="white">register</ChakraLink>
        </Link>
      </>
    );

    // user is logged in
  } else {
    body = (
      <Flex mr="1.5rem">
        <Box color="white" fontSize="1.2rem" flexDir="row" mr={2}>
          {data.me.username}
        </Box>
        <Button variant="link" lineHeight={1.5}>logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default NavBar;