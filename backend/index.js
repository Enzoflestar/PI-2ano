const express = require('express')
const app = express();
app.use(express.json())
app.listen(9000, () => console.log("OK"));

const mysql = require('myslq2/promise')
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ''
})

app.get('/', (req,res)=>{
    return res.send("Arthur e Enzo");
})

const GetAllPessoas = async () =>{
    const [query] = await connection
    .execute('Select * from TestePessoa.Pessoa');
    return query;
}

app.get('/pessoa', async () =>{
    const consulta = await GetAllPessoas();
    return res.status(200).json(consults);
})