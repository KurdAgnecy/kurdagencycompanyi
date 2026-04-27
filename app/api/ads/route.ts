import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // ئەمە کلیلە نوێیەکەیە کە لە وێنەکەدا ناردت
  const ACCESS_TOKEN = "EAGF0XOemEGcBRcC8r3DzPjMGm5zCvVhd8RZCRUlFLoZCDwQjW8NPIeasCrVqYiZBCCbxq55QT9NCuxuJMEc8wAgyTaXvdUaPkLZCekbOYskd40d3b2OXdlme6w0sGZCCkdc6PSMZAmVFY9I9WIRRqAHtE1BjxpIjTEZAz6QvFWzHz4uIBZBP03cGdj4EZCk5xfTTPHiAjG4hE"; 
  
  // ئەمە ID ئەکاونتە نوێیەکەیە act_ پێشگرەکەیە
  const AD_ACCOUNT_ID = "act_957695996864427"; 

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${AD_ACCOUNT_ID}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Auto Campaign - ${body.locations[0]}`,
        objective: "OUTCOME_TRAFFIC",
        status: "PAUSED",
        daily_budget: parseInt(body.budget) * 100, // مێتا بودجە بە سەنت وەردەگرێت
        special_ad_categories: [],
        access_token: ACCESS_TOKEN
      }),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Meta API Connection Error" }, { status: 500 });
  }
}
