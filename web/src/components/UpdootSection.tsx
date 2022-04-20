import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface IUpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<IUpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  return (
    <Box>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box>
          <ChevronUpIcon
            h="24px"
            w="24px"
            color="green.500"
            _hover={{ cursor: "pointer" }}
            onClick={async () => {
              await vote({
                postId: post.id,
                value: 1,
              });
            }}
          />
        </Box>
        <Box>{post.points}</Box>
        <Box>
          <ChevronDownIcon
            h="24px"
            w="24px"
            color="red.500"
            _hover={{ cursor: "pointer" }}
            onClick={async () => {
              await vote({
                postId: post.id,
                value: -1,
              });
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default UpdootSection;
