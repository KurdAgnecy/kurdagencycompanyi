import { NextResponse } from 'next/server';

const ACCESS_TOKEN = "EAGF0XOemEGcBRcC8r3DzPjMGm5zCvVhd8RZCRUlFLoZCDwQjW8NPIeasCrVqYiZBCCbxq55QT9NCuxuJMEc8wAgyTaXvdUaPkLZCekbOYskd40d3b2OXdlme6w0sGZCCkdc6PSMZAmVFY9I9WIRRqAHtE1BjxpIjTEZAz6QvFWzHz4uIBZBP03cGdj4EZCk5xfTTPHiAjG4hE";
const PAGE_ID = "430872116773228"; // ناسنامەی پەیجەکەت کە لە وێنەکەدا بوو

export async function GET() {
  try {
    // ڕاکێشانی پۆستەکان لە فەیسبووکەوە
    const res = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/posts?fields=id,message,full_picture,created_time&access_token=${ACCESS_TOKEN}`);
    const data = await res.json();
    return NextResponse.json(data.data || []);
  } catch (error) {
    return NextResponse.json({ error: "کێشە لە هێنانی پۆستەکان هەیە" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const AD_ACCOUNT_ID = "act_957695996864427";

  try {
    // دروستکردنی کەمپەین ڕێک وەک مێتا
    const res = await fetch(`https://graph.facebook.com/v19.0/${AD_ACCOUNT_ID}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Kurd Agency - ${body.post_id}`,
        objective: body.objective, // وەک Traffic یان Engagement
        status: "PAUSED",
        daily_budget: parseInt(body.budget) * 100,
        access_token: ACCESS_TOKEN
      }),
    });
    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Error Publishing" }, { status: 500 });
  }
}
