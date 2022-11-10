const {db, Table} = require('../db.config');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const params = {
            TableName: Table,
        }
        const {Items = []} = await db.scan(params).promise();
        console.log(Items)
        res.render("contactos", {
            listaContactos: "Aquí irán todos los contactos",
            Items
        })
    } catch (error) {
        console.log(error)
    } 
})

router.get('/crear', (req, res) => {
    res.render('crear')
})


router.post('/',  async (req, res) => {
    const body = req.body
    body.id = `${Date.now()}`
    const params = {
        TableName: Table,
        Item: body
    }
    
    try {
        await db.put(params).promise()
        res.redirect('/contactos')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    const params = {
        TableName: Table,
        Key: {
            id
        }
    }
    try {
        const {Item = {}} = await db.get(params).promise();
        console.log(Item)
        res.render('detalle', {
            contacto: Item,
            error: false
        })
    } catch (error) {
        console.log('erroooooooooorrr', error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el documento...'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const params = {
        TableName: Table,
        Key: {
            id
        }
    }
    try {
        const contactoDB = await db.delete(params).promise();
        console.log(contactoDB)

        if (!contactoDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body.id = id;

    const params = {
        TableName: Table,
        Item: body
    }
    try {
        await db.put(params).promise()
        res.json({
            estado: true,
            mensaje: 'Contacto editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Contacto falla'
        })
    }
})



module.exports = router;