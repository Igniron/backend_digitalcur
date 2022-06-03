const {response} = require('express')
const Product = require('../models/Product')


const newProduct = async (req, res = response) => {
    const { name } = req.body

    let product = await Product.findOne({name})

    if( product ){
        return res.status(400).json({
            ok: false,
            msg: 'El producto ya existe'
        })
    }

    product = new Product ( req.body )
    try{
        product.user = req.uid
        const productSave = await product.save()
        res.status(201).json({
            status: 'ok',
            msg: 'Product upload succesfully! 😁',
            evento: productSave
        })
        console.log(name)
    }catch(error){
        res.status(501).json({
            status:'failure',
            msg:'Error at upload product, please contact the developer'
        })
        console.log(error)
    }
}

const updateProduct = async (req, res) => 
{
    const productId = req.params.productId;
    const uid = req.uid;
    try 
    {
        const product = await Product.findById(productId);

        if (!product)
        {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existente',
            });
        }

        // Modificar: permisos de admin
        // if (product.user.toString() !== uid)
        // {
        //     return res.status(401).json ({
        //         ok: false,
        //         msg: 'No tiene los permisos para modificar el evento',
        //     });
        // }

        const newProduct = {
            ...req.body,
            user: uid,
        };
        const productUpdated = await Product.findByIdAndUpdate(productId, newProduct, {new: true});
        res.status(201).json({
            ok: true,
            productUpdated,
            msg: 'El evento se actualizó correctamente',
        });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar evento, hable con un adminsitrador',
        });
    }

}

const deleteProduct = async (req, res = response) => 
{
    const productId = req.params.productId;
    const uid = req.uid;
    try 
    {
        const product = await Product.findById(productId);

        if (!product)
        {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existente',
            });
        }

        // Modificar: permisos de administrador.
        // if (product.user.toString() !== uid)
        // {
        //     return res.status(401).json ({
        //         ok: false,
        //         msg: 'No tiene los permisos para modificar el producto',
        //     });
        // }
        
        await Product.findByIdAndDelete(productId);
        res.status(201).json({
            ok: true,
            msg: 'El producto se eliminó correctamente',
        });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar producto, hable con un adminsitrador',
        });
    }
}

const getProducts = async (req, res = response) => {
    
    const products = await Product.find();
    return res.json({
        ok:true,
        products,
    })
}

module.exports = {
    newProduct,
    updateProduct,
    deleteProduct,
    getProducts
}