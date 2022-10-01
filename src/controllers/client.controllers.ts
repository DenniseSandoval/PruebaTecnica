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
export const updateClient= async(req: Request, res: Response)=>{
  try{
    const client= await Client.findOneBy({clientId:req.params.id})

  Client.update({clientId:req.params.id}, req.body)
  Person.update({personId:req.params.id}, req.body)
  if(!client) return res.status(404).json({message:'No existe cliente'}) 
  
  return res.sendStatus(204);
  }catch(error){
    if(error instanceof Error){
      return res.status(500).json({message: error.message});
    }
  }
}
export const deleteClient= async(req: Request, res: Response)=>{
  try{
    const client= await Client.delete({clientId:req.params.id})
    
    if(client.affected===0){
      return res.status(404).json({message:'No existe cliente'}) 
    } 
  
  return res.sendStatus(204);
  }catch(error){
    if(error instanceof Error){
      return res.status(500).json({message: error.message});
    }
  }
}