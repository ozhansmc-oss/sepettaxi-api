export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxcB50-q3xv2BeSF3iJP0iKiFewvcwrKDjrCkz8-Cm5Jd7fXhl3YMt72QAWrSdfsWkNAw/exec";

  try {
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(req.body)
    });

    const text = await gasRes.text();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).json({
      error: "PROXY_ERROR",
      detail: String(e)
    });
  }
}
