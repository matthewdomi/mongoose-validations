const jwt = require("jsonwebtoken");
exports.authRequired = (res, req, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(402).json({ error: "Please login" });
  }

  // const token = authorization.split("Bearer")[0]
  const token = authorization.split("")[1];
  if (!token) {
    return res.status(402).json({ error: "Please  login" });
  }

  const user = jwt.verify(
    token,
    "65376e8194b7d7f8a3f4bfda38aa5ac0a6e3b06c6c767442a894b70e328b66d8"
  );
  req.user = user;
  
  next();
};
