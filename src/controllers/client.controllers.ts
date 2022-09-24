import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { Person } from "../entities/Person";

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, gender, age, id, address, phone, password, state } = req.body;
    const client = new Client();
    client.password = password;
    client.state = state;

    const person= new Person();
    person.name= name;
    person.gender= gender;
    person.age= age;
    person.id=id;
    person.address=address;
    person.phone= phone;
    person.client= client;
    client.name= name;
    client.gender= gender;
    client.age= age;
    client.id=id;
    client.address=address;
    client.phone= phone;

    await person.save();
    return res.json(client);
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({message: error.message});
    }
  }
};
