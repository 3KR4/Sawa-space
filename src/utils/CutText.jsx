export default function CutText(text, length) {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + "...";
}
