import React from "react";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  PostSnippetFragment,
  useDeletePostMutation,
} from "../generated/graphql";

interface IEditDeletePostButtonsProps {
  post: PostSnippetFragment;
}

const EditDeletePostButtons: React.FC<IEditDeletePostButtonsProps> = ({
  post,
}) => {
  const [, deletePost] = useDeletePostMutation();

  return (
    <Flex
      flex={1}
      flexDirection="column"
      rowGap="10px"
      justifyContent="flex-start"
      alignItems="end"
    >
      <Link href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
        <ChakraLink>
          <EditIcon h="16px" w="16px" _hover={{ cursor: "pointer" }} />
        </ChakraLink>
      </Link>
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
  );
};

export default EditDeletePostButtons;
