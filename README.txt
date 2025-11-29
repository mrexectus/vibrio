
INSTALL:

1) Zip'i indir ve GitHub repo köküne yükle:
   /api/index.js
   vibrio-template.html
   package.json

2) Vercel deploy sonrası test:
POST https://YOUR-VERCEL-URL/api
{
 "name1":"Elif",
 "name2":"Kerem",
 "score":82,
 "analysis":"Uyum yüksek...",
 "risk":"Zaman zaman kırılganlık...",
 "opportunity":"Bağ güçlendirme açık...",
 "future":"Uzun vadede uyum güçlü."
}
