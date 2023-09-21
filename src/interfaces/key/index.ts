import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface KeyInterface {
  id?: string;
  key_value: string;
  user_id: string;
  expires_at?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface KeyGetQueryInterface extends GetQueryInterface {
  id?: string;
  key_value?: string;
  user_id?: string;
}
