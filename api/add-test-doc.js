import 'dotenv/config';
import admin from 'firebase-admin';

const raw = process.env.FIREBASE_SERVICE_ACCOUNT || '{}';
const serviceAccount = JSON.parse(raw);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  try {
    const db = admin.firestore();
    await db.collection('test').add({ createdAt: admin.firestore.FieldValue.serverTimestamp(), note: 'demo' });
    res.status(200).json({ success: true, message: 'Đã thêm document demo' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
