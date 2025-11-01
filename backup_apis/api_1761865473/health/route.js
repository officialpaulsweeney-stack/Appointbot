import { createClient } from '@supabase/supabase-js'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  )
}

export async function GET() {
  try {
    const supa = adminClient()
    const { count, error } = await supa
      .from('businesses')
      .select('id', { count: 'exact', head: true })
    if (error) throw error

    return Response.json({
      ok: true,
      env: {
        SUPABASE_URL_set: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        ANON_KEY_set: !!process.env.SUPABASE_ANON_KEY,
        SERVICE_ROLE_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      },
      db: { businesses: count ?? 0 }
    })
  } catch (e) {
    return Response.json({ ok: false, error: e?.message || 'unknown' }, { status: 500 })
  }
}
