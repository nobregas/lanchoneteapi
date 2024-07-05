import express from "express"
import OrderController from "../src/controllers/order.controller"

const router = express.Router()

router.get("/order", OrderController.getAllOrders)
router.get("/order/:id", OrderController.getOrder)

router.post("/order", OrderController.createOrder)

router.patch("/order/:id", OrderController.editOrder)

router.delete("/order/:id", OrderController.deleteOrder)

export default router