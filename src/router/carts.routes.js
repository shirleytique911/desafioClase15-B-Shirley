import { Router } from "express";
import {cartsModel}  from "../models/carts.model.js";

const router =  Router();

router.get('/', async (req, res) => {
    try {
        let carts = await cartsModel.find();
        res.send({ result: "success", payload: carts});
    } catch (error) {
        console.log(error);
    }

});

router.post('/', async (req, res) => {
    let { description, quantity, total} = req.body;
    if (!description || !quantity || !total) {
        res.send({status: "error", error: "Missing body parms"});
    }
    let result = await cartsModel.create({ description,quantity,total})
    res.send({result:"succes", payload: result}); 
});

router.put('/:id_cart', async (req, res) => {
    let { id_cart} = req.params;

    let cartsToReplace = req.body;
    if (!cartsToReplace.description || !cartsToReplace.quantity || !cartsToReplace.total) {
        res.send({status: "error", error: "Missing body parms"});
    }
    let result = await cartsModel.updateOne({ _id: id_cart}, cartsToReplace)
    res.send({result:"succes", payload: result})
});


router.delete('/:id_cart', async (req, res) => {
    let { id_cart } = req.params; 
    let result = await cartsModel.deleteOne({ _id: id_cart });

    if (result.deletedCount === 1) {
        res.send({ result: "success", message: "Cart deleted successfully" });
    } else {
        res.status(404).send({ result: "error", message: "Cart not found" });
    }
});


export default router