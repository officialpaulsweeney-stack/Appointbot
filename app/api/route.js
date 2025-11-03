export async function GET() {
  // TEMP: hard-coded Supabase config so health works reliably
  const URL =
    "https://zbtvdhewusllskhzvbnn.supabase.co";
  const ANON =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpidHZkaGV3dXNsbHNraHp2Ym5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3Njk0MTIsImV4cCI6MjA3NzM0NTQxMn0.SGRIIGAVHow1LSTzpX0eGH43DwDaj2HbYy1NqUkdAQ4";

  try {
    const res = await fetch(
      `${URL}/rest/v1/businesses?select=id&limit=1`,
      {
        headers: {
          apikey: ANON,
          Authorization: `Bearer ${ANON}`,
          Prefer: "count=exact",
        },
      }
    );

    const text = await res.text();
    const range = res.headers.get("content-range") || "0-0/0";
    const count = Number(range.split("/")[1] || 0);

    if (!res.ok) {
      return Response.json(
        { ok: false, status: res.status, body: text },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      db: { businesses: isNaN(count) ? null : count },
      raw: text,
    });
  } catch (e) {
    return Response.json(
      { ok: false, error: e?.message || "unknown" },
      { status: 500 }
    );
  }
}
