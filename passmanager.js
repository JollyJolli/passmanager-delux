const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const bcrypt = require("bcrypt");

const dataDir = path.join(os.homedir(), "passmanager");

class PassManager {
  constructor() {
    this.loadPasswords();
  }

  generatePassword(length) {
    if (typeof length !== "number" || length <= 0) {
      throw new Error("Length must be a positive integer");
    }
    return crypto.randomBytes(length).toString("hex");
  }

  async savePassword(name, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const file = path.join(dataDir, `${name}.json`);
      fs.writeFileSync(file, JSON.stringify({ password, hashedPassword }));
      this.passwords[name] = { password, hashedPassword };
    } catch (err) {
      console.error(`Error saving password: ${err}`);
    }
  }

  loadPasswords() {
    try {
      const files = fs.readdirSync(dataDir);
      this.passwords = {};

      files.forEach((file) => {
        const name = path.basename(file, ".json");
        const passFile = path.join(dataDir, file);
        const { password, hashedPassword } = JSON.parse(
          fs.readFileSync(passFile, "utf8"),
        );
        this.passwords[name] = { password, hashedPassword };
      });
    } catch (err) {
      console.error(`Error loading passwords: ${err}`);
    }
  }

  getPasswords() {
    return Object.keys(this.passwords).reduce((acc, name) => {
      acc[name] = this.passwords[name].password;
      return acc;
    }, {});
  }

  getPassword(name) {
    return this.passwords[name]?.password;
  }

  async deletePassword(name) {
    try {
      delete this.passwords[name];
      const file = path.join(dataDir, `${name}.json`);
      fs.unlinkSync(file);
    } catch (err) {
      console.error(`Error deleting password: ${err}`);
    }
  }

  async comparePassword(name, password) {
    try {
      const hashedPassword = this.passwords[name]?.hashedPassword;
      return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
      console.error(`Error comparing password: ${err}`);
    }
  }
}

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

module.exports = PassManager;
