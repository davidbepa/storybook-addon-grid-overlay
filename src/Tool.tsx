import React, { memo, useCallback, useEffect } from 'react';
import { useGlobals, useStorybookApi } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { GridIcon } from '@storybook/icons';
import { ADDON_ID, PARAM_KEY, TOOL_ID } from './constants';

export const Tool = memo(function GridOverlaySelector() {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();

  const isActive = [true, 'true'].includes(globals[PARAM_KEY]);

  const toggleMyTool = useCallback(() => {
    updateGlobals({
      [PARAM_KEY]: !isActive
    });
  }, [isActive]);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: 'Toggle Grid Overlay [G]',
      defaultShortcut: ['G'],
      actionName: 'outline',
      showInMenu: false,
      action: toggleMyTool
    });
  }, [toggleMyTool, api]);

  return (
    <IconButton
      key={TOOL_ID}
      active={isActive}
      title="Apply a grid to the preview"
      onClick={toggleMyTool}
    >
      <GridIcon />
    </IconButton>
  );
});
