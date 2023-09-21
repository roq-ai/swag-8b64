import * as yup from 'yup';

export const accountValidationSchema = yup.object().shape({
  account_name: yup.string().required(),
  status: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
