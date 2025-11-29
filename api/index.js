import { chromium } from "@playwright/browser-chromium";

export default async function handler(req, res) {
  const { html } = req.body;

  if (!html) {
    return res.status(400).json({ error: "HTML içeriği eksik." });
  }

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });

    const pdf = await page.pdf({ format: "A4" });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=vibrio-report.pdf");
    res.send(pdf);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
