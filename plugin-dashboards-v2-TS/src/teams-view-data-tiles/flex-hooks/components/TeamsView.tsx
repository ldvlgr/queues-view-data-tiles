import * as Flex from '@twilio/flex-ui';
import Worker from '../../types/worker';
import { addTeamsViewTiles } from './TeamsViewTiles';
import { addWorkersDataTableColumns } from './TeamsViewColumns';

interface WorkerItem {
  worker: Worker;
}

export default (manager: Flex.Manager) => {
  addTeamsViewTiles();
  addWorkersDataTableColumns();
  // default string
  // manager.strings.SupervisorTaskCardHeader = '{{task.defaultFrom}}';
  manager.strings.SupervisorTaskCardHeader = '{{task.queueName}}';
}



