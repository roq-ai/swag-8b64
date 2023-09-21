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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getSessionById, updateSessionById } from 'apiSdk/sessions';
import { sessionValidationSchema } from 'validationSchema/sessions';
import { SessionInterface } from 'interfaces/session';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function SessionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<SessionInterface>(
    () => (id ? `/sessions/${id}` : null),
    () => getSessionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SessionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSessionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/sessions');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<SessionInterface>({
    initialValues: data,
    validationSchema: sessionValidationSchema,
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
              label: 'Sessions',
              link: '/sessions',
            },
            {
              label: 'Update Session',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Session
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="login_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Login Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.login_time ? new Date(formik.values?.login_time) : null}
              onChange={(value: Date) => formik.setFieldValue('login_time', value)}
            />
          </FormControl>
          <FormControl id="logout_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Logout Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.logout_time ? new Date(formik.values?.logout_time) : null}
              onChange={(value: Date) => formik.setFieldValue('logout_time', value)}
            />
          </FormControl>

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

          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
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
              onClick={() => router.push('/sessions')}
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
    entity: 'session',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SessionEditPage);
