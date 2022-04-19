import { Box, Button, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { withUrqlClient } from "next-urql";
import { useState } from "react";

import { toErrorMap } from "../../utils/toErrorMap";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";

import Wrapper from "../../components/Wrapper";
import InputField from "../../components/InputField";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked
            await router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            {tokenError && (
              <Flex alignItems="center">
                <Box color="red" mt={1} mr={2}>
                  {tokenError}
                </Box>
                <Link href="/forgot-password">
                  <ChakraLink mt={1}>click here to get a new one</ChakraLink>
                </Link>
              </Flex>
            )}
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
