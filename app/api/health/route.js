export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.SUPABASE_ANON_KEY
    if (!url || !anon) {
      return Response.json({ ok: false, error: 'Missing Supabase keys' }, { status: 500 })
    }
    const res = await fetch(`${url}/rest/v1/businesses?select=id&limit=1`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}`, Prefer: 'count=exact' }
    })
    if (!res.ok) {
      return Response.json({ ok: false, error: `REST ${res.status} ${await res.text()}` }, { status: 500 })
    }
    const range = res.headers.get('content-range') || '0-0/0'
    const count = Number(range.split('/')[1] || 0)
    return Response.json({ ok: true, db: { businesses: isNaN(count) ? null : count } })
  } catch (e) {
    return Response.json({ ok: false, error: e?.message || 'unknown' }, { status: 500 })
  }
}
