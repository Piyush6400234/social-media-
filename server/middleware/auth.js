import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  console.log("verify");
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log("token", token);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("verified")

    next();
  } catch (e) {
    console.log("errorsss");
    res.status(500).json({ error: e.message });
  }
};
