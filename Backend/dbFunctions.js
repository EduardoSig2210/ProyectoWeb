const express = require('express');
const cors = require('cors');
const connection = require('./db/conexion');

const app = express();
const PORT = 3000;

// Configuracion de middleware
app.use(cors());
app.use(express.json());

// Endpoint para verificar usuario en la base de datos
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log("Intentando login con:", { email, password });
    
    // Verificar que los campos requeridos esten presentes
    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            error: "Email y contraseña son requeridos" 
        });
    }
    
    // Consulta SQL para buscar usuario
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
        
        // Verificar si se encontro algun usuario
        if (results.length === 0) {
            return res.status(401).json({ 
                success: false,
                error: "Email o contraseña incorrectos" 
            });
        }
        
        // Login exitoso
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

// Endpoint para crear nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const { name, lastName, email, password } = req.body;
    
    console.log("Registrando usuario:", { name, lastName, email });
    
    // Validar campos obligatorios
    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false,
            error: "Nombre, apellido, email y contraseña son requeridos" 
        });
    }

    // Verificar si el email ya existe en la base de datos
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
            
            // Si el email ya esta registrado
            if (results.length > 0) {
                return res.status(400).json({ 
                    success: false,
                    error: "El email ya está registrado" 
                });
            }
            
            // Insertar nuevo usuario en la base de datos
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

// Endpoint para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    connection.query('select id, name, email from users', function(error, results) {
        if (error) {
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }
        res.json(results);
    });
});

// Endpoint para obtener todos los restaurantes
app.get('/api/restaurant', (req, res) => {
    connection.query('select idRestaurant, name from restaurant', function(error, results) {
        if (error) {
            return res.status(500).json({ error: "Error al obtener los restaurantes" });
        }
        res.json(results);
    });
})

// Endpoint para obtener un restaurante por nombre
app.get('/api/restaurant/:name', (req, res) => {
    const name = req.params.name;
    connection.query('select idRestaurant from restaurant where name = ?',[name], function(error, results) {
        if (error) {
            return res.status(500).json({ error: "Error al obtener los restaurantes" });
        }
        res.json(results);
    });
})

// Endpoint para obtener el menu de un restaurante
app.get('/api/menu/:restaurant', (req, res) => {
    const restaurant = req.params.restaurant;
    connection.query('select item, price from menu where idRestaurant = ?', [restaurant], function(error, results) {
        if (error) {
            return res.status(500).json({ error: "Error al obtener los restaurantes" });
        }
        res.json(results);
    });
})

// Iniciar el servidor
app.listen(PORT, () => {    
    console.log("DO NOT touch the link")
    console.log(`Login server running on: http://localhost:${PORT}`);
    console.log(`Endpoints disponibles:`);
    console.log(`POST http://localhost:${PORT}/api/login`);
    console.log(`POST http://localhost:${PORT}/api/usuarios`);
    console.log(`GET  http://localhost:${PORT}/api/usuarios`);
    console.log(`GET  http://localhost:${PORT}/api/restaurant`);
    console.log(`GET  http://localhost:${PORT}/api/restaurant/Wendys`);
    console.log(`GET  http://localhost:${PORT}/api/menu/3`);
});