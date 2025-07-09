import type { Renderer, ProjectAnnotations } from 'storybook/internal/types';
import { PARAM_KEY } from './constants';
import { withGridOverlay } from './withGridOverlay';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withGridOverlay],
  initialGlobals: {
    [PARAM_KEY]: false
  }
};

export default preview;
