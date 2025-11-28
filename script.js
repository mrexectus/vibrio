// FINAL VIBRIO SCRIPT (DÜZELTİLMİŞ)
const WEBHOOK_URL = "https://hook.eu1.make.com/rncx7w4lyaw4a7yqnd4n2feel90qy85j";

async function sendToWebhook() {
    const msg = document.getElementById("userMessage").value.trim();
    const box = document.getElementById("responseBox");
    if (!msg) return alert("Lütfen bir şey yaz.");

    box.innerHTML = "🔮 Vibrio düşünüyor...";

    try {
        const res = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg })
        });

        const txt = await res.text();

        let data;
        try { 
            data = JSON.parse(txt); 
        } catch {
            box.innerHTML = "<p style='color:red;'>Sunucudan beklenmeyen veri geldi.</p>";
            return;
        }

        box.innerHTML = `
            <p><strong>Enerji:</strong> ${data.score}</p>
            <p><strong>Yorum:</strong> ${data.teaser}</p>
        `;

    } catch {
        box.innerHTML = "<p style='color:red;'>Hata oluştu.</p>";
    }
}