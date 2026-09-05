const express = require('express');
const router = express.Router();
const { askChatbot, getChatLogs } = require('../controllers/chatbot.controller');
const { requireAuth } = require('../middleware/auth.middleware');

router.post('/chatbot', askChatbot);
router.get('/admin/chat-logs', requireAuth, getChatLogs);

module.exports = router;
