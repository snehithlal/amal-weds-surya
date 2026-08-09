# Amal & Surya — Wedding Website

A digital wedding invitation web application for **Amal & Surya** featuring an **Olive Green & Botanical Gold** aesthetic.

## Event Dates
- **Wedding Ceremony**: Sunday, 30 August 2026
- **Wedding Reception**: Sunday, 06 September 2026

## Local Development

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Deploy to GitHub Pages

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Create Amal & Surya wedding invitation"
   git push origin main
   ```
2. Open your GitHub repository: **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions** (do NOT select "Deploy from a branch").
4. GitHub Actions will run `.github/workflows/deploy.yml` automatically, compile Vite, and publish your site.

## Multi-Event Invite Variants
The invitation supports separate links for guests invited to specific events:
- `/` or `?invite=all`: Shows both Wedding Ceremony (Aug 30) & Reception (Sept 6).
- `?invite=wedding`: Shows Wedding Ceremony card only.
- `?invite=reception`: Shows Reception card only.
