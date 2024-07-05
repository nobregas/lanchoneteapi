import mongoose from "mongoose";

export interface IOrder {
  name: string
  price: number
}

const OrderSchema = new mongoose.Schema<IOrder>({

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

})

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema)

export default OrderModel