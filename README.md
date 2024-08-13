# PassManager

A simple password manager that allows you to generate, save, retrieve, and delete passwords.

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/passmanager.git
```

2. Install the dependencies:

```
cd passmanager
npm install
```

## Usage

To use the PassManager class, you can require it in your JavaScript code:

```javascript
const PassManager = require('./passmanager');
```

### Generating a password

To generate a password of a given length, you can use the `generatePassword` method:

```javascript
const pm = new PassManager();
const password = pm.generatePassword(10);
console.log(password);
```

### Saving a password

To save a password with a given name, you can use the `savePassword` method:

```javascript
const pm = new PassManager();
await pm.savePassword('example', 'password123');
```

### Retrieving passwords

To retrieve all saved passwords, you can use the `getPasswords` method:

```javascript
const pm = new PassManager();
const passwords = pm.getPasswords();
console.log(passwords);
```

To retrieve a specific password by name, you can use the `getPassword` method:

```javascript
const pm = new PassManager();
const password = pm.getPassword('example');
console.log(password);
```

### Deleting a password

To delete a password with a given name, you can use the `deletePassword` method:

```javascript
const pm = new PassManager();
await pm.deletePassword('example');
```

### Comparing a password

To compare a plain text password with the hashed password for a given name, you can use the `comparePassword` method:

```javascript
const pm = new PassManager();
const isMatch = await pm.comparePassword('example', 'password123');
console.log(isMatch);
```

## Security

The PassManager class uses the bcrypt library to hash passwords before saving them. This ensures that the passwords are stored securely.

However, the `getPassword` method allows you to retrieve the original, unhashed password. This is not recommended as it poses a security risk. It's generally better to use a secure method to store and retrieve passwords, such as hashing them and comparing the hashed password with the hashed input when authenticating a user.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
