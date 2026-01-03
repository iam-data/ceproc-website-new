// Database connection stub
// TODO: Implement actual Neon PostgreSQL connection

export const query = async (sql: string, params?: any[]) => {
  // For now, return mock data to allow build to succeed
  console.warn('Database not connected - using mock data');
  return { rows: [], rowCount: 0 };
};

export const saveEvents = async (events: any[]) => {
  // Mock saveEvents function
  console.warn('Database not connected - mock saveEvents called');
  return { success: true, count: events.length };
};

export default {
  query,
  saveEvents
};
