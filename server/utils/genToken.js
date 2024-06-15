import jwt from 'jsonwebtoken';

const genTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
    res.cookie('token', token, {
        httpOnly: true, // prevent XSS attacks(cross-site scripting attacks)
        maxAge: 15*24*60*60*1000, // 15 days
        sameSite: "strict", // CSRF attacks(cross-site request forgery attacks)
        secure: process.env.NODE_ENV!=="dev" // HTTPS only
    });
    return token;
}

export default genTokenAndSetCookie;