import * as yup from 'yup';

export const sessionValidationSchema = yup.object().shape({
  login_time: yup.date().required(),
  logout_time: yup.date().nullable(),
  ip_address: yup.string().nullable(),
  device_info: yup.string().nullable(),
  location: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
