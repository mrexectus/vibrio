async function sendToWebhook() {
    const message = document.getElementById("userMessage").value.trim();

    if (!message) {
        alert("Lütfen bir mesaj yaz.");
        return;
    }

    // 🔥 BURAYA Make.com Webhook URL’in gelecek
    const webhookURL = "https://hook.eu1.make.com/rncx7w4lyaw4a7yqnd4n2feel90qy85j";

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: message
            })
        });

        const result = await response.json();

        document.getElementById("responseBox").innerHTML =
            `<p><strong>Cevap:</strong> ${result.reply || "Yanıt alınamadı."}</p>`;

    } catch (error) {
        document.getElementById("responseBox").innerHTML =
            `<p style="color:red;"><strong>Hata:</strong> ${error.message}</p>`;
    }
}
