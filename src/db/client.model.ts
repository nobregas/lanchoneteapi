import mongoose from "mongoose";

export interface IClient {
  name: string,
  email: string,
  phone: string,
  address: string
}

const ClientSchema = new mongoose.Schema<IClient>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
  }

})

const ClientModel = mongoose.model<IClient>("Client", ClientSchema)

export default ClientModel