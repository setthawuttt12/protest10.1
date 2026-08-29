const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token or missing Authorization header' })
    }

    const token = authHeader.split(' ')[1]

    try {
        req.user = jwt.verify(token, JWT_SECRET)
        next()
    } catch (error) {
        console.error('Invalid token', error)
        return res.status(403).json({ message: 'Invalid token' })
    }
}

exports.requireRole = (role) => (req, res, next) => {
    try {
        if (req.user && req.user.role === role) {
            return next()
        }
        return res.status(403).json({ message: 'Invalid role' })
    } catch (error) {
        console.error('Invalid role', error)
        return res.status(403).json({ message: 'Invalid role' })
    }
}