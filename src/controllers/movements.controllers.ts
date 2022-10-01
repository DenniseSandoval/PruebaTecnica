import { Request, Response } from "express";
import { Account } from "../entities/Account";
import { Client } from "../entities/Client";
import { Movement } from "../entities/Movement";

export const createMovement = async (req: Request, res: Response) => {
  try {
    const { accountNumber, value} = req.body;
    
    const account= await Account.getRepository().findOneBy({accountNumber: accountNumber});
    if(!account){
        return res.status(404).json({message: "Cuenta no encontrada"});
    }

    const movement = new Movement();
    
    const lastMovement= await Movement.createQueryBuilder('m')
    .where("m.account_id='"+account.accountId+"'")
    .groupBy('m.movementId')
    .orderBy('m.movementId', 'DESC').getOne()
    
    console.log("lastmovement", lastMovement)
    const lastBalance= lastMovement!=null ? lastMovement?.balance: account.initialBalance
    const balance= lastBalance+(value);
    if (balance<0 && value<0) {
        return res.status(404).json({message: "Saldo no disponible"});
    }
    const time= Date.now();
    let dateMovement= new Date(time);
    dateMovement.toLocaleDateString();

    movement.date= dateMovement;
    movement.balance= balance
    movement.value= value;
    movement.movementType= account.accountType;
    movement.account= account;

    await movement.save();

    const movementAccount = {
        accountNumber: accountNumber,
        accountType: account.accountType,
        initialBalance: account.initialBalance,
        state: account.state,
        movement: value,
        lastBalance: lastBalance,
        availableBalance: balance
    }
    console.log(movementAccount);
    return res.json(movementAccount);
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({message: error.message});
    }
  }
};
export const getMovements= async(req: Request, res: Response)=>{
  try{
    const clients = await Account.createQueryBuilder('a')
  .select('m.date', 'Fecha')
  .addSelect('c.name', 'Cliente')
  .addSelect('a.accountNumber', 'Numero Cuenta')
  .addSelect('a.accountType', 'Tipo')
  .addSelect('a.initialBalance', 'Saldo Inicial')
  .addSelect('a.state', 'Estado')
  .addSelect('m.value', 'Movimiento')
  .addSelect('m.balance', 'Saldo disponible')
  .innerJoin(Movement, 'm', 'a.accountId = m.account_id')
  .innerJoin(Client, 'c', 'c.clientId = a.client_id')
  .getRawMany()
  console.log(clients);
  res.statusCode= 200;
  return res.json(clients)
  }catch(error){
    if(error instanceof Error){
      return res.status(500).json({message: error.message});
    }
  }
}
export const getAccountState= async(req: Request, res: Response)=>{
  try{
    const clients = await Account.createQueryBuilder('a')
  .select('m.date', 'Fecha')
  .addSelect('c.name', 'Cliente')
  .addSelect('a.accountNumber', 'Numero Cuenta')
  .addSelect('a.accountType', 'Tipo')
  .addSelect('a.initialBalance', 'Saldo Inicial')
  .addSelect('a.state', 'Estado')
  .addSelect('m.value', 'Movimiento')
  .addSelect('m.balance', 'Saldo disponible')
  .innerJoin(Movement, 'm', 'a.accountId = m.account_id')
  .innerJoin(Client, 'c', 'c.clientId = a.client_id')
  .where("c.name='"+req.params.client+"' and m.date between '"+req.params.dateInitial+"' and '"+req.params.dateEnd+"'")
  .getRawMany()
  return res.json(clients)
  }catch(error){
    if(error instanceof Error){
      return res.status(500).json({message: error.message});
    }
  }
}
export const updateMovement= async(req: Request, res: Response)=>{
  try{
    const movement= await Movement.findOneBy({movementId:req.params.id})

  Movement.update({movementId:req.params.id}, req.body)
  if(!movement) return res.status(404).json({message:'No existe movimiento'}) 
  
  return res.sendStatus(204);
  }catch(error){
    if(error instanceof Error){
      return res.status(500).json({message: error.message});
    }
  }
}
export const deleteMovement= async(req: Request, res: Response)=>{
  try{
    const movement= await Movement.delete({movementId:req.params.id})

    if(movement.affected===0){
      return res.status(404).json({message:'No existe movimiento'}) 
    } 
  
  return res.sendStatus(204);
  }catch(error){
    if(error instanceof Error){
      return res.status(500).json({message: error.message});
    }
  }
}
