const express=require('express')
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
​
app.listen(9000, () => console. log("Aplicao respondendo na porta 9000."));
​
const mysql = require('mysql2/promise')
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ''
})
​ 
app.get('/',(req,res)=>{
    res.send("Anderson");
})
​
const getAllPessoas = async () =>{
    const [query] = await connection
    .execute('select * from TestePessoa.Pessoa');
    return query;
}
app.get('/pessoa', async (req,res)=>{
    const consulta = await getAllPessoas();
    return res.status(200).json(consulta);
})
​
app.get('/pessoa/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from TestePessoa.Pessoa where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.get('/pessoa/busca/:nome', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from TestePessoa.Pessoa where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.post('/pessoa', async (req,res)=>{
    const {nome, email} = req.body;
    const [query]= await connection.
    execute('insert into TestePessoa.Pessoa (nome,email) values(?,?)', 
    [nome,email])
    return res.status(200).json(query);
})


app.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
   
        const [updateQuery] = await connection.execute('UPDATE TestePessoa.Pessoa SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
        return res.status(200).json({ mensagem: 'Pessoa atualizada com sucesso.' });
    
});


app.delete('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
        const [deleteQuery] = await connection.execute('DELETE FROM TestePessoa.Pessoa WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Pessoa excluída com sucesso.' });
});



/* Doador */
app.get('/doador', async (req,res)=>{
    const consulta = await getAlldoadores();
    return res.status(200).json(consulta);
})
​
app.get('/doador/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from PI2.doador where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.get('/doador/busca/:nome', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from PI2.doador where nome like %?%', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.post('/doador', async (req,res)=>{
    const {nome, cpf, endereco, telefone, email, data_nascimento, UF, CEP, usuario, senha, id} = req.body;
    const [query]= await connection.
    execute('insert into PI2.doador (nome, cpf, endereco, telefone, email, data_nascimento, senha, UF, CEP, usuario, senha, id) values(?,?,?,?,?,?,?,?,?,?,?)', 
    [nome, cpf, endereco, telefone, email, data_nascimento, UF, CEP, usuario, senha, id])
    return res.status(200).json(query);
})

app.put('/doador/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, endereco, telefone, email, data_nascimento, UF, CEP, usuario, senha } = req.body;
   
        const [updateQuery] = await connection.execute('UPDATE PI2.doador SET nome = ?, cpf = ?, endereco = ?, telefone = ?, email = ?, data_nascimento = ?, UF = ?, CEP = ?, usuario = ?, senha = ?, WHERE id like %?%', [nome, cpf, endereco, telefone, email, data_nascimento, UF, CEP, usuario, senha, id]);
        return res.status(200).json({ mensagem: 'Doador atualizado com sucesso.' });
    
});


app.delete('/doador/:id', async (req, res) => {
    const { id } = req.params;
        const [deleteQuery] = await connection.execute('DELETE FROM PI2.doador WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Doador excluída com sucesso.' });
});



/* Doacao */
app.get('/doacao', async (req,res)=>{
    const consulta = await getAlldoacoes();
    return res.status(200).json(consulta);
})
​
app.get('/doacao/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from PI2.doacao where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.get('/doacao/busca/:nome', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from PI2.doacao where id like %?%', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.post('/doacao', async (req,res)=>{
    const {data, forma_pagamento, valor, status} = req.body;
    const [query]= await connection.
    execute('insert into PI2.doacao (forma_pagamento, valor, status) values(?,?,?,?)', 
    [data, forma_pagamento, valor, status])
    return res.status(200).json(query);
})

app.put('/doacao/:id', async (req, res) => {
    const { id } = req.params;
    const { data, forma_pagamento, valor, status } = req.body;
   
        const [updateQuery] = await connection.execute('UPDATE PI2.doacao SET data = ?, forma_pagamento = ?, valor = ?, status = ? WHERE id = ?', [data, forma_pagamento, valor, status, id]);
        return res.status(200).json({ mensagem: 'Doação atualizada com sucesso.' });
    
});

app.delete('/doacao/:id', async (req, res) => {
    const { id } = req.params;
        const [deleteQuery] = await connection.execute('DELETE FROM PI2.doacao WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Doacão excluída com sucesso.' });
});



/* Campanha */
app.get('/campanha', async (req,res)=>{
    const consulta = await getAllcampanhas();
    return res.status(200).json(consulta);
})
​
app.get('/campanha/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from PI2.campanha where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.get('/campanha/busca/:nome', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from PI2.campanha where id like %?%', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.post('/campanha', async (req,res)=>{
    const {nome, titulo, meta, descricao, inicio_data, fim_data, url_video, url_imagem} = req.body;
    const [query]= await connection.
    execute('insert into PI2.campanha (nome, titulo, meta, descricao, inicio_data, fim_data, url_video, url_imagem,) values(?,?,?,?,?,?,?,?)', 
    [nome, titulo, meta, descricao, inicio_data, fim_data, url_video, url_imagem])
    return res.status(200).json(query);
})

app.put('/campanha/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, titulo, meta, descricao, inicio_data, fim_data, url_video, url_imagem } = req.body;
   
        const [updateQuery] = await connection.execute('UPDATE PI2.campanha SET nome = ?, titulo = ?, meta = ?, descricao = ?, inicio_data = ?, fim_data = ?, url_video = ?, url_imagem = ? WHERE id = ?', [nome, titulo, meta, descricao, inicio_data, fim_data, url_video, url_imagem, id]);
        return res.status(200).json({ mensagem: 'Campanha atualizada com sucesso.' });
    
});

app.delete('/campanha/:id', async (req, res) => {
    const { id } = req.params;
        const [deleteQuery] = await connection.execute('DELETE FROM PI2.campanha WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Campanha excluída com sucesso.' });
});


/* Usuario */
app.get('/usuario', async (req,res)=>{
    const consulta = await getAllusuarios();
    return res.status(200).json(consulta);
})
​
app.get('/usuario/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * PI2.usuario where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.get('/usuario/busca/:nome', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from PI2.usuario where id like %?%', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.post('/usuario', async (req,res)=>{
    const {nome, senha, cpf} = req.body;
    const [query]= await connection.
    execute('insert into PI2.usuario (nome,senha,cpf) values(?,?,?)', 
    [nome, senha, cpf])
    return res.status(200).json(query);
})

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, senha, cpf } = req.body;
   
        const [updateQuery] = await connection.execute('UPDATE PI2.usuario SET nome = ?, senha = ?, cpf = ? WHERE id = ?', [nome, senha, cpf, id]);
        return res.status(200).json({ mensagem: 'Usuario atualizada com sucesso.' });
    
});

app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
        const [deleteQuery] = await connection.execute('DELETE FROM PI2.usuario WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Usuario excluída com sucesso.' });
});


/* Configuracoes */
app.get('/usuario', async (req,res)=>{
    const consulta = await getAllusuarios();
    return res.status(200).json(consulta);
})
​
app.get('/usuario/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * PI2.usuario where id = ?', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.get('/usuario/busca/:nome', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from PI2.usuario where id like %?%', [id]);
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})
​
app.post('/usuario', async (req,res)=>{
    const {instagram, facebook, whatsapp, logo} = req.body;
    const [query]= await connection.
    execute('insert into PI2.usuario (instagram, facebook, whatsapp, logo) values(?,?,?,?)', 
    [instagram, facebook, whatsapp, logo])
    return res.status(200).json(query);
})

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { instagram, facebook, whatsapp, logo } = req.body;
   
        const [updateQuery] = await connection.execute('UPDATE PI2.usuario SET instagram = ?, facebook = ?, whatsapp = ?, logo = ? WHERE id = ?', [instagram, facebook, whatsapp, logo, id]);
        return res.status(200).json({ mensagem: 'Usuario atualizada com sucesso.' });
    
});

app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
        const [deleteQuery] = await connection.execute('DELETE FROM PI2.usuario WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Usuario excluída com sucesso.' });
});


  