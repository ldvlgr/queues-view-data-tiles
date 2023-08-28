import { WorkerAttributes } from '@twilio/flex-ui';

export default interface Worker {
  activityDuration: string;
  activityName: string;
  attributes: CustomWorkerAttributes;
  dateUpdated: Date;
  fullName: string;
  isAvailable: boolean;
  name: string;
  sid: string;
  source: {
    activity_name: string;
    attributes: CustomWorkerAttributes;
    date_activity_changed: string;
    date_updated: string;
    friendly_name: string;
    worker_activity_sid: string;
    worker_sid: string;
    workspace_sid: string;
  };
}

export interface CustomWorkerAttributes extends WorkerAttributes {
  SID: string;
  contact_uri: string;
  image_url: string;
  roles: ['admin' | 'supervisor' | 'agent'];

  // used for selecting language
  language?: string;

  // Flex insights references the following elements
  email: string;
  full_name: string;
  location?: string;
  manager?: string;
  team_id?: string;
  team_name?: string;
  department_id?: string;
  department_name?: string;
}
