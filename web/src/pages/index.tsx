import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

import Layout from "../components/Layout";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <Layout>
      <Link href="/create-post">
        <ChakraLink>create post</ChakraLink>
      </Link>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  neverSuspend: true,
})(Index);
