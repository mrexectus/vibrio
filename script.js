// FINAL VIBRIO SCRIPT – MAKE WEBHOOK ENTEGRASYONU

const WEBHOOK_URL = "https://hook.eu1.make.com/rncx7w4lyaw4a7yqnd4n2feel90qy85j";

async function sendToWebhook() {
    const messageInput = document.getElementById("userMessage");
    const responseBox = document.getElementById("responseBox");

    const message = messageInput.value.trim();
    if (!message) {
        alert("Lütfen bir mesaj yaz.");
        return;
    }

    responseBox.innerHTML = "🔮 Vibrio düşünüyor...";

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error("JSON parse hatası:", e, text);
            responseBox.innerHTML =
                "<p style='color:red;'>Sunucudan beklenmeyen veri geldi.</p>";
            return;
        }

        responseBox.innerHTML = `
            <p><strong>Enerji:</strong> ${data.energy}</p>
            <p><strong>Yorum:</strong> ${data.comment}</p>
        `;

    } catch (error) {
        console.error("Hata:", error);
        responseBox.innerHTML =
            "<p style='color:red;'>Bir hata oluştu. Lütfen tekrar dene.</p>";
    }
}
