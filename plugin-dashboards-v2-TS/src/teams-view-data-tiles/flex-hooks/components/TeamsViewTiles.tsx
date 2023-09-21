import React from 'react';
import * as Flex from '@twilio/flex-ui';

import TeamsViewDataTiles from '../../custom-components/TeamsViewDataTiles/TeamsViewDataTiles';
import { TeamsViewWrapper } from './TeamsViewTiles.Styles';

export const addTeamsViewTiles = () => {
  Flex.TeamsView.Content.addWrapper((OriginalComponent) => (originalProps) => {
    const updatedProps = { ...originalProps };
    return (
      <TeamsViewWrapper>
        <TeamsViewDataTiles />
        <OriginalComponent {...updatedProps} />
      </TeamsViewWrapper>
    );
  });
};
