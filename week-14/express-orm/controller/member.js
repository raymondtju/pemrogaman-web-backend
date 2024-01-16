import { member } from "../model/index.js";

const login = async (req, res, next) => {
  const { error, user } = req.session;
  res.render("login", {
    message: error,
  });
};

const logout = async (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

const auth = async (req, res, next) => {
  const { name, password } = req.body;

  console.log(name, password);

  try {
    const fmember = await member.findOne({
      where: {
        name,
        password,
      },
    });
    console.log(fmember);

    if (fmember) {
      req.session.user = fmember;
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
