// ดึงไลบรารีที่จำเป็นมาใช้งาน
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
// กำหนด Port ให้ Railway จัดการ หรือใช้ 3000 ถ้ารันบนเครื่องตัวเอง
const PORT = process.env.PORT || 3000;

// หน้าแรกของเว็บ (แสดงผลเป็น HTML ง่ายๆ)
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>🚀 ระบบรันทำงานปกติ!</h1>
            <p>นี่คือเว็บ Node.js ที่ทำงานอยู่บน Railway</p>
            <a href="/api/data" style="padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 5px;">คลิกเพื่อดูข้อมูล JSON</a>
        </div>
    `);
});

// หน้า API สำหรับดึงข้อมูลจากไฟล์ data.json
app.get('/api/data', (req, res) => {
    const dataPath = path.join(__dirname, 'data.json');
    // อ่านไฟล์ JSON
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: "ไม่สามารถอ่านข้อมูลได้" });
            return;
        }
        // ส่งข้อมูลกลับไปเป็นรูปแบบ JSON
        res.json(JSON.parse(data));
    });
});

// สั่งให้เซิร์ฟเวอร์เริ่มทำงาน
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});