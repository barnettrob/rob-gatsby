import DOMPurify from "dompurify";

export function sanitizeHtml(content) {
  const sanitizer = DOMPurify.sanitize;

  return sanitizer(content);
}