# 👩‍💻 Tahmina Tanjida Miti — Portfolio

A modern, fast, and fully responsive portfolio website built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **ShadcnUI**.  
This portfolio showcases blogs, projects, skills, and provides an interactive way to explore for users. 

# 🌐 Live Link
[https://tahmina-tanjida-miti-portfolio.vercel.app/](https://tahmina-tanjida-miti-portfolio.vercel.app/)


## 🚀 Features

### 🔐 Authentication & Authorization
- Use JWT-based authentication.
- 🎯 Role-Based Route Protection with Next.js middleware

### ✨ Modern UI & Professional Design
- SEO Friendly
- Resume support
- React Quill for rich text editor
- Responsive for **mobile**, **tablet**, and **desktop**
- Smooth interective experience

### 🌓 Theme Support
- Dark/Light theme switching

---

# 🛠️ Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS + ShadcnUI**
- **React Hook Form + Zod** for validation
- **React Quill** for rich text editor
- **Sonner** for toast notifications
- **Next Cloudinary** Upload/View thumbnail (stored on Cloudinary)
- **Emailjs** Send Email for contact form (using emailjs)
- **Recharts** for analytics charts
- **Vercel** for deployment

---

# 📁 Project Structure

```txt
app/
├── actions/
├── app/
├── components/
├── helpers/
├── lib/
├── providers/
├── public/
├── services/
├── types/
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json

```

## 🔍 Notes

- Frontend is a Next.js App Router project
- Includes ShadcnUI, Tailwind, actions, providers, services, and lib structure
- Very clean and modular

## 🧑‍💻 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository.
### 2. Install the necessary dependencies.
### 3. Configure Environment Variables.
### 4. Run the application.


## 📡 API Endpoints

### Users
- `POST /api/v1/user` Register a new user
- `GET /api/v1/user` Get all users
- `GET /api/v1/user/:id` Get single user
- `PATCH /api/v1/user/:id` Update user
- `DELETE /api/v1/user/:id` Delete user
---


### Auth
- `POST /api/v1/auth/login` Login Credentials
- `POST /api/v1/auth/google` Login with Google
---

### Blogs
- `POST /api/v1/post` Register a new blog
- `GET /api/v1/post` Get all blogs
- `GET /api/v1/post/stats` Get blogs stats for admin
- `GET /api/v1/post/:id` Get single blog
- `PATCH /api/v1/post/:id` Update blog
- `DELETE /api/v1/post/:id` Delete blog
---
### Projects
- `POST /api/v1/project` Register a new project
- `GET /api/v1/project` Get all projects
- `GET /api/v1/project/stats` Get projects stats for admin
- `GET /api/v1/project/:id` Get single project
- `PATCH /api/v1/project/:id` Update project
- `DELETE /api/v1/project/:id` Delete project
---

## 🧹 Code Quality
- TypeScript interfaces for type safety.
- Centralized error handling.

## ✅ Status
Project is functional and under active development.