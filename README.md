<div align="center">

# 🛡️ API Whitelist Manager

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/ichanzx1-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/ichanzx1)

<img url="https://i.pinimg.com/1200x/25/de/08/25de085a05af6384183245b514943133.jpg">

*A sleek and simple system to manage authorized access to your APIs efficiently.*

</div>

---

## 🧠 **In My Mind...**

The **API Whitelist Manager** was born out of a need for a lightweight, easy-to-deploy solution to control access to specific endpoints or services based on user identifiers (like phone numbers, IDs, etc.). It’s built with **simplicity**, **speed**, and **security** as the core pillars. Whether you're managing access for a WhatsApp bot or any other service, this tool ensures that only the right people get in.

## ✨ **Key Features**

- 🚀 **Lightning Fast**: Built on Node.js and Express.js for maximum performance.
- 🛠️ **Seamless Management**: Simple REST API to add, view, or remove users from the whitelist.
- ☁️ **Vercel Ready**: Pre-configured with `vercel.json` for one-click deployment.
- 🎨 **Modern Interface**: Includes a dashboard for visual management.
- 📦 **JSON Based**: No complex databases required – data is stored in a clean, portable JSON format.

## 🚀 **Quick Start**

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/ichanzx1/API-Whitelist.git
   cd API-Whitelist
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

### **API Endpoints**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/whitelist` | Get the list of all whitelisted users. |
| `POST` | `/api/whitelist` | Add a new user to the whitelist. |
| `DELETE` | `/api/whitelist/:index` | Remove a user from the whitelist by index. |

---

## 🛠️ **Usage Example**

**Adding a user to the whitelist:**
```bash
curl -X POST http://localhost:3000/api/whitelist \
     -H "Content-Type: application/json" \
     -d '{"number": "6285XXXXXXXXX"}'
```

**Getting the whitelist:**
```bash
curl http://localhost:3000/api/whitelist
```

---

## 🔒 **Deployment**

This project is fully compatible with **Vercel**. To deploy, simply push your code to GitHub and link it to your Vercel account. The included `vercel.json` handles all the routing for you.

---

## ❤️ **Copyright & Credits**

Made with ❤️ by [**ichanzx1**](https://github.com/ichanzx1).

© 2026 ichanzx1. This project is licensed under the **MIT License**.

<div align="right">

*Think smart, build fast.* 🚀

</div>
