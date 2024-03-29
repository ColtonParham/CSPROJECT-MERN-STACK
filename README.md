# CSPROJECT

# Attribution
This repository was built off of and uses code from Dave Gray.
Original code is from this repository: https://github.com/gitdagray/mongo_async_crud

# Initialization

Requires the creation of the .env file:
The file includes 3 variables, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, and DATABASE_URI. The first two can be generated using node via the command: require('crypto').randomBytes(64).toString('hex')
The DATABASE_URI requires the link to the mangoDB with authentication.
Ex:
ACCESS_TOKEN_SECRET=ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
REFRESH_TOKEN_SECRET=ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
DATABASE_URI = "mongodb+srv://USERNAME:PASSWORD@MONGDB_PATH.mongodb.net/db?retryWrites=true"
