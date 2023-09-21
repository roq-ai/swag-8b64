import axios from 'axios';
import queryString from 'query-string';
import { SessionInterface, SessionGetQueryInterface } from 'interfaces/session';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSessions = async (query?: SessionGetQueryInterface): Promise<PaginatedInterface<SessionInterface>> => {
  const response = await axios.get('/api/sessions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSession = async (session: SessionInterface) => {
  const response = await axios.post('/api/sessions', session);
  return response.data;
};

export const updateSessionById = async (id: string, session: SessionInterface) => {
  const response = await axios.put(`/api/sessions/${id}`, session);
  return response.data;
};

export const getSessionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sessions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSessionById = async (id: string) => {
  const response = await axios.delete(`/api/sessions/${id}`);
  return response.data;
};
