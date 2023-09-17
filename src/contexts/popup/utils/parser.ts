export const convertBRToNewLine = (comment: string) => comment.replace(/<br\s*\/?>/gi, '\n');

export const parseHTMLString = (text: string) => {
  const parser = new DOMParser();
  const convertedText = convertBRToNewLine(text);
  const document = parser.parseFromString(convertedText, 'text/html');
  const decodeText = document.body.textContent || '';
  return decodeText;
};
