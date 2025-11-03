export function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null

  return Response.json({
    NEXT_PUBLIC_SUPABASE_URL: url,
    startsWithHTTPS: !!(url && /^https?:\/\//.test(url)),
  })
}
