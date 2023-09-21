const mapping: Record<string, string> = {
  accounts: 'account',
  'audit-logs': 'audit_log',
  clients: 'client',
  keys: 'key',
  sessions: 'session',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
