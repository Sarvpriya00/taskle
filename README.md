```
# 📝 Taskle – Smart Task Management Dashboard

Taskle is a modern, full-stack task management web application built with **Next.js 14 App Router**, **Tailwind CSS**, **Prisma**, and **NextAuth**. It allows users to efficiently manage their tasks with features like category-based organization, task completion tracking, and data visualization through charts.

---

## ✨ Features

- ✅ **User Authentication** with `NextAuth.js` using credentials
- 📂 **Category-based task organization** (`Project1`, `Project2`, `Work`, `Personal`, `Other`)
- ⏳ **Track today's tasks** with completion vs. remaining charts
- 📊 **Overall task analytics** with interactive bar charts
- 📅 **Due date picker** using a custom calendar UI
- 🔁 **Real-time UI updates** on adding or completing tasks
- 🌓 **Dark mode support** (fully Tailwind CSS powered)
- 💡 **Resizable layout** with a dedicated sidebar and dynamic panels
- 🔐 All data is tied to authenticated users only

---

## 🧱 Tech Stack

- **Frontend**: React, Next.js 14 (App Router), Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Prisma ORM with SQLite/PostgreSQL
- **Auth**: `next-auth` with `CredentialsProvider`
- **Charts**: Recharts with custom Tailwind integration
- **UI Components**: ShadCN, custom sidebar, card, popover, select, checkbox, and more

---

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/taskle.git
   cd taskle
```

1. **Install dependencies**

```
npm install
```

1. 
2. **Setup environment variables**
    
    Create a .env file in the root and add the following:
    

```
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
```

1. 
2. **Run Prisma migration**

```
npx prisma migrate dev --name init
```

1. 
2. **Start the development server**

```
npm run dev
```

---

## **📁 Project Structure**

```
src/
│
├── app/
│   ├── dashboard/          # Main dashboard UI
│   ├── api/
│   │   └── todos/          # CRUD routes for tasks
│   │   └── auth/           # NextAuth config
│
├── components/             # UI components (cards, buttons, charts, etc.)
├── lib/                    # Utility functions (e.g., classNames)
├── styles/                 # Tailwind/global CSS
```

---

## **📸 Screenshots**

### **Dashboard Overview**

---

## **💬 Contributing**

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

---

## **🙋‍♂️ Author**

Developed with ❤️ by **Sarvpriya Adarsh**

📍 Lucknow, India

```
---

Let me know if you'd like a Hindi version or need help publishing this on GitHub or Netlify!
```
