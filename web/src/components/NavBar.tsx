import React from "react";
import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface INavBarProps {}

const NavBar: React.FC<INavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    body = null;

    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Link href="/login">
          <ChakraLink color="white" mr={2} fontSize="1.2rem">
            login
          </ChakraLink>
        </Link>
        <Link href="/register">
          <ChakraLink color="white" fontSize="1.2rem">register</ChakraLink>
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
        <Button
          variant="link"
          lineHeight={1.5}
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      bg="tomato"
      minH="61px"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Box ml="auto" mr={4}>{body}</Box>
    </Flex>
  );
};

export default NavBar;
