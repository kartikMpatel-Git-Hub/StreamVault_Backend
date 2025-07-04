<h1>
  <picture>
    <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3ac/512.webp" type="image/webp">
    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3ac/512.gif" alt="🎬" width="50" height="50">
  </picture> Stream Vault – Node.js Backend
</h1>


[![Typing SVG](https://readme-typing-svg.demolab.com?font=Pacifico&size=85&pause=90&color=F38181&center=true&vCenter=true&random=false&width=1900&height=160&lines=Welcome+to+Stream+Vault+Backend+Repo;Powering+Modern+Video+Streaming+with+Node.js)](https://git.io/typing-svg)

A fully-featured backend for **Stream Vault**, a modern video streaming platform inspired by YouTube, developed using **Node.js**. This backend follows best practices in **architecture**, **security**, and **modularity**, enabling seamless support for core features like:

<picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3ac/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3ac/512.gif" alt="🎬" width="20" height="20">
</picture> Video Streaming <br>
🧑‍💻 User Auth <br> 
💬 Comments <br> 
<picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.gif" alt="❤" width="20" height="20">
</picture> Likes <br>
📂 Playlists <br>
<picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f514/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f514/512.gif" alt="🔔" width="20" height="20">
</picture> Subscriptions <br>
🔁 History 

---

  <h2>
  <picture>
    <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp" type="image/webp">
    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif" alt="🚀" width="32" height="32">
  </picture>
  Live Deployment  
  </h2>
  
<picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30f/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30f/512.gif" alt="🌏" width="20" height="20">
</picture> Frontend (`React` - under development): [View](https://streamvaultstreaming.netlify.app/) <br><br>
<picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30f/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f30f/512.gif" alt="🌏" width="20" height="20">
</picture> Backend (Node.js - live): Render <br><br>

<picture>
  <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/2699_fe0f/512.webp" type="image/webp">
  <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2699_fe0f/512.gif" alt="⚙" width="20" height="20">
</picture> Frontend Repository: [GitHub](https://github.com/kartikMpatel-Git-Hub/StreamVault_Frontend)

---

<h2>
  <picture>
    <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f381/512.webp" type="image/webp">
    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f381/512.gif" alt="🎁" width="32" height="32">
  </picture> Features  
</h2>

### 👥 User & Authentication
- 🔐 JWT-based login and registration
- 🔄 Profile management
- 🔑 Password hashing with bcrypt

### 📹 Video Management
- 📤 Upload videos & thumbnails (Multer + Cloudinary)
- ✏️ Update / Delete / Fetch videos
- 👀 View counting
- 🔍 Search video

### 💬 Comment System
- 💬 Add, delete comments
- 📥 Fetch comments per video

### ❤️ Likes
- ❤️ Like 
- 📊 Track total likes

### 📃 Playlists
- ➕ Create and manage playlists
- 🎬 Add or remove videos

### 🔔 Subscriptions
- 🔔 Subscribe / 🚫 Unsubscribe to channels

<!--### 🐦 Tweets
- 🐤 Micro-blog posts (like tweets)
- 🧵 User timelines-->

---

## 🔒 Middleware

- 🔐 **JWT Authentication**
- 📤 **Multer** for file uploads
- ☁️ **Cloudinary** for media storage

---

## 🛠️ Tech Stack

| Category | Tech |
|---------|------|
| 🧠 Backend | <img src = "https://skillicons.dev/icons?i=nodejs" width="45" height="45" alt="aws" title="NodeJS"/> <img src="https://skillicons.dev/icons?i=express" width="45" height="45" alt="Express.js" title="Express.js" /> |
| 🛢️ Database | <img src="https://skillicons.dev/icons?i=mongodb" width="45" height="45" alt="MongoDB" title="MongoDB" /> <img src="https://github.com/LelouchFR/skill-icons/blob/main/assets/mongoose.svg" width="45" height="45"/> |
| 🔐 Auth | <img src="https://github.com/LelouchFR/skill-icons/blob/main/assets/jwt-auto.svg" width="45" height="45"/> |
| 📤 File Upload | Multer |
| ☁️ Cloud Storage | Cloudinary |
| 🧪 API Testing | <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Postman.svg" width="45" height="45" alt="Postman" title="Postman"> |
| 🌐 Deployment | <img src="https://github.com/LelouchFR/skill-icons/blob/main/assets/render-auto.svg" width="45" height="45"/>|

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/kartikMpatel-Git-Hub/StreamVault_Backend.git
cd youtube_clone
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start the development server

```bash
npm start
```

---

## 📡 Deployment

🚀 Deployed on [**Render**](https://render.com).
Set environment variables and use `npm start` as the deployment command.

---

## 📬 Contact

**Kartik Patel**
📧 Email: [kartikpatel7892@gmail.com](mailto:kartikpatel7892@gmail.com)
🔗 LinkedIn: [linkedin.com/in/kartikmpatel](https://www.linkedin.com/in/kartikmpatel/)

---

## ⭐ Show Some Love

If you liked this project, feel free to ⭐ star the repo and fork it!

> Built with ❤️ by Kartik Patel

---

