import React from "react";
import {Flex, Button, Stack, Box} from "@chakra-ui/core";

import {Tenant} from "../types";
import SettingsForm from "../forms/SettingsForm";
import {useTenant, useTenantActions} from "../hooks";

import Content from "~/ui/structure/Content";

const AdminScreen: React.FC = () => {
  const tenant = useTenant();
  const {update} = useTenantActions();

  function handleUpdate(tenant: Tenant) {
    return update(tenant);
  }

  return (
    <Content padding={4}>
      <Box width="100%">
        <SettingsForm defaultValues={tenant} onSubmit={handleUpdate}>
          {({form, isLoading, submit}) => (
            <Flex maxWidth="480px">
              <Stack spacing={4} width="100%">
                {form}
                <Button
                  alignSelf="flex-end"
                  isLoading={isLoading}
                  mt={4}
                  type="submit"
                  variantColor="primary"
                  width={{base: "100%", sm: "auto"}}
                  onClick={submit}
                >
                  Guardar
                </Button>
              </Stack>
            </Flex>
          )}
        </SettingsForm>
      </Box>
    </Content>
  );
};

export default AdminScreen;
