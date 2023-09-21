import * as yup from 'yup';

export const keyValidationSchema = yup.object().shape({
  key_value: yup.string().required(),
  expires_at: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
});
