import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({limit:"1mb"}));
app.use(express.static(__dirname));

app.post("/api/generate-image", async (req,res)=>{
  try{
    const name = String(req.body?.name || "").trim();
    const style = String(req.body?.style || "Premium Indian food photography");
    if(!name) return res.status(400).send("Product name is required.");

    const prompt = `Create a realistic premium Indian food product photograph for a food poster.
Product: ${name}.
Style: ${style}.
Show the food clearly in an elegant traditional Indian serving bowl on a dark near-black background,
warm golden lighting, subtle Indian festive decor, appetizing texture, premium commercial food photography.
No text, no logos, no labels, no watermark. Square composition.`;

    const result = await client.images.generate({
      model: "gpt-image-2",
      prompt,
      size: "1024x1024",
      quality: "medium"
    });

    const b64 = result.data?.[0]?.b64_json;
    if(!b64) throw new Error("No image returned.");
    res.json({image:`data:image/png;base64,${b64}`});
  }catch(err){
    console.error(err);
    res.status(500).send("Image generation failed. Check OPENAI_API_KEY and API access.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Poster Maker running on http://localhost:${port}`));
