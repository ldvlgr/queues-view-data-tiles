
export const mockQueuesData = [
  {
    'key': 'WQ123abc',
    'friendly_name': 'Everyone',
    'total_available_workers': 1,
    'total_eligible_workers': 3,
    'activity_statistics': [
      {
        'sid': 'WA123',
        'workers': 2,
        'friendly_name': 'Offline'
      },
      {
        'sid': 'WA124',
        'workers': 1,
        'friendly_name': 'Break'
      },
      {
        'sid': 'WA234',
        'workers': 1,
        'friendly_name': 'Available'
      },
      {
        'sid': 'WA245',
        'workers': 0,
        'friendly_name': 'Unavailable'
      },
      {
        'sid': 'WA246',
        'workers': 0,
        'friendly_name': 'Training'
      }
    ],
    'tasks_by_status': {
      'reserved': 0,
      'pending': 0,
      'assigned': 0,
      'wrapping': 0
    },
    'total_tasks': 0,
    'longest_task_waiting_sid': null,
    'longest_task_waiting_from': null,
    'sla_30_min': {
      'total_tasks_count': 0,
      'handled_tasks_count': 0,
      'handled_tasks_within_sl_threshold_count': 0,
      'handled_tasks_within_sl_threshold_percentage': -1,
      'abandoned_tasks_count': 0,
      'abandoned_tasks_percentage': -1,
      'short_abandoned_tasks_count': 0,
      'short_abandoned_tasks_percentage': -1,
      'flow_out_tasks_count': 0,
      'flow_out_tasks_percentage': -1,
      'sla_percentage': -1,
      'timestamp_updated': 0
    },
    'sla_today': {
      'total_tasks_count': 0,
      'handled_tasks_count': 0,
      'handled_tasks_within_sl_threshold_count': 0,
      'handled_tasks_within_sl_threshold_percentage': -1,
      'abandoned_tasks_count': 0,
      'abandoned_tasks_percentage': -1,
      'short_abandoned_tasks_count': 0,
      'short_abandoned_tasks_percentage': -1,
      'flow_out_tasks_count': 0,
      'flow_out_tasks_percentage': -1,
      'sla_percentage': -1,
      'timestamp_updated': 0
    },
    'channels': [
      {
        'unique_name': 'chat',
        'date_updated': '2023-06-15',
        'workspace_sid': 'WS123',
        'friendly_name': 'Programmable Chat',
        'account_sid': 'AC123456',
        'channel_optimized_routing': false,
        'url': '',
        'sid': 'TC123',
        'date_created': '2023-06-15',
        'links': {
          'workspace': ''
        },
        'tasks_now': {
          'pending_tasks': 0,
          'reserved_tasks': 0,
          'assigned_tasks': 2,
          'wrapping_tasks': 1,
          'waiting_tasks': 5,
          'active_tasks': 3,
          'total_tasks': 0,
          'longest_task_waiting_sid': null,
          'longest_task_waiting_from': null,
          'timestamp_updated': 0
        },
        'sla_today': {
          'total_tasks_count': 0,
          'handled_tasks_count': 15,
          'handled_tasks_within_sl_threshold_count': 10,
          'handled_tasks_within_sl_threshold_percentage': -1,
          'abandoned_tasks_count': 0,
          'abandoned_tasks_percentage': -1,
          'short_abandoned_tasks_count': 0,
          'short_abandoned_tasks_percentage': -1,
          'flow_out_tasks_count': 0,
          'flow_out_tasks_percentage': -1,
          'sla_percentage': -1,
          'timestamp_updated': 0
        }
      },
      {
        'unique_name': 'voice',
        'date_updated': '2023-06-15',
        'workspace_sid': 'WS123',
        'friendly_name': 'Voice',
        'account_sid': 'AC123456',
        'channel_optimized_routing': false,
        'url': '',
        'sid': 'TC123',
        'date_created': '2023-05-15',
        'links': {
          'workspace': ''
        },
        'tasks_now': {
          'pending_tasks': 0,
          'reserved_tasks': 0,
          'assigned_tasks': 3,
          'wrapping_tasks': 2,
          'waiting_tasks': 4,
          'active_tasks': 5,
          'total_tasks': 0,
          'longest_task_waiting_sid': null,
          'longest_task_waiting_from': null,
          'timestamp_updated': 0
        },
        'sla_today': {
          'total_tasks_count': 0,
          'handled_tasks_count': 25,
          'handled_tasks_within_sl_threshold_count': 24,
          'handled_tasks_within_sl_threshold_percentage': -1,
          'abandoned_tasks_count': 0,
          'abandoned_tasks_percentage': -1,
          'short_abandoned_tasks_count': 0,
          'short_abandoned_tasks_percentage': -1,
          'flow_out_tasks_count': 0,
          'flow_out_tasks_percentage': -1,
          'sla_percentage': -1,
          'timestamp_updated': 0
        }
      },
      {
        'unique_name': 'sms',
        'date_updated': '2023-06-15',
        'workspace_sid': 'WS123',
        'friendly_name': 'SMS',
        'account_sid': 'AC123456',
        'channel_optimized_routing': false,
        'url': '',
        'sid': 'TC123',
        'date_created': '2023-05-15',
        'links': {
          'workspace': ''
        },
        'tasks_now': {
          'pending_tasks': 0,
          'reserved_tasks': 0,
          'assigned_tasks': 3,
          'wrapping_tasks': 1,
          'waiting_tasks': 2,
          'active_tasks': 4,
          'total_tasks': 0,
          'longest_task_waiting_sid': null,
          'longest_task_waiting_from': null,
          'timestamp_updated': 0
        },
        'sla_today': {
          'total_tasks_count': 0,
          'handled_tasks_count': 11,
          'handled_tasks_within_sl_threshold_count': 3,
          'handled_tasks_within_sl_threshold_percentage': -1,
          'abandoned_tasks_count': 0,
          'abandoned_tasks_percentage': -1,
          'short_abandoned_tasks_count': 0,
          'short_abandoned_tasks_percentage': -1,
          'flow_out_tasks_count': 0,
          'flow_out_tasks_percentage': -1,
          'sla_percentage': -1,
          'timestamp_updated': 0
        }

      }
    ]
  },

]