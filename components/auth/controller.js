const User = require("../models/User");

const { hash, compare, sign } = require("./token");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const checkUnique = async (req, res) => {
  try {
    const { username, email } = req.query;

    if (username) {
      const user = await User.findOne({ username });

      if (user)
        return res.status(200).json({ unique: false, reason: "username" });
    }

    if (email) {
      const user = await User.findOne({ email });

      if (user) return res.status(200).json({ unique: false, reason: "email" });
    }

    return res.status(200).json({ unique: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await hash(password);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = sign(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login,
  register,
  checkUnique,
  getUser,
};
