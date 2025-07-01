// import jwt from 'jsonwebtoken';
//
//
// export const generateToken = (res, id)=> {
//     const secret = process.env.JWT_SECRET;
//
//     if (!secret) {
//         throw new Error("JWT_SECRET is not defined in environment variables");
//     }
//
//     const token = jwt.sign({ id }, secret, {
//         expiresIn: '30d',
//     });
//
//     res.cookie('jwt', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//     });
// };


import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET || 'secretkey', {
        expiresIn: '7d'
    });
};
