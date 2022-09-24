import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Account } from "../entities/Account";
import { Client } from "../entities/Client";
import { Movement } from "../entities/Movement";
import { Person } from "../entities/Person";

export const createMovement = async (req: Request, res: Response) => {
  try {
    const { accountNumber, value} = req.body;
    const account= await Account.getRepository().findOneBy({accountNumber: accountNumber});
    if(!account){
        return res.status(500).json({message: "Account not found"});
    }
    const movement = new Movement();

    const balance= account.initialBalance+(value);
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
        movement: value
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
  /*let movements= await Movement.getRepository().find({
    relations:{account: true
    }
  })
  const movementsAccount = movements.map(function(movement) {
    var account={
      Date: movement.date,
      "Cliente": name,
      "Numero Cuenta": movement.account.accountNumber,
      "Tipo": movement.movementType,
      "Saldo Inicial": movement.account.initialBalance,
      "Estado": movement.account.state,
      "Movimiento": movement.value,
      "Available Balance": movement.balance
    }
    return account;
});*/
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
  console.log(clients)
  return res.json(clients)
}
