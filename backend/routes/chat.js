const express = require('express');
const router = express.Router();
const axios = require('axios');


// POST /api/chat
router.post('/', async (req, res) => {
const { message } = req.body;
if (!message) return res.status(400).json({ msg: 'Message is required' });


try {
// Example using OpenAI REST API v1/chat/completions
const resp = await axios.post(
'https://api.openai.com/v1/chat/completions',
{
model: 'gpt-4o-mini',
messages: [{ role: 'user', content: message }],
max_tokens: 800
},
{
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
}
}
);


const reply = resp.data.choices[0].message.content;
res.json({ reply });
} catch (err) {
console.error(err?.response?.data || err.message);
res.status(500).json({ msg: 'AI error', error: err?.response?.data || err.message });
}
});


module.exports = router;