import { useState } from "react";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { createUrqlClient } from "../utils/createUrqlClient";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";

import Layout from "../components/Layout";
import UpdootSection from "../components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((post) => (
            <Flex
              key={post.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              columnGap="20px"
            >
              <UpdootSection post={post} />
              <Box>
                <Link href="/post/[id]" as={`/post/${post.id}`}>
                  <ChakraLink>
                    <Heading fontSize="xl">{post.title}</Heading>
                  </ChakraLink>
                </Link>
                <Text>posted by {post.creator.username}</Text>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
              <Flex flex={1} justifyContent="end">
                <DeleteIcon
                  h="16px"
                  w="16px"
                  color="red.500"
                  _hover={{ cursor: "pointer" }}
                  onClick={async () => {
                    await deletePost({ id: post.id });
                  }}
                />
              </Flex>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex justifyContent="center">
          <Button
            isLoading={fetching}
            my={8}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  neverSuspend: true,
})(Index);
