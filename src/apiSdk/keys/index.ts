import axios from 'axios';
import queryString from 'query-string';
import { KeyInterface, KeyGetQueryInterface } from 'interfaces/key';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getKeys = async (query?: KeyGetQueryInterface): Promise<PaginatedInterface<KeyInterface>> => {
  const response = await axios.get('/api/keys', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createKey = async (key: KeyInterface) => {
  const response = await axios.post('/api/keys', key);
  return response.data;
};

export const updateKeyById = async (id: string, key: KeyInterface) => {
  const response = await axios.put(`/api/keys/${id}`, key);
  return response.data;
};

export const getKeyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/keys/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteKeyById = async (id: string) => {
  const response = await axios.delete(`/api/keys/${id}`);
  return response.data;
};
