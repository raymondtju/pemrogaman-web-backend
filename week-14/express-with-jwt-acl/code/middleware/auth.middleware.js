import jwt from "jsonwebtoken";

const authUserMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    res.render("forbidden");
  }

  jwt.verify(token, "ngetroll", (err, decoded) => {
    console.log("decoded", decoded);
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.decoded = decoded;

    next();
  });
};

const passMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    next();
  }

  jwt.verify(token, "ngetroll", (err, decoded) => {
    if (decoded) {
      req.decoded = decoded;
      next();
    }
  });
};

export { authUserMiddleware, passMiddleware };
