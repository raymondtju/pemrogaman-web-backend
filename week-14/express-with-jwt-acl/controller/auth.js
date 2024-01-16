const permit = (...permitRoles) => {
  return (req, res, next) => {
    const { user } = req.session;
    console.log(permitRoles);

    if (user && permitRoles.includes(user.role)) {
      next();
    } else {
      res.render("forbidden");
    }
  };
};

export { permit };
