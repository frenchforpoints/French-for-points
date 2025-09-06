# French for Points — ready to deploy

This project is already set up with Vite + React + Tailwind and minimal UI components (no extra setup).

## Run locally
1. Install Node.js 18+.
2. In a terminal:
   ```bash
   npm i
   npm run dev
   ```

## Deploy to Vercel (no terminal required)
1. Go to https://github.com/new and create an **empty repo** (any name).
2. In that repo, click **Add file → Upload files**, then **drag all files/folders from this ZIP** into GitHub and click **Commit**.
3. Go to https://vercel.com → **Add New… → Project → Import from GitHub** → pick your repo.
4. Framework: **Vite** (auto-detected). Build command: `npm run build`. Output folder: `dist`.
5. Click **Deploy**. Done.

### Google Apps Script email sender
- Update the Web App URL in `src/App.tsx` if needed: `CONFIG.gs.webAppUrl`.
- In Apps Script, go to **Deploy → Manage deployments → Web app** and make sure access is **Anyone**.

