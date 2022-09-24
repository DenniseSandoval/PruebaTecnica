import { Request, Response } from "express";
import { Account } from "../entities/Account";
import { Client } from "../entities/Client";

export const createAccountUser = async (req: Request, res: Response) => {
  try {
    const { accountNumber, accountType, initialBalance, state, name} = req.body;
    let userInfo = new Client();
    const userId= await Client.getRepository().findOneBy({name: name});
    if(!userId){
        return res.status(500).json({message: "Client not found"});
    }
    const accountUser = new Account();
    
    accountUser.accountNumber = accountNumber;
    accountUser.accountType= accountType;
    accountUser.initialBalance= initialBalance;
    accountUser.state= state;
    accountUser.client= userId ?? userInfo;

    await accountUser.save();

    const user = {
        accountNumber: accountNumber,
        type: accountType,
        initialBalance: initialBalance,
        state: state,
        client: name
    }
    console.log(accountUser);
    return res.json(user);
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({message: error.message});
    }
  }
};
