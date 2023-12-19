import express from "express";
import mysql2 from "mysql2";
import bcrypt from "bcryptjs";

// bad request error
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = message;
  }
}

// database connection
const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "week8-teori",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL Server!");
  }
});

// custom func query (with error handling cause it annoying)
const dbQuery = (sql, next, cb) => {
  connection.query(sql, (err, result) => {
    try {
      if (err) {
        throw new Error(err);
      }
      cb(result);
    } catch (error) {
      next(error);
    }
  });
};

// express app and its middlewares
const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

// auth router
const authRouter = express.Router();
authRouter.post("/signup", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new BadRequestError("Username, email, and password are required!");
    }

    const checkQuery = `SELECT * FROM users WHERE username = '${username}'`;
    const checkResult = await new Promise((resolve, reject) => {
      connection.query(checkQuery, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    if (checkResult.length > 0) {
      throw new BadRequestError("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const query = `INSERT INTO users (username, email, password, active) VALUES ('${username}', '${email}', '${hashedPassword}', 0)`;

    dbQuery(query, next, () => {
      res.json({
        statusCode: 200,
        error: null,
        data: {
          username,
          email,
        },
      });
    });
  } catch (error) {
    next(error);
  }
});
// login and activate account
authRouter.post("/signin", (req, res, next) => {
  try {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    connection.query(query, async (err, result) => {
      try {
        if (err) {
          throw new Error(err);
        }
        if (result.length === 0) {
          throw new BadRequestError("Username not found");
        }
        const user = result[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new BadRequestError("Wrong password");
        }
        if (user.active === 0) {
          const queryUpdate = `UPDATE users SET active = 1 WHERE id = ${user.id}`;

          dbQuery(queryUpdate, next, () => {
            return res.json({
              statusCode: 200,
              error: null,
              data: {
                username,
                active: 1,
              },
            });
          });
        }
        const { password: _, ...rest } = user;
        return res.json({
          statusCode: 200,
          data: rest,
        });
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
});
// update username
authRouter.put("/user/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { password, newUsername } = req.body;

    const checkQuery = `SELECT * FROM users WHERE username = '${newUsername}'`;
    const checkResult = await new Promise((resolve, reject) => {
      connection.query(checkQuery, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
    if (checkResult.length > 0) {
      throw new BadRequestError("Username already exists");
    }

    const query = `SELECT * FROM users WHERE id = ${user_id}`;
    connection.query(query, async (err, result) => {
      try {
        if (err) {
          throw new Error(err);
        }
        if (result.length === 0) {
          throw new BadRequestError("User not found");
        }
        const user = result[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new BadRequestError("Wrong password");
        }
        const updateQuery = `UPDATE users SET username = '${newUsername}' WHERE id = ${user_id}`;
        dbQuery(updateQuery, next, () => {
          res.json({
            statusCode: 200,
            error: null,
            data: {
              newUsername,
            },
          });
        });
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
});
// delete user by id
authRouter.delete("/user/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE id = ${user_id}`;

    connection.query(query, async (err, result) => {
      try {
        if (err) {
          throw new Error(err);
        }
        if (result.length === 0) {
          throw new BadRequestError("User not found");
        }
        const user = result[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new BadRequestError("Wrong password");
        }
        const deleteQuery = `DELETE FROM users WHERE id = ${user_id}`;
        dbQuery(deleteQuery, next, () => {
          res.json({
            statusCode: 200,
            error: null,
            data: {
              username,
            },
          });
        });
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
});
authRouter.post("/deactivate/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { password } = req.body;

    const query = `SELECT * FROM users WHERE id = ${user_id}`;

    connection.query(query, async (err, result) => {
      try {
        if (err) {
          throw new Error(err);
        }
        if (result.length === 0) {
          throw new BadRequestError("User not found");
        }
        const user = result[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new BadRequestError("Wrong password");
        }
        const deactivateQuery = `UPDATE users SET active = 0 WHERE id = ${user_id}`;
        dbQuery(deactivateQuery, next, () => {
          res.json({
            statusCode: 200,
            error: null,
            data: {
              username: user.username,
              active: 0,
            },
          });
        });
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
});

const userRouter = express.Router();
userRouter.get("/inactive", (_req, res, next) => {
  const query = `SELECT * FROM users WHERE active = 0`;
  dbQuery(query, next, (result) => {
    res.json({
      statusCode: 200,
      error: null,
      data: result,
    });
  });
});
userRouter.get("/:user_id", (req, res, next) => {
  const { user_id } = req.params;
  const query = `SELECT * FROM users WHERE id = ${user_id}`;
  dbQuery(query, next, (result) => {
    res.json({
      statusCode: 200,
      error: null,
      data: result[0],
    });
  });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

// error handler
const errorHandler = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    return res.status(400).send({
      statusCode: 400,
      error: err.name,
      message: err.message,
    });
  } else {
    return res.status(500).send({
      statusCode: 500,
      error: err.name,
      message: err.message,
    });
  }
};
app.use(errorHandler);

// server listen
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
