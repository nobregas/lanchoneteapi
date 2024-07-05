import { Request, Response } from "express"
import OrderModel from "../db/order.model"

class OrderController {

  getAllOrders = async (request: Request, response: Response) => {
    try {
      const orders = await OrderModel.find()

      return response.status(200).json({data: orders})

    } catch (error) {
      return response.sendStatus(400)
    }
  }

  getOrder = async (request: Request, response: Response) => {
    try {
      const {id } = request.params
      const order = await OrderModel.findById(id)

      if (order == null) {
        throw "404"
      }

      return response.status(200).json({data: order})

    } catch (error) {
      return response.sendStatus(404);
    }
  }

  createOrder = async (request: Request, response: Response) => {
    try {
      const {name, price } = request.body
      const order = new OrderModel({
        name, price
      })
      
      await order.save()

      return response.status(201).json({data: order})

    } catch (error) {
      return response.sendStatus(400);
    }
  }

  editOrder = async (request: Request, response: Response) {
    try {
      const {id } = request.params
      const {name, price } = request.body

      const order = await OrderModel.findById(id)

      if (order === null) {
        throw 404
      }

      if (name !== null) {
        order.name = name
      }
      if (price !== null) {
        if (price < 0) {
          throw 400
        }
        order.price = price
      }

      await order.save()
      return response.status(200).json({data: order})

    } catch (error: number) {
      return response.sendStatus(error);
    }

  }

  deleteOrder = async (request: Request, response: Response) {
    try {
      const {id } = request.params

      const order = OrderModel.findByIdAndDelete(id)

      if (order === null) {
        throw 404
      }
      return response.sendStatus(204);
      
    } catch(error: number) {
      return response.sendStatus(error);
    }
  }
}

export default new OrderController()