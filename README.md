# 🌐 VEAN Website

VEAN is a modern Internet Service Provider (ISP) based in London, providing high-speed internet solutions for homes and businesses. This website showcases VEAN’s plans, installation booking system, and payment integration.

---

---

## 🧠 Features

- Multi-step onboarding & installation booking form  
- Address validation ready for **Google Maps API**  
- Schedule installation with selectable dates & dynamic time slots  
- Pricing summary and optional equipment upgrades (Standard Router / Pro Mesh System)  
- Payment integrations: Credit Card, Apple Pay, Google Pay, PayPal, Direct Debit  
- Responsive design for desktop and mobile  

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion  
- **Backend:** Node.js / Express (optional integration)  
- **Payment Processing:** Stripe, Apple Pay, Google Pay, PayPal  
- **Deployment:** Vercel / Netlify (optional)  

---

## ⚙️ Installation

Clone the repo:

```bash
git clone https://github.com/error-07/vean.git
cd vean

Install dependencies:

npm install

Run locally:

npm run dev

Open your browser at http://localhost:3000

📂 Project Structure
vean/
 ├── public/              # Static files (images, icons)
 ├── src/
 │   ├── components/      # Reusable UI components
 │   ├── pages/           # React pages / multi-step form
 │   ├── utils/           # Helper functions (e.g., date formatting)
 │   ├── App.jsx          # Main app component
 │   └── index.jsx        # Entry point
 ├── package.json
 └── README.md
