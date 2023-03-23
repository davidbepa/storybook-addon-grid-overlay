import React from 'react';
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext
} from '@storybook/types';
import { useGlobals, useParameter } from '@storybook/preview-api';
import { PARAM_KEY } from './constants';
import { GridOverlay } from './components/GridOverlay';

export const withGridOverlay = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const params = useParameter(PARAM_KEY, null);
  const [globals] = useGlobals();
  const displayGrid = globals[PARAM_KEY];
  const isInDocs = context.viewMode === 'docs';
  const { layout = 'padded' } = context.parameters;

  return (
    <>
      {displayGrid && !isInDocs && <GridOverlay layout={layout} {...params} />}
      {StoryFn()}
    </>
  );
};
