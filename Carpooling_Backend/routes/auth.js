const express = require('express'); // Importing express
const router = express.Router(); // Creating a router
const { signup, login, changePassword } = require('../controllers/loginSignUpController');
const upload = require("../utils/multer"); 
const authMiddleware = require('../middlewares/auth-middleware'); 

router.post('/signup', upload.single("profilePicture"), signup); 
router.post('/login', login); 
router.post('/change-password', changePassword);

module.exports = router; 