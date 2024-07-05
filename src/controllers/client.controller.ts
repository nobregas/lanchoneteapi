import { Request, Response } from "express"
import ClientModel from "../db/client.model"

class ClientController {

  getAllClients = async (request: Request, response: Response) => {
    try {
      const clients = await ClientModel.find()
      
      return response.sendStatus(200).json({data: clients})

    } catch (error) {
      return response.sendStatus(500)      
    }   
    
  }

  getClientById = async (request: Request, response: Response) => {
    try {
      
      const {id } = request.params

      const client = await ClientModel.findById(id)

      if (client === null) 
        throw 404

      return response.sendStatus(200).json({data: client})

    } catch (error) {
      return response.sendStatus(404)
    }
  }

  createClient = async (request: Request, response: Response) => {
    try {
      const {name, email, phone, address } = request.body
      const client = new ClientModel({
        name, email, phone, address
      })
      
      await client.save()

      return response.status(201).json({data: client})

    } catch (error) {
      return response.sendStatus(400);
    }
  }

  deleteClient = async (request: Request, response: Response) => {
    try {
      const {id } = request.params

      const client = ClientModel.findByIdAndDelete(id)

      if (client === null) {
        throw 404
      }
      return response.sendStatus(204);

    } catch(error) {
      return response.sendStatus(404);
    }
  }

  updateClient = async (request: Request, response: Response) => {
    try {
      const {id } = request.params
      const {name, email, phone, address } = request.body

      const client = await ClientModel.findById(id)

      if (client === null) {
        throw 404
      }

      if (name !== null) {
        client.name = name
      }
      if (email !== null) {
        client.email = email
      }
      if (phone !== null) {
        client.phone = phone
      }      
      if (address !== null) {
        client.address = address
      }

      await client.save()
      return response.status(200).json({data: client})

    } catch (error) {
      return response.sendStatus(404);
    }
  }

}

export default new ClientController()