export function generateRoute(template: string, params: Record<string, string>) {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}
