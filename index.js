
import fs from "fs";
import path from "path";
import { chromium } from "@playwright/browser-chromium";

export default async function handler(req,res){

if(req.method==="GET") return res.json({api:"Vibrio Live 🔥"});

const {name1,name2,score,analysis,risk,opportunity,future}=req.body;
if(!name1) return res.status(400).json({error:"Eksik body"});

const filePath=path.join(process.cwd(),"vibrio-template.html");
let html=fs.readFileSync(filePath,"utf8")
.replace(/{{name1}}/g,name1).replace(/{{name2}}/g,name2).replace(/{{score}}/g,score)
.replace(/{{analysis}}/g,analysis).replace(/{{risk}}/g,risk)
.replace(/{{opportunity}}/g,opportunity).replace(/{{future}}/g,future);

const browser=await chromium.launch();
const page=await browser.newPage();
await page.setContent(html);
const pdf=await page.pdf({format:"A4"});
await browser.close();

res.setHeader("Content-Type","application/pdf");
res.send(pdf);
}
