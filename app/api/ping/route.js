export function GET() {
  return new Response(
    JSON.stringify({ ok: true, message: 'pong' }),
    { headers: { 'content-type': 'application/json' } }
  );
}
