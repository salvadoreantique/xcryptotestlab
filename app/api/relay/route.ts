import { NextRequest } from 'next/server';

export const runtime = 'edge';

const TARGET_BASE = (process.env.GAME_NODE || '').replace(/\/$/, '');

const STRIP_HEADERS = new Set([
  "host", "connection", "keep-alive", "proxy-authenticate",
  "proxy-authorization", "te", "trailer", "transfer-encoding",
  "upgrade", "forwarded", "x-forwarded-host", "x-forwarded-proto",
  "x-forwarded-port",
]);

export async function GET(req: NextRequest) {
  return handleRelay(req);
}

export async function POST(req: NextRequest) {
  return handleRelay(req);
}

export async function PUT(req: NextRequest) {
  return handleRelay(req);
}

export async function DELETE(req: NextRequest) {
  return handleRelay(req);
}

async function handleRelay(req: NextRequest) {
  if (!TARGET_BASE) {
    return new Response("Service temporarily unavailable", { status: 503 });
  }

  try {
    const url = new URL(req.url);
    const targetUrl = TARGET_BASE + 
      (url.pathname === '/api/relay' ? '/' : url.pathname.replace('/api/relay', '')) + 
      url.search;

    const headers = new Headers();
    const clientIp = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for');

    for (const [key, value] of req.headers) {
      if (STRIP_HEADERS.has(key) || key.startsWith('x-vercel-') || key === 'x-real-ip') continue;
      if (key === 'x-forwarded-for' && clientIp) continue;
      headers.set(key, value);
    }
    if (clientIp) headers.set('x-forwarded-for', clientIp);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.body,
      redirect: 'manual',
    });

    return response;
  } catch (err) {
    console.error(err);
    return new Response("Connection error", { status: 502 });
  }
}
