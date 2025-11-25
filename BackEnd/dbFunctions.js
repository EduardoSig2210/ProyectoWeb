const express = require('express');
const cors = require('cors');
const connection = require('./db/conexion');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// verificar usuario en la base de datos
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log("Intentando login con:", { email, password });
    
    //Verificar campos requeridos
    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            error: "Email y contraseña son requeridos" 
        });
    }
    
    // Buscar usuario en la base de datos
    const query = 'select * from users where email = ? and password = ?';
    
    connection.query(query, [email, password], function(error, results) {
        if (error) {
            console.error("error en consulta MySQL:", error);
            return res.status(500).json({ 
                success: false,
                error: "Error interno del servidor" 
            });
        }
        
        console.log("Resultados de la consulta:", results);
        
        // Verificar si encontró el usuario
        if (results.length === 0) {
            return res.status(401).json({ 
                success: false,
                error: "Email o contraseña incorrectos" 
            });
        }
        
        // funciona el login
        const user = results[0];
        console.log("Login exitoso para usuario:", user.name);
        
        res.json({ 
            success: true,
            message: "Login exitoso",
            user: {
                id: user.id,
                name: user.name,
                lastName: user.lastName || '',
                email: user.email
            }
        });
    });
});

//Crear nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const { name, lastName, email, password } = req.body;
    
    console.log("Registrando usuario:", { name, lastName, email });
    
    // 1. Validaciones básicas
    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false,
            error: "Nombre, apellido, email y contraseña son requeridos" 
        });
    }

    //Verificar si el email ya existe
    connection.query(
        'select id from users where email = ?',
        [email],
        function(error, results) {
            if (error) {
                console.error("Error verificando email:", error);
                return res.status(500).json({ 
                    success: false,
                    error: "Error interno del servidor" 
                });
            }
            
            if (results.length > 0) {
                return res.status(400).json({ 
                    success: false,
                    error: "El email ya está registrado" 
                });
            }
            
            // Insertar nuevo usuario
            connection.query(
                'insert into users (name, lastName, email, password) values (?, ?, ?, ?)',
                [name, lastName || '', email, password],
                function(error, results) {
                    if (error) {
                        console.error("Error creando usuario:", error);
                        return res.status(500).json({ 
                            success: false,
                            error: "Error al crear usuario" 
                        });
                    }
                    
                    console.log("Usuario creado con ID:", results.insertId);
                    
                    res.status(201).json({ 
                        success: true,
                        id: results.insertId, 
                        name: name,
                        lastName: lastName || '',
                        email: email, 
                        message: "Usuario creado exitosamente" 
                    });
                }
            );
        }
    );
});


app.get('/api/usuarios', (req, res) => {
    connection.query('select id, name, email from users', function(error, results) {
        if (error) {
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }
        res.json(results);
    });
});

app.get('/api/restaurant', (req, res) => {
    connection.query('select idRestaurant, name from restaurant', function(error, results) {
        if (error) {
            return res.status(500).json({ error: "Error al obtener los restaurantes" });
        }
        res.json(results);
    });
})

app.get('/api/restaurant/:name', (req, res) => {
    const name = req.params.name;
    connection.query('select idRestaurant from restaurant where name = ?',[name], function(error, results) {
        if (error) {
            return res.status(500).json({ error: "Error al obtener los restaurantes" });
        }
        res.json(results);
    });
})

app.get('/api/menu/:restaurant', (req, res) => {
    const restaurant = req.params.restaurant;
    connection.query('select item, price from menu where idRestaurant = ?', [restaurant], function(error, results) {
        if (error) {
            return res.status(500).json({ error: "Error al obtener los restaurantes" });
        }
        res.json(results);
    });
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de login corriendo en http://localhost:${PORT}`);
    console.log(`Endpoints disponibles:`);
    console.log(`POST http://localhost:${PORT}/api/login`);
    console.log(`POST http://localhost:${PORT}/api/usuarios`);
    console.log(`GET  http://localhost:${PORT}/api/usuarios`);
    console.log(`GET  http://localhost:${PORT}/api/restaurant`);
    console.log(`GET  http://localhost:${PORT}/api/restaurant/Wendys`);
    console.log(`GET  http://localhost:${PORT}/api/menu/3`);
});
