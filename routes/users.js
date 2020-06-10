const express = require('express');  
const router = express.Router();  

const users = require('../controllers/users')
const auth = require('../controllers/auth')


module.exports = () => {
    
}

router.route('/new')
    .post(users.register)
router.route('/login')
    .post(users.login)
router.route('/logout')
    .post(users.logout)
router.route('/me')
    .post(auth.required, users.me)
// router.route('/get/:id')
//     .get(users.grabUser)

// router.route('/put')    
//     .get(users.putUser)

// router.route('/put/:username?/:avatar?')
//     .get(users.putUser)



module.exports = router;