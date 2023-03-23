import React from 'react';
import { styled } from '@storybook/theming';

const Overlay = styled.div<{
  padded?: boolean;
}>(({ padded }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  paddingLeft: padded ? '16px' : 0,
  paddingRight: padded ? '16px' : 0,
  height: '100%',
  pointerEvents: 'none',
  zIndex: 9999,
  boxSizing: 'border-box'
}));

const Grid = styled.div<{
  columns: number | string;
  gap: string;
  gutter: string;
  padded?: boolean;
  maxWidth?: string;
}>(({ columns, gap, gutter, padded, maxWidth }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  columnGap: gap,
  width: '100%',
  maxWidth: maxWidth ?? 'none',
  margin: '0 auto',
  paddingLeft: gutter,
  paddingRight: gutter,
  height: '100%',
  pointerEvents: 'none',
  boxSizing: 'border-box'
}));

const Column = styled.div<{ color?: string }>(
  ({ color = 'rgba(255, 71, 132, 0.15)' }) => ({
    height: '100%',
    backgroundColor: color,
    pointerEvents: 'none',
    boxSizing: 'border-box'
  })
);

interface GridOverlayProps {
  layout: 'padded' | 'fullscreen' | 'centered';
  columns?: number | string;
  gap?: string;
  gutter?: string;
  maxWidth?: string;
  color?: string;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
  layout,
  columns = 12,
  gap = '20px',
  gutter = '0px',
  maxWidth,
  color
}) => {
  let columnCount = columns;

  const isCssVariable =
    typeof columnCount === 'string' && columnCount.match(/var\(--.+\)/);

  if (isCssVariable) {
    const cssVariable = (columnCount as string).match(/var\(--.+\)/)?.[0];
    const cssVariableValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(cssVariable?.replace('var(', '').replace(')', '') ?? '');

    if (!isNaN(Number(cssVariableValue))) {
      columnCount = Number(cssVariableValue);
    }
  }

  return (
    <Overlay padded={layout === 'padded'}>
      <Grid columns={columns} gap={gap} gutter={gutter} maxWidth={maxWidth}>
        {Array.from({
          length: columnCount as number
        }).map((_, index) => (
          <Column key={index} color={color} />
        ))}
      </Grid>
    </Overlay>
  );
};
