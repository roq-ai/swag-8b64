import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SessionInterface {
  id?: string;
  user_id: string;
  login_time?: any;
  logout_time?: any;
  ip_address?: string;
  device_info?: string;
  location?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SessionGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  ip_address?: string;
  device_info?: string;
  location?: string;
}
