# 🏫 NCPSS School Website

Welcome to the official digital platform of **North City Public Secondary School (NCPSS)** — a forward-thinking, tech-empowered educational institution committed to concept-based learning and innovation.

---

## 🚀 Key Features

- ⚡️ Built with **HTML**, **TailwindCSS**, and **Vanilla JS**
- 🔐 Flask-compatible structure with `url_for()` routing
- 🌐 PWA-enabled: installable on mobile and desktop
- 📴 Works offline via Service Worker + custom fallback page
- 💻 Fully responsive layout for all screen sizes
- 📁 Clean, modular folder structure
- 🔍 SEO optimized with meta tags and schema
- 📲 Manifest-based app installation (Add to Home Screen support)

---

## 📂 Project Folder Structure

<details>
<summary>Click to expand</summary>

```plaintext
/
├── auth/
│   └── routes.py
├── database/
│   ├── init_db.py
│   └── school.db
├── models/
│   └── users.py
├── static/
|   ├── assets/
│   |   ├── images/
│   |   ├── icons/
│   |   ├── logos/
│   |   └── Other-Institutes/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── pwa/
│   |   ├── service-worker.js
│   |   └── offline.html
|   └──manifest.json
├── templates/
│   ├── pages/
│   |   ├── admission.html
│   |   ├── introduction.html
|   |   ├── login_staff.html
|   |   ├── login_student.html
│   |   └── ... more internal pages  (optionals i.e. to add more if applicable)
|   ├── components/
│   |   ├── navbar.html
│   |   ├── footer.html
│   |   └── ... reusable UI sections (optionals i.e. to add more if applicable)
|   └── index.html
└── app.py

```

## 🧠 Future Plans

- Add Firebase integration for contact forms
- Expand CMS for admin uploads (notes, schedules)
- Enable auto-deployment via CI/CD (GitHub Actions or Netlify)

---

**Built with ❤️ by educators & developers**
