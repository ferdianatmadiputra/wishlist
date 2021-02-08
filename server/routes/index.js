const router = require('express').Router();
const Controller = require('../controllers/controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');


router.post('/register', Controller.postRegister);
router.post('/login', Controller.postLogin);
router.use(authenticate)
router.get('/wishlists', authorize, Controller.getWishlists);
router.post('/wishlists', authorize, Controller.postWishlists);
router.delete('/wishlists/:id', authorize, Controller.delWishlists);

module.exports = router;