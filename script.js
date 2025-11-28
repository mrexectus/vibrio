const WEBHOOK_URL = "https://hook.eu1.make.com/rncx7w4lyaw4a7yqnd4n2feel90qy85j"; 

async function sendToWebhook() {
    const message = document.getElementById("userMessage").value;

    document.getElementById("responseBox").innerHTML = "🔮 Vibrio düşünüyor...";

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        // CEVABI TEXT OLARAK AL (ÖNEMLİ!)
        const text = await response.text();

        // EKRANA BAS
        document.getElementById("responseBox").innerHTML = "✨ " + text;

    } catch (error) {
        document.getElementById("responseBox").innerHTML =
            "❌ Hata: " + error.message;
    }
}





















  