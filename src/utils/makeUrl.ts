export default function makeApiUrl(port: string, path: string) {
  const have = new URL(window.location.href);
  if (
    have.hostname === "localhost" ||
    have.hostname === "127.0.0.1" ||
    have.hostname === "0.0.0.0"
  ) {
    return `http://${have.hostname}:${port}/api/${path}`;
  } else if (
    have.hostname.endsWith("ngrok.io") ||
    have.hostname.endsWith("ngrok-free.app")
  ) {
    return `https://${have.hostname}/api/${path}`;
  }
  return `https://${have.hostname}/api/${path}`;
}
