# Mariam Alharbi Founder Portfolio

Production-ready static website for Mariam Alharbi.

## Project Structure

```text
Mariam-Alharbi-Portfolio-Production/
├── index.html
├── README.md
├── vercel.json
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   ├── ai-config.js
│   ├── app.js
│   └── contact-config.js
└── assets/
    └── images/
        ├── profile-photo.jpg
        ├── mariam-founder-placeholder.png
        ├── hawat-logo.jpg
        ├── step-by-mira-logo.jpg
        └── gallery-ready/
            ├── ruqi-logo.jpg
            ├── muhayya-logo.jpg
            └── smart-warmth-guardian-logo.jpg
```

## Source Files

- `index.html`: Website content and semantic page structure.
- `css/styles.css`: Approved responsive visual design.
- `js/app.js`: Language toggle, navigation, animations, Mariam AI runtime, and contact-form submission behavior.
- `js/ai-config.js`: Mariam AI public knowledge base, privacy-safe routing configuration, and bilingual answers.
- `js/contact-config.js`: Formspree public endpoint configuration and contact-form messages.
- `assets/images/`: Optimized images used by the website and public gallery-ready assets.

The private future-brand logo asset is intentionally excluded from this public deployment package. The public website uses the approved `Q` monogram only.

## Run Locally

From the project folder:

```bash
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173
```

## Contact Form

The contact form is connected to Formspree:

```text
https://formspree.io/f/mykvapbd
```

The Formspree form ID in `js/contact-config.js` is a public endpoint identifier, not a private API key. No secret credentials are stored in the frontend.

Before launch:

1. Sign in to Formspree and confirm the destination email is `mariam.salem.alharbi@gmail.com`.
2. Submit one test message from the deployed site.
3. Confirm the message arrives and the success state appears.

## Deploy With GitHub And Vercel

### 1. Create A GitHub Repository

Create a new empty GitHub repository, for example:

```text
mariam-alharbi-portfolio
```

Do not initialize the remote repository with a README because this package already includes one.

### 2. Push The Source Files

Run these commands from the extracted project folder:

```bash
git init
git add .
git commit -m "Launch Mariam Alharbi founder portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/mariam-alharbi-portfolio.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with the correct GitHub username.

### 3. Import The Repository In Vercel

1. Sign in to [Vercel](https://vercel.com/).
2. Select **Add New...** then **Project**.
3. Import the GitHub repository.
4. Keep **Framework Preset** set to **Other**.
5. Leave **Build Command** empty.
6. Leave **Output Directory** empty.
7. Select **Deploy**.

Vercel will serve `index.html` as the homepage.

### 4. Add A Custom Domain

In the Vercel project:

1. Open **Settings** then **Domains**.
2. Add the preferred domain.
3. Follow the DNS instructions shown by Vercel.
4. Verify both the main domain and the `www` version if both are used.

## Launch Checklist

- Verify the Arabic and English toggle.
- Test the contact form.
- Open every social link.
- Test the Mariam AI suggested questions.
- Check desktop, tablet, and mobile layouts.
- Confirm the public website shows `Q` only for the protected future brand.
