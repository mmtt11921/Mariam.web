# Mariam Alharbi Founder Website V4

Production-ready interactive founder journey for Mariam Alharbi.

## Project Structure

```text
Mariam.web/
├── index.html
├── learning-archive.html
├── README.md
├── vercel.json
├── .gitignore
├── css/
│   ├── archive.css
│   └── styles.css
├── js/
│   ├── ai-config.js
│   ├── archive.js
│   ├── app.js
│   └── contact-config.js
└── assets/
    └── images/
        ├── profile-photo.jpg
        ├── founder-hero-scene.png
        ├── hawat-logo.jpg
        ├── step-by-mira-logo.jpg
        └── gallery-ready/
            ├── ruqi-logo.jpg
            ├── vision-concept-logo.jpg
            └── innovation-concept-logo.jpg
```

## Source Files

- `index.html`: Website content and semantic page structure.
- `learning-archive.html`: Searchable and filterable learning archive.
- `css/styles.css`: Responsive Founder V4 visual system, cinematic depth, journey storytelling, premium motion, and mobile-first layouts.
- `css/archive.css`: Learning Archive page layout and responsive styles.
- `js/app.js`: Language toggle, navigation, animations, Mariam AI runtime, and contact-form submission behavior.
- `js/archive.js`: Learning Archive filters, search, and language switching.
- `js/ai-config.js`: Mariam AI public knowledge base, privacy-safe routing configuration, and bilingual answers.
- `js/contact-config.js`: Formspree public endpoint configuration and contact-form messages.
- `assets/images/`: Optimized images used by the website and public gallery-ready assets.

Private future-venture assets and names are intentionally excluded or generalized in this public deployment package.

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
