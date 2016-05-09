show dbs
use [dbname]
show collections
db.[collections].find()


db.users.insert( { name: "admin", password: "admin" , roles: ["admin"] } );

db.users.update( {name: "admin"}, { name: "admin", password: "admin" , roles: ["admin"] })