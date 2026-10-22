# Tisha Patience Malongo — Developer Portfolio

A modern, dark-themed developer portfolio built with **Python**, **Django**, **Tailwind CSS**, **HTML**, and **CSS**. Features a light/dark mode toggle, animated hero section, skill tags, project showcase with image uploads, and a working contact form — all managed via Django admin.

---

## Features

- Light / dark mode toggle (preference saved in browser)
- Typing hero animation
- Scroll-reveal animations
- Skill tags by category (no progress bars — clean and honest)
- Dynamic project cards with image support (managed via Django admin)
- Contact form that saves messages to the database and sends email
- Django admin panel to manage all content
- Secrets managed with `python-decouple` (no passwords in code)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python, Django |
| Frontend | HTML5, Tailwind CSS (CDN), Vanilla JS |
| Database | SQLite (dev) |
| Styling | Inter font, CSS custom properties |
| Package manager | uv |
| Deployment | PythonAnywhere |

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Tisha-patience/portfolio.git
cd portfolio
```

### 2. Install uv (if you don't have it)

```bash
pip install uv
```

### 3. Create and activate the virtual environment

```bash
uv venv
source .venv/Scripts/activate   # Windows (Git Bash)
source .venv/bin/activate        # macOS / Linux
```

### 4. Install dependencies

```bash
uv sync
```

### 5. Set up environment variables

Create a `.env` file in the project root:

```
SECRET_KEY=your-django-secret-key
DEBUG=True
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
```

> Never commit `.env` to GitHub — it is already in `.gitignore`.

### 6. Run migrations

```bash
uv run manage.py migrate
```

### 7. Create an admin user

```bash
uv run manage.py createsuperuser
```

### 8. Run the development server

```bash
uv run manage.py runserver
```

Visit **http://127.0.0.1:8000** to see the portfolio.
Visit **http://127.0.0.1:8000/admin** to manage content.

---

## Managing Content

### Projects
Go to `/admin` → Projects → Add Project.
- Set **Featured = True** for the top 3 (shown as cards with images)
- Other projects appear as a compact list below
- Upload a project image directly from the admin panel

### Skills
Go to `/admin` → Skills → Add Skill.
Categories: `languages`, `frameworks`, `tools`, `databases`

### Contact messages
Go to `/admin` → Contact Messages to read and manage messages sent through the contact form.

---

## Email Setup

To receive real emails from the contact form, add your Gmail SMTP credentials to `.env`:

```
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=your-16-character-app-password
```

Generate a Gmail App Password at: Google Account → Security → App Passwords.

---

## Deploying to PythonAnywhere

Before deploying, export a `requirements.txt` from uv:

```bash
uv export --no-hashes > requirements.txt
```

Then follow the standard PythonAnywhere Django deployment guide.

---

## Project Structure

```
portfolio/
├── config/
│   ├── settings.py       # Project settings (reads from .env)
│   ├── urls.py
│   └── wsgi.py
├── core/
│   ├── models.py         # Project, Skill, ContactMessage
│   ├── views.py          # Single home view
│   ├── forms.py          # ContactForm
│   ├── admin.py          # Admin configuration
│   └── urls.py
├── templates/
│   └── core/
│       └── home.html     # Main template
├── static/
│   ├── css/style.css     # Custom styles + light mode
│   ├── js/main.js        # Animations & interactions
│   └── images/           # Profile photo
├── media/                # Uploaded project images
├── .env                  # Secrets (never commit this)
├── .gitignore
├── pyproject.toml        # uv dependencies
├── manage.py
└── seed_data.py          # Optional sample data loader
```
