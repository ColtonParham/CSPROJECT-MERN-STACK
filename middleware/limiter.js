rateLimit = require('express-rate-limit')

const globalLimiter = rateLimit({
	windowMs: 10 * 60 * 1000,   // 10 minute window
	limit: 1000,				// No more than 100 requests per minute
	legacyHeaders: false
});

const loginLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,	// 5 minute window
	limit: 10,
	handler: (req, res) => {
		res.status(429).json({"message": "Too many login attempts! Please try again in a few minutes"})
	},
	skipSuccessfulRequests: true,
	keyGenerator: (req, res) => req.body.user,
	legacyHeaders: false
});

const uploadLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,	// 5 minute window
	limit: 10,
	handler: (req, res) => {
		res.status(429).json({"message": "Too many file uploads! Please try again in a few minutes"})
	},
	keyGenerator: (req, res) => req.user,	// User should be authenticated by this point, allowing rate limiting per user
	legacyHeaders: false
})

module.exports = { globalLimiter, loginLimiter, uploadLimiter }