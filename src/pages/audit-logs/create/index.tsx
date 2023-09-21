import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createAuditLog } from 'apiSdk/audit-logs';
import { auditLogValidationSchema } from 'validationSchema/audit-logs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { AuditLogInterface } from 'interfaces/audit-log';

function AuditLogCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AuditLogInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAuditLog(values);
      resetForm();
      router.push('/audit-logs');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AuditLogInterface>({
    initialValues: {
      action: '',
      timestamp: new Date(new Date().toDateString()),
      description: '',
      ip_address: '',
      device_info: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: auditLogValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Audit Logs',
              link: '/audit-logs',
            },
            {
              label: 'Create Audit Log',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Audit Log
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.action}
            label={'Action'}
            props={{
              name: 'action',
              placeholder: 'Action',
              value: formik.values?.action,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="timestamp" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Timestamp
            </FormLabel>
            <DatePicker
              selected={formik.values?.timestamp ? new Date(formik.values?.timestamp) : null}
              onChange={(value: Date) => formik.setFieldValue('timestamp', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.ip_address}
            label={'Ip Address'}
            props={{
              name: 'ip_address',
              placeholder: 'Ip Address',
              value: formik.values?.ip_address,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.device_info}
            label={'Device Info'}
            props={{
              name: 'device_info',
              placeholder: 'Device Info',
              value: formik.values?.device_info,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/audit-logs')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'audit_log',
    operation: AccessOperationEnum.CREATE,
  }),
)(AuditLogCreatePage);
