
# 🎥 YouTube Clone – Node.js Backend

A fully-featured backend for a YouTube Clone application developed using **Node.js**, following best practices in architecture, security, and modularity. This backend powers essential features such as video streaming, commenting, liking, subscriptions, playlists, and user management.



## 🚀 Live Deployment

View Project(`frontend` is under-developement  ) : [View](https://kartikmpatelyoutubeclone.netlify.app/)

Backend API is live on: [View](https://youtube-clone-mitq.onrender.com)
<br>
Frontend Repository : [View](https://github.com/kartikMpatel-Git-Hub/youtube_clone_react)




## 📦 Features

### 👥 User & Auth
- User registration and login with JWT
- Profile update and retrieval
- Password hashing using bcrypt

### 📹 Video Management
- Upload videos and thumbnails via **Multer** and **Cloudinary**
- Fetch, update, and delete videos
- Count views and filter/search by tags or categories

### 💬 Comment System
- Add, edit, and delete comments on videos
- Fetch all comments for a video

### ❤️ Likes
- Like/Unlike videos
- Track total likes and dislikes

### 📃 Playlists
- Create, update, delete playlists
- Add/remove videos from playlists

### 🔔 Subscriptions
- Subscribe/unsubscribe to channels

### 🐦 Tweets (Micro-posts)
- Post short messages (like tweets)
- Timeline of posts for users

### 📊 Dashboard
- Admin-level statistics and insights
- Models and controllers specifically for dashboard analytics

---

## 🔒 Middleware

- **Authentication**: JWT-based secure access
- **Multer**: Handles multipart form data for uploads
- **Cloudinary**: Stores video files and thumbnails securely

---

## 🛠️ Technologies Used

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Multer** for file handling
- **Cloudinary** for media hosting
- **Render** for backend deployment

---

## 🧪 API Documentation

Each model is paired with a corresponding controller and router. A full Postman collection or Swagger documentation is recommended to explore available endpoints.

| Model         | Router Path        |
|---------------|--------------------|
| User          | `/api/users`       |
| Video         | `/api/videos`      |
| Comment       | `/api/comments`    |
| Like          | `/api/likes`       |
| Playlist      | `/api/playlists`   |
| Subscriptions | `/api/subs`        |
| Tweet         | `/api/tweets`      |
| Dashboard     | `/api/dashboard`   |

---

## 🧾 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/kartikMpatel-Git-Hub/youtube_clone.git
cd youtube_clone
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file in the root directory with the following:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the application

```bash
npm start
```

---

## 📂 Deployment

The backend is deployed using **Render**. Configure environment variables and use the start command `npm start` in your Render dashboard.

---

## 🧑‍💻 Author

**Kartik Patel**

📧 Contact: [kartikpatel7892@gmal.com](mailto:kartikpatel7892@gmal.com)

🔗 LinkedIn: [https://www.linkedin.com/in/kartikmpatel/](https://www.linkedin.com/in/kartikmpatel/)

---
