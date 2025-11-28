// Vibrio frontend – feminen/modern arayüz + hızlı sorular + fotoğraf seçimi
const WEBHOOK_URL = "https://hook.eu1.make.com/rncx7w4lyaw4a7yqnd4n2feel90qy85j";

let selectedImageData = null;

function setupVibrioUI() {
  const sendBtn = document.getElementById("sendBtn");
  const chips = document.querySelectorAll(".chip");
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const imagePreviewImg = document.getElementById("imagePreviewImg");
  const clearImageBtn = document.getElementById("clearImage");

  // Hızlı butonlar: tıklanınca örnek soru textarea'ya yazılır
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const tmpl = chip.getAttribute("data-template") || "";
      const textarea = document.getElementById("userMessage");
      textarea.value = tmpl;
      textarea.focus();
    });
  });

  // Fotoğraf seçimi
  imageInput.addEventListener("change", () => {
    const file = imageInput.files?.[0];
    if (!file) {
      selectedImageData = null;
      imagePreview.classList.add("hidden");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImageData = e.target?.result || null;
      if (selectedImageData) {
        imagePreviewImg.src = selectedImageData;
        imagePreview.classList.remove("hidden");
      }
    };
    reader.readAsDataURL(file);
  });

  clearImageBtn.addEventListener("click", () => {
    selectedImageData = null;
    imageInput.value = "";
    imagePreview.classList.add("hidden");
  });

  sendBtn.addEventListener("click", sendToWebhook);
}

async function sendToWebhook() {
  const textarea = document.getElementById("userMessage");
  const msg = textarea.value.trim();
  const box = document.getElementById("responseBox");
  const ctaSection = document.getElementById("ctaSection");
  const ctaButton = document.getElementById("ctaButton");

  if (!msg) {
    alert("Lütfen önce bir şey yaz.");
    return;
  }

  box.innerHTML = "<p class='placeholder'>🔮 Vibrio düşünüyor...</p>";
  ctaSection.classList.add("hidden");

  try {
    const payload = {
      message: msg,
    };

    // Fotoğraf seçiliyse base64 olarak ekle (backend şu an kullanmıyor ama hazır dursun)
    if (selectedImageData) {
      payload.imageData = selectedImageData;
    }

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const txt = await res.text();
    let data;
    try {
      data = JSON.parse(txt);
    } catch (e) {
      console.error("JSON parse error:", e, txt);
      box.innerHTML = "<p class='placeholder' style='color:#b91c1c;'>Sunucudan beklenmeyen veri geldi.</p>";
      return;
    }

    // Hem eski (energy/comment) hem yeni (score/teaser) formatı destekle
    const energy = data.score ?? data.energy ?? "–";
    const comment = data.teaser ?? data.comment ?? "Cevap alınamadı.";

    box.innerHTML = `
      <p class="result-line">
        <span class="result-label">Enerji:</span>
        <span class="result-value">%${energy}</span>
      </p>
      <p class="result-line">
        <span class="result-label">Yorum:</span>
        <span class="result-value">${comment}</span>
      </p>
    `;

    // Eğer CTA bilgisi geliyorsa, Shopier butonunu göster
    if (data.ctaText && data.shopierUrl) {
      ctaButton.textContent = data.ctaText;
      ctaButton.href = data.shopierUrl;
      ctaSection.classList.remove("hidden");
    } else {
      ctaSection.classList.add("hidden");
    }
  } catch (err) {
    console.error(err);
    box.innerHTML = "<p class='placeholder' style='color:#b91c1c;'>Bağlantıda bir sorun oluştu.</p>";
  }
}

// Sayfa yüklendiğinde eventleri bağla
document.addEventListener("DOMContentLoaded", setupVibrioUI);
