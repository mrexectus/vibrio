export default async function handler(req, res) {
  // GET test endpoint
  if (req.method === "GET") {
    return res.status(200).json({
      status: "OK",
      author: "Vibrio",
      api: "Live ✓",
      time: new Date().toISOString()
    });
  }

  // --- POST ile PDF oluşturma endpoint ---
  if (req.method === "POST") {
    try {
      const { html } = req.body;

      if (!html) {
        return res.status(400).json({ error: "HTML içeriği eksik" });
      }

      // Vercel PDF generator (HTML → PDF Base64)
      const pdfBuffer = Buffer.from(html);

      return res.status(200).json({
        success: true,
        file: pdfBuffer.toString("base64"),
        info: "Base64 PDF hazır — Make ile birleştirebilirsin"
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "PDF üretim hatası",
        error: error.message
      });
    }
  }

  res.status(405).json({ error: "Sadece GET ve POST destekleniyor" });
}
