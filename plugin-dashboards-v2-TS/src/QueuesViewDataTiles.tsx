import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import { CustomizationProvider, PasteCustomCSS, CustomizationProviderProps } from '@twilio-paste/core/customization';

import QueuesView from './queues-view-data-tiles/flex-hooks/components/QueuesView';
import TeamsView from './teams-view-data-tiles/flex-hooks/components/TeamsView';
import { updateWorkerWithCapacity } from './teams-view-data-tiles/utils/TRService';
import { isChannelChat_CapacityEnabled, isChannelSMS_CapacityEnabled } from './teams-view-data-tiles/config';
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

    Flex.setProviders({
      CustomProvider: RootComponent => props => {
        const pasteProviderProps: CustomizationProviderProps & {
          style: PasteCustomCSS;
        } = {
          baseTheme: props.theme?.isLight ? 'default' : 'dark',
          theme: props.theme?.tokens,
          style: { minWidth: '100%', height: '100%' },
          elements: {
            COMPACT_TABLE: {
              padding: 'space20',
            },
            COMPACT_TABLE_BG20: {
              padding: 'space20',
              backgroundColor: 'colorBackgroundDecorative20Weakest',
            },
            COMPACT_TABLE_BG30: {
              padding: 'space20',
              backgroundColor: 'colorBackgroundDecorative30Weakest',
            },
            FLEX_WITH_OVERFLOW: {
              overflowY: 'auto',
            },
          },
        };
        return (
          <CustomizationProvider {...pasteProviderProps}>
            <RootComponent {...props} />
          </CustomizationProvider>
        );
      },
    });

    if (isChannelChat_CapacityEnabled() || isChannelSMS_CapacityEnabled()) {
      // Copy Worker Channels capacity to worker attributes
      const workerSid = manager?.workerClient?.sid;
      if (workerSid) {
        await updateWorkerWithCapacity(workerSid);
      };
    }
    QueuesView(manager);
    TeamsView(manager);
  }

}
