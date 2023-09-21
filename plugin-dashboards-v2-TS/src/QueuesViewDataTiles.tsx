import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import { CustomizationProvider, PasteCustomCSS, CustomizationProviderProps } from '@twilio-paste/core/customization';

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


    QueuesView(manager);
    TeamsView(manager);
  }
  
}
