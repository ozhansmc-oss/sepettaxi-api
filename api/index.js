export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbx7SzY0ydTEga3A5WdYZmXnxINFuOzesY2Czly4vy66sa9zUEu02_qrZ62Sm0gk9Ho0/exec";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    if (req.query?.action === "ping") {
      return res.status(200).json({
        ok: true,
        ts: new Date().toISOString()
      });
    }
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (req.method === "POST") {
    const r = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(req.body || {})
    });
    const text = await r.text();
    return res.status(200).send(text);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
