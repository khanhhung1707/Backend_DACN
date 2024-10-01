
import jwt from 'jsonwebtoken'

export const createToken = (data) => {
    return jwt.sign({ data: data }, "DACN_HUNGHAU", { algorithm: "HS256", expiresIn: "5m" }) 
}

export const verifyToken = (token) => {

    try {
        return jwt.verify(token, "DACN_HUNGHAU");
    } catch (error) {
        return error;
    }
}

// xử lý refresh token
export const createTokenRef = (data) => {

    return jwt.sign({ data: data }, "RESET", { algorithm: "HS256", expiresIn: "7d" })
}

export const verifyTokenRef = (token) => {
    try {
        return jwt.verify(token, "RESET");
    } catch (error) {
        return error;
    }
};

//giải mã
export const decodeToken = (token) => {
    return jwt.decode(token)
}

export const middleWareToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        console.log('Token is missing');
        return res.status(401).send('Token is missing');
    }

    const checkToken = verifyToken(token);

    if (checkToken instanceof Error) {
        console.log('Token verification error:', checkToken.message);
        return res.status(401).send(checkToken.message);
    }

    console.log('Token is valid:', checkToken);
    req.user = checkToken.data;
    next();
};