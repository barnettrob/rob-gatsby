import dompurify from "dompurify";

export function sanitizeHtml(content) {
  const sanitizer = dompurify.sanitize;

  return sanitizer(content);
}