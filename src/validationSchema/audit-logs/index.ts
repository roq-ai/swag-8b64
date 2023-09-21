import * as yup from 'yup';

export const auditLogValidationSchema = yup.object().shape({
  action: yup.string().required(),
  timestamp: yup.date().required(),
  description: yup.string().nullable(),
  ip_address: yup.string().nullable(),
  device_info: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
