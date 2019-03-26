import size from "lodash/fp/size";
import getOr from "lodash/fp/getOr";
import reduce from "lodash/reduce";

function generateBoxPath(xMultiplier, yMultiplier, w, h) {
  const x = xMultiplier * w;
  const y = yMultiplier * h;
  return `M${x} ${y} L${x} ${y + h} L${x + w} ${y + h} L${x + w} ${y}Z `;
}

function getScales(matrix, width, height) {
  const y = size(matrix);
  const x = size(getOr(0, "0")(matrix));
  const scalingSide = width > height ? height : width;
  const w = scalingSide / x;
  const h = scalingSide / y;
  return { w, h };
}

export function generatePath(matrix, width, height) {
  const { h, w } = getScales(matrix, height, width);
  return reduce(
    matrix,
    (finalCol, currentCol, colIndex) => {
      const currentColStep = colIndex;
      const rowPath = reduce(
        currentCol,
        (finalRow, currentRow, rowIndex) => {
          const currentRowStep = rowIndex;
          if (currentRow === 0) {
            return (
              finalRow + generateBoxPath(currentRowStep, currentColStep, w, h)
            );
          }
          return finalRow;
        },
        ""
      );
      console.log("rowPath: ", rowPath);
      return finalCol + rowPath;
    },
    ""
  );
}

export function generateFence(width, height) {
  return `M0 0 L0 ${height} M0 0 L${width} 0 M${width} ${height} L${width} 0 M${width} ${height} L0 ${height} `;
}
