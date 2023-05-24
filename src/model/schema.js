import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'sessions',
      columns: [
        { name: 'session_id', type: 'string' },
        { name: 'session_start', type: 'string' },
        { name: 'session_end', type: 'string' },
        { name: 'duration', type: 'number' },
        { name: 'climbs', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'climbs',
      columns: [
        { name: 'climb_id', type: 'string' },
        { name: 'discipline', type: 'string' },
        { name: 'grade', type: 'string' },
        { name: 'terrain', type: 'string' },
        { name: 'problematic_holds', type: 'string' },
        { name: 'progress', type: 'string' },
        { name: 'date_started', type: 'string' },
        { name: 'date_sent', type: 'string' },
        { name: 'num_sessions_before_send', type: 'number' },
        { name: 'sessions', type: 'string' }
      ]
    })
  ]
})