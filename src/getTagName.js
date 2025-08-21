import tagJson from "../asset/tag.json" with { type: "json" };;

export function getTagName(tag) {
  return tagJson[tag];
}
