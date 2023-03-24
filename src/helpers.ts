export const getColumnCount = (columns: number | string) => {
  let columnCount = columns;

  if (typeof columnCount === 'string') {
    const isCssVariable = columnCount.match(/var\(--.+\)/);

    if (isCssVariable) {
      const cssVariableValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue(
        isCssVariable[0]?.replace('var(', '').replace(')', '') ?? ''
      );

      if (!isNaN(Number(cssVariableValue))) {
        columnCount = Number(cssVariableValue);
      }
    } else {
      columnCount = parseInt(columnCount, 10);
    }
  }

  return columnCount;
};
