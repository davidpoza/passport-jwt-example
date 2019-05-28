Example of use of passport-jwt 
===============================

First of all you must create *.env* file with these variables:
```
MONGO_URI=mongodb+srv://user:password@server/db

# secret for encryption of jwt signature
JWT_SECRET=yoursecret

# number of rounds for Blowfish algorithm for hashing user password
BCRYPT_ROUNDS=12

# lifetime of the token (in seconds)
JWT_LIFETIME=86400

# algorithm used in token signing
JWT_ALGORITHM=HS256

# server port
PORT=8080
```
**You can create use a mongodb server at mongodb Atlas service for free.**

# Install
* git clone https://github.com/davidpoza/passport-jwt-example.git
* npm Install
* npm start
* go localhost:3000 on your browser
