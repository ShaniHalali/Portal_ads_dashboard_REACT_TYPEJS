# 🎯 Ads Dashboard Portal

This is a **React + TypeScript dashboard portal** built with Vite, allowing administrators to view and create location based ads, track ad performance, and monitor user interactions in a clear and intuitive UI.

📊 The portal includes:
- Stats overview (views, clicks, full views,total click through rate)
- Line and pie charts (using `recharts`)
- Top 3 clicked ads
- Admin only ad creation form

---

## 🌐 Live Deployment

This project is **deployed on Vercel** and continuously updated from the `main` branch in this GitHub repository.

🔗 **Live link**: [https://portal-ads-dashboard-react-typejs.vercel.app/)  

---

## 🚀 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Charts**: Recharts
- **HTTP**: Axios
- **Routing**: React Router v6
- **Deployment**: Vercel

---

## 🛡️ Admin Protection

Creating new ads requires entering a password (`CreateAd1234`).  
Only users who provide the correct password can access the ad creation form.

---

## 📁 Folder Structure

```
src/
├── components/        # Reusable UI components (charts, cards, etc.)
├── pages/             # Dashboard & Ad Creation pages
├── App.tsx            # Main routes
└── main.tsx           # App entry point
```
![image](https://github.com/user-attachments/assets/38930ac7-865e-4fab-a93b-924a1958403f)

![image](https://github.com/user-attachments/assets/77a02034-406c-428c-9e4c-4105b6f8d604)

![image](https://github.com/user-attachments/assets/21a0bb44-71ba-493e-b28f-81608980faa5)





