const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const models = require('./models');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
let user = models.User;



// Routes
app.get('/', (req, res)=> {
    res.send("Meu maravilhoso servidor está rodando")
})

// Read
app.get('/todos', async (req, res)=> {
    let read = await user.findAll({
        raw: true, 
    });
    res.send(read);
    console.log(read);
})

// Create
app.get('/criar', async (req, res)=> {
    let create = await user.create({
        name: 'Natalia', 
        email: "natalia@gmail.com"
    });
    res.send("Usuário criado com sucesso");
})

// Edit || Update
app.get('/editar', async (req, res) => {
    let update = await user.findByPk(1).then((response)=> {
        console.log(response)
        response.name = "Gabriel Eduardo Ruiz";
        response.email = "gabrielruiztq@gmail.com";
        response.save();        
    })
})

// Delete || Destroy
app.get('/deletar', async (req, res) => {
    user.destroy({
        where: {id:2}
    })
})


// Port
let port = process.env.PORT || 3000;
app.listen(port, (req, res)=> {
    console.log("=================")
    console.log('Servidor rodando! ')
    console.log("=================") 
})