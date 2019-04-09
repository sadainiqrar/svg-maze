import size from "lodash/fp/size";
import getOr from "lodash/fp/getOr";
import reduce from "lodash/reduce";

function generateBoxPath(xMultiplier, yMultiplier, w, h, matrix) {
  const x = (xMultiplier + 1) * w;
  const y = (yMultiplier + 1) * h;
  const ceiling =
    yMultiplier !== 0 &&
    getOr(-1, `${yMultiplier - 1}.${xMultiplier}`)(matrix) === 0
      ? ""
      : `M${x} ${y} L${x + w} ${y} `;
  const floor =
    yMultiplier !== size(matrix) - 1 &&
    getOr(-1, `${yMultiplier + 1}.${xMultiplier}`)(matrix) === 0
      ? ""
      : `M${x + w} ${y + h} L${x} ${y + h} `;
  const left =
    xMultiplier !== 0 &&
    getOr(-1, `${yMultiplier}.${xMultiplier - 1}`)(matrix) === 0
      ? ""
      : `M${x} ${y} L${x} ${y + h} `;
  const right =
    xMultiplier !== size(getOr(0, "0")(matrix)) - 1 &&
    getOr(-1, `${yMultiplier}.${xMultiplier + 1}`)(matrix) === 0
      ? ""
      : `M${x + w} ${y + h} L${x + w} ${y} `;
  return `${ceiling}${left}${floor}${right}`;
}

export function getScales(matrix, width, height) {
  const y = size(matrix);
  const x = size(getOr(0, "0")(matrix));
  const scalingSide = width > height ? height : width;
  const w = scalingSide / x;
  const h = scalingSide / y;
  return { w, h };
}

export function generatePath(matrix, w, h) {
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
              finalRow +
              generateBoxPath(currentRowStep, currentColStep, w, h, matrix)
            );
          }
          return finalRow;
        },
        ""
      );
      return finalCol + rowPath;
    },
    ""
  );
}

export function generateFence(width, height, w, h) {
  const outer = `M0 0 L0 ${height + 2 * h} M0 0 L${width + 2 * w} 0 M${width +
    2 * w} ${height + 2 * h} L${width + 2 * w} 0 M${width + 2 * w} ${height +
    2 * h} L0 ${height + 2 * h} `;
  const inner = `M${w} ${h} L${w} ${height + h} M${w} ${h} L${width +
    w} ${h} M${width + w} ${height + h} L${width + w} ${h} M${width +
    w} ${height + h} L${w} ${height + h} `;
  return inner + outer;
}
