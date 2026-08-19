# Jyoti Gruh Udhyog AI Poster Maker

- Upload a product image OR enter only the product name.
- Weight and price are optional.
- Generates a 1024x1024 WEBP poster.
- If no image is uploaded, `/api/generate-image` uses the OpenAI Images API through the secure Node server.

## Run
1. Install Node.js.
2. `npm install`
3. Set `OPENAI_API_KEY` as an environment variable.
4. `npm start`
5. Open `http://localhost:3000`

Do not put the OpenAI API key in `index.html` or commit it to GitHub.
