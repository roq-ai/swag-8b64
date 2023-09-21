import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AccountInterface {
  id?: string;
  account_name: string;
  user_id: string;
  status?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface AccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  account_name?: string;
  user_id?: string;
  status?: string;
}
