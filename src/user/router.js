import express from 'express';
import passport from 'passport';
import userModel from './model';

import isAuthenticated from '../middlewares/isAuthenticated';

const router = express.Router();

// restrict index for logged in user only
router.get('/me', isAuthenticated, (req, res) => res.send(req.user));

// route for register action
// router.post('/register', auth.doRegister);

// route for login action
router.post('/auth', (req, res) => passport.authenticate('local', { successRedirect: '/user/me' })
    (req, res, function () {
        res.redirect('/');
    }));


// route for logout action
// router.get('/logout', auth.logout);


export default router;