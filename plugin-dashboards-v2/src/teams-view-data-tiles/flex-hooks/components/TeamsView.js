import { addTeamsViewTiles } from './TeamsViewTiles';
import { addWorkersDataTableColumns } from './TeamsViewColumns';

export default (manager) => {
  addTeamsViewTiles();
  addWorkersDataTableColumns();
  // default string
  // manager.strings.SupervisorTaskCardHeader = '{{task.defaultFrom}}';
  manager.strings.SupervisorTaskCardHeader = '{{task.queueName}}';
}



