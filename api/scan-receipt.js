module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Serwer nie ma skonfigurowanego klucza API (ANTHROPIC_API_KEY)" });
    return;
  }

  const { content } = req.body || {};
  if (!Array.isArray(content) || !content.length) {
    res.status(400).json({ error: "Brak danych do analizy" });
    return;
  }

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4000,
        messages: [{ role: "user", content }]
      })
    });

    const data = await resp.json();
    if (!resp.ok || data.error) {
      res.status(resp.status || 500).json({ error: data.error?.message || data.error || "Błąd API" });
      return;
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Błąd połączenia z API" });
  }
};
