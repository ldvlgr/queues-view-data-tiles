import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import QueuesView from './queues-view-data-tiles/flex-hooks/components/QueuesView';
import TeamsView from './teams-view-data-tiles/flex-hooks/components/TeamsView';

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
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    QueuesView(manager);
    TeamsView(manager)
  }
  
}
