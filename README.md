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

## 🧠 Future Plans

🔧 Add Firebase Contact Form or email API (Mailcoat/FormSubmit)

🗂️ Develop a resource CMS (notes, past papers, announcements)

📥 File uploads/downloads for students and staff

🎓 Introduce parent portal with weekly test reports

🔒 Staff login for marks, notices, and internal circulars

🧮 Add quiz system with automatic marking (Flask + SQLite)

🌙 Enable Dark Mode toggle for UX bonus

📦 Use GitHub Actions for CI/CD deployments

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

**Built with ❤️ by educators & developers**
