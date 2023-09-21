import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AuditLogInterface {
  id?: string;
  user_id: string;
  action: string;
  timestamp?: any;
  description?: string;
  ip_address?: string;
  device_info?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface AuditLogGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  action?: string;
  description?: string;
  ip_address?: string;
  device_info?: string;
}
