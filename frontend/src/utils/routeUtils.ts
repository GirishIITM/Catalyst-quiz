export function generateRoute(template: string, params: { classroom?: string, quizId?: string, noteId?: string }) {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}
