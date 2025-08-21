import { getTagName } from "./getTagName.js";

export function parser(data, level = 0) {
  let i = 0;
  const result = {};

  while (i < data.length) {
    if (i + 4 > data.length) {
      break;
    }
    const tag = data.slice(i, i + 2);
    i += 2;

    const length = parseInt(data.slice(i, i + 2), 10);
    i += 2;

    const value = data.slice(i, i + length);
    i += length;

    if (
      /^\d+$/.test(tag) &&
      ((parseInt(tag, 10) >= 26 && parseInt(tag, 10) <= 51) || tag === "62")
    ) {
      result[tag] = parser(value, level + 1);
    } else {
      result[tag] =
        level > 0
          ? { length, value }
          : { name: getTagName(tag), length, value };
    }
  }

  return result;
}
