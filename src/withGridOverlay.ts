import { global } from '@storybook/global';
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext
} from '@storybook/types';
import { useEffect, useGlobals, useParameter } from '@storybook/preview-api';
import { PARAM_KEY } from './constants';
import { getColumnCount } from './helpers';
import gridCSS from './gridCSS';

export const withGridOverlay = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const params = useParameter(PARAM_KEY, null);
  const [globals] = useGlobals();
  const displayGrid = globals[PARAM_KEY];
  const isInDocs = context.viewMode === 'docs';
  const { layout = 'padded' } = context.parameters;

  useEffect(() => {
    displayGridOverlay({ displayGrid, isInDocs, layout, ...params });
  }, [displayGrid]);

  return StoryFn();
};

type DisplayGridOverlayState = {
  displayGrid: boolean;
  isInDocs: boolean;
  layout: 'padded' | 'fullscreen' | 'centered';
  columns?: number | string;
  gap?: string;
  maxWidth?: string;
  gutter?: string;
  color?: string;
};

function displayGridOverlay({
  displayGrid,
  isInDocs,
  layout,
  columns = 12,
  ...props
}: DisplayGridOverlayState) {
  console.log('entra');
  const rootElement = document.getElementById('storybook-root').parentElement;

  let styleElement = global.document.getElementById(`addon-grid-overlay`);
  let overlayElement =
    rootElement.querySelector<HTMLDivElement>(`.sb-grid-overlay`);

  if (isInDocs || !displayGrid) {
    styleElement?.remove();
    overlayElement?.remove();
    return;
  }

  let columnCount = getColumnCount(columns);

  if (!styleElement) {
    styleElement = global.document.createElement('style');
    styleElement.setAttribute('id', 'addon-grid-overlay');
    global.document.head.appendChild(styleElement);
  }

  styleElement.innerHTML = gridCSS({
    layout,
    columns,
    ...props
  });

  if (!overlayElement) {
    overlayElement = global.document.createElement('div');
    overlayElement.classList.add('sb-grid-overlay');

    const grid = global.document.createElement('div');
    grid.classList.add('sb-grid-overlay__grid');

    overlayElement.appendChild(grid);

    Array.from({
      length: columnCount as number
    }).forEach(() => {
      const column = global.document.createElement('div');
      column.classList.add('sb-grid-overlay__column');
      grid.appendChild(column);
    });

    rootElement.appendChild(overlayElement);
  }
}
