import {Asset} from './hyperledger.composer';
import {Participant} from './hyperledger.composer';
import {Transaction} from './hyperledger.composer';
import {Event} from './hyperledger.composer';

// export namespace loyaltynetwork{
export abstract class User extends Participant {
    userId: string;
    email: string;
    role: string;
    tokens: LoyaltyToken[] = [];
}
export class Customer extends User {
    firstName: string;
    lastName: string;
    providers: string[] = [];
}

export class LoyaltyProvider extends User {
    companyName: string;
    partners: LoyaltyPartner[] = [];
    customers: string[] = [];
    conversionRate: number;
}

export class LoyaltyPartner extends User {
    companyName: string;
    provider: LoyaltyProvider;
}
export class LoyaltyToken extends Asset {
    tokenId: string;
    owner: User;
    issuer: string;
}
export class issueTokens extends Transaction {
    issuer: User;
    issuedTokens: number;
}
export class earnTokens extends Transaction {
    earner: Customer;
    earnedTokens: number;
    issuer: User;
}
export class redeemTokens extends Transaction {
    redeemer: Customer;
    redeemdedTokens: number;
    accepter: User;
}
export class tradeTokens extends Transaction {
    sender: Customer;
    receiver: Customer;
    amountOfTokens: number;
}
export class joinProgram extends Transaction {
    programOwner: LoyaltyProvider;
    joiner: User;
}
export class exitProgram extends Transaction {
    programOwner: LoyaltyProvider;
    exiter: User;
}
// }
