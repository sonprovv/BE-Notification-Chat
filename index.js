import express from "express";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const app = express();
const port = 3000;

// Parse service account từ biến môi trường
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Route test kết nối Firebase
app.get("/check-firebase", async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection("test").get();

    res.json({
      success: true,
      count: snapshot.size,
      message: `Tìm thấy ${snapshot.size} document trong collection 'test'`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
