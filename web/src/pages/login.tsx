import React from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import { Form, Formik } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            await router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="Username"
              name="username"
              placeholder="username"
            />
            <Box mt={4}>
              <InputField
                label="Password"
                name="password"
                placeholder="password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
