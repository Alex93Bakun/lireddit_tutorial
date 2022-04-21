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

import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

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

  console.log(data);

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout>
      <Flex alignItems="center">
        <Heading>LiReddit</Heading>
        <Link href="/create-post">
          <ChakraLink ml="auto">create post</ChakraLink>
        </Link>
      </Flex>
      <br />
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
