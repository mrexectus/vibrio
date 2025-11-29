export default function handler(req, res) {
  res.status(200).json({
    status: "OK",
    message: "Vibrio API çalışıyor ✔",
    time: new Date().toISOString()
  });
}
import puppeteer from "puppeteer";

export default async function handler(req, res) {

  // HTML içerğini POST ile alıyoruz
  const { html } = req.body;

  if (!html) {
    return res.status(400).json({ error: "HTML içeriği gönderilmedi." });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=vibrio-report.pdf");
    return res.send(pdfBuffer);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
