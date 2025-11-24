let db = require('mysql');

let conection = db.createConnection({
    host: "localhost",
    database: "DBFoodin_line",
    user: "root",
    password: ""
});

conection.connect(function(err){
    if(err){
        console.log("fallo");
        console.log(err);
    }else{
        console.log("Conexion exitosa");
    }
}); 

module.exports = conection;
