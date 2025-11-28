let db = require('mysql2');

//Crear la conexion a la base de datos
let conection = db.createConnection({
    host: "localhost",
    database: "DBFoodin_line",
    user: "root",
    password: ""
});

//Intentar conectar la base de datos
conection.connect(function(err){
    if(err){
        console.log("fallo");
    }else{
        console.log("Conexion exitosa");
    }
}); 

//Exporta la conexion para poder usarla en otros archivos
module.exports = conection;
