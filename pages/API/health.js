import { adminClient } from '@/lib/supabaseClient'

export default async function handler(req, res) {
  try {
    const supa = adminClient()
    const { count: bizCount, error } = await supa
      .from('businesses')
      .select('id', { count: 'exact', head: true })
    if (error) throw error

    res.status(200).json({
      ok: true,
      env: {
        SUPABASE_URL_set: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        ANON_KEY_set: !!process.env.SUPABASE_ANON_KEY,
        SERVICE_ROLE_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      db: { businesses: bizCount ?? 0 },
    })
  } catch (err) {
    res.status(500).json({ ok: false, error: err?.message || 'unknown' })
  }
}
