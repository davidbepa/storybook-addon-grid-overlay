type GridCSSProps = {
  layout: 'padded' | 'fullscreen' | 'centered';
  columns: number | string;
  gap?: string;
  gutter?: string;
  maxWidth?: string;
  color?: string;
};

export default function gridCSS(props: GridCSSProps) {
  return `
    .sb-grid-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
      box-sizing: border-box;
      ${
        props.layout === 'padded'
          ? 'padding-left: 16px; padding-right: 16px;'
          : ''
      }
    }

    .sb-grid-overlay__grid {
      display: grid;
      grid-template-columns: repeat(${props.columns}, 1fr);
      column-gap: ${props.gap ?? '20px'};
      width: 100%;
      max-width:${props.maxWidth ?? 'none'};
      ${
        props.gutter
          ? `padding-left: ${props.gutter}; padding-right: ${props.gutter};`
          : ''
      }
      margin: 0 auto;
      height: 100%;
      pointer-events: none;
      box-sizing: border-box;
    }

    .sb-grid-overlay__column {
      height: 100%;
      background-color: ${props.color ?? 'rgba(255, 71, 132, 0.15)'};
      pointer-events: none;
      box-sizing: border-box;
    }
  `;
}
