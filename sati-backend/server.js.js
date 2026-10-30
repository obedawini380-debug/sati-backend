const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let users = []; // Database in memory (will keep all accounts)
let otps = {}; // Save OTPs

// Create Account Step 1 - Send OTP (fake 0000 for now)
app.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  const otp = "0000"; // TEST OTP - everyone uses 0000
  otps[phone] = otp;
  console.log(OTP for ${phone}: ${otp});
  res.json({ success: true, message: "OTP is 0000 for testing", otp: otp });
});

// Create Account Step 2 - Verify OTP + Save User
app.post('/verify-otp', (req, res) => {
  const { name, age, location, phone, otp } = req.body;
  if (otps[phone] !== otp) {
    return res.json({ success: false, message: "Wrong OTP. Use 0000" });
  }
  const newUser = { id: users.length + 1, name, age, location, phone, img: https://i.pravatar.cc/400?u=${phone} };
  users.push(newUser);
  res.json({ success: true, user: newUser });
});

// Get all users - so everyone sees each other
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/', (req, res) => res.send('SATI Backend Running - Ghana'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server on ' + PORT));