export function maxLength(text, length) {
  if (text?.length > length) {
    return `${text.substring(0, length)}...`;
  } else {
    return `${text}`;
  }
}