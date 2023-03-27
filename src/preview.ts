import type { Renderer, ProjectAnnotations } from '@storybook/types';
import { PARAM_KEY } from './constants';
import { withGridOverlay } from './withGridOverlay';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withGridOverlay],
  globals: {
    [PARAM_KEY]: false
  }
};

export default preview;
