import { FlexPlugin } from '@twilio/flex-plugin';
import QueuesView from './components/QueuesView';
import TeamsView from './components/TeamsView';

const PLUGIN_NAME = 'QueuesViewDataTiles';

export default class DashboardsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    //Queue Stats Dashboard enhancements
    QueuesView(manager);
    TeamsView(manager)
  }
  
}
