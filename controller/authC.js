const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const modelAuth = require("../model/authM");

async function register(req, res) {
  const { name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let result = await modelAuth.checkUsername(username);
    if (result[0].count < 1) {
      await modelAuth.addAccount(name, username, hashedPassword);
      return res.status(200).json({
        status: true,
        message: "Register Success",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Username Alredy Used",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    let result = await modelAuth.getAccount(username);
    const isMatch = await bcrypt.compare(password, result[0].password);

    if (result !== null && isMatch) {
      //payload
      const user = {
        id: result[0].id,
        name: result[0].name,
        username: result[0].username,
        role: result[0].role,
      };

      //Create Access Token
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      // create Refresh Token
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "2h",
      });

      await modelAuth.saveRefreshToken(refreshToken);
      return res.status(200).json({
        status: true,
        message: "Login Success",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Wrong Username or Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function refreshToken(req, res) {
  const refreshToken = req.body.refreshToken;
  try {
    let result = await modelAuth.checkRefreshToken(refreshToken);
    if (result[0].count > 0) {
      const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      //create new Acces Token
      const accessToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        status: true,
        message: "Success Refresh Access Token",
        accessToken: accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function logout(req, res) {
  const refreshToken = req.body.refreshToken;
  try {
    await modelAuth.deleteRefreshToken(refreshToken);
    return res.status(200).json({
      status: true,
      message: "logout Success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  login,
  register,
  refreshToken,
  logout,
};
