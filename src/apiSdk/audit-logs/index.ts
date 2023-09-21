import axios from 'axios';
import queryString from 'query-string';
import { AuditLogInterface, AuditLogGetQueryInterface } from 'interfaces/audit-log';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAuditLogs = async (
  query?: AuditLogGetQueryInterface,
): Promise<PaginatedInterface<AuditLogInterface>> => {
  const response = await axios.get('/api/audit-logs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAuditLog = async (auditLog: AuditLogInterface) => {
  const response = await axios.post('/api/audit-logs', auditLog);
  return response.data;
};

export const updateAuditLogById = async (id: string, auditLog: AuditLogInterface) => {
  const response = await axios.put(`/api/audit-logs/${id}`, auditLog);
  return response.data;
};

export const getAuditLogById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/audit-logs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAuditLogById = async (id: string) => {
  const response = await axios.delete(`/api/audit-logs/${id}`);
  return response.data;
};
