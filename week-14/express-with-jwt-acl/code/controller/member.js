import jwt from "jsonwebtoken";
import { member } from "../model/index.js";

const login = async (req, res, next) => {
  if (req.session.user || req.decoded) {
    res.redirect("/");
  }

  const { error, user } = req.session;
  res.render("login", {
    message: error,
  });
};

const logout = async (req, res, next) => {
  req.session.destroy();
  res.cookie("accessToken", "", { maxAge: 0 });
  res.redirect("/");
};

const auth = async (req, res, next) => {
  const { name, password } = req.body;
  // console.log(name, password);

  try {
    const fmember = await member.findOne({
      where: {
        name,
        password,
      },
    });

    const pmember = JSON.parse(JSON.stringify(fmember));
    // console.log(pmember);
    if (pmember) {
      const sign = jwt.sign(
        {
          name: pmember.name,
          role: pmember.role,
        },
        "ngetroll"
      );
      req.session.user = pmember;
      res.cookie("accessToken", sign, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });
      res.redirect("/");
    } else {
      req.session.error = "Invalid name or password";
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    req.session.error = "Internal Server Error";
    res.redirect("/login");
  }
};

export { login, logout, auth };
