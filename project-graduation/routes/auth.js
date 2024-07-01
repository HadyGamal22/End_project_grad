const router = require('express').Router();
const passport = require('passport');

// Check login success
router.get('/login/success', (req, res) => {
	console.log("success");
	if (req.user) {
		res.status(200).json({
			error: false,
			message: 'Successfully Logged In',
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: 'Not Authorized' });
	}
});

// Check login failure
router.get('/login/failed', (req, res) => {
	console.log("failed"); 
	res.status(401).json({
		error: true,
		message: 'Log in failure',
	});
});

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

// Handle Google OAuth callback
router.get('/google/callback', 
	passport.authenticate('google', {
		successRedirect: 'http://localhost:3000/pages/main',
		failureRedirect: 'http://localhost:3000',
	})
);

// Logout and redirect
router.get('/logout', (req, res) => {
	req.logout(() => {
        res.redirect(process.env.CLIENT_URL);
    });
});

module.exports = router;
