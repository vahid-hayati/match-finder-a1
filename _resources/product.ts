export class Shop {
    product: Product = {
        category: Catergories.Electronic
    }
}

/////////////////////
////////// C# ///////
export interface Order {  // orders => POST => DB.InsertOneAsync
    id: ObjectId;
    productId: ObjectId;
    userId: ObjectId; // arshia
    createdOn: Date;
    shippingAddress: Contact; // client
    shippingtCost: number;
    tax: number; // product.price * 0.9
    billNum: number; //billNum = billNum++;
}

export interface Product { // products
    id: ObjectId;
    code: string;
    name: string;
    price: number;
    category: Categories; // Electronic, Wearable => Enum
    count: number; // 1 => DB.Update 
}

export interface Electronic {
    brand: string;
    color: string; // yellow
    price: number;
}

export interface Mobile extends Electronic, Gadget {
    year: Date;
}

export interface Gadget extends Electronic {
    weight: number
}

export enum Categories {
    ELECTRONICS,
    CLOTHINGS,
    FOOD
}

export interface ProductDto {
    code: string;
    name: string;
    price: number;
    category: string; // Electronic, Wearable
}

export interface AppUser { // users
    id: ObjectId;
    name: string;
    address: Contact;
}

export interface Contact { // no collection 
    country: string;
    state: string;
    city: string;
    street: string;
    number: string;
    building: string;
    zip: string;
    phoneNumber: string
    email: string
}

export interface BillDto { // GenerateBill
    num: string; // 0301-1001 => OrderRepo => order.billNum
    issuedOn: Date; // DateTime.UtcNow
    paiedOn: Date; // OrderRepo => order.createdOn
    products: IEnumarable<ProductDto>; // products (ProductRepo) => productDto
    shippingCost: number;
    tax: number; // order.tax
    totalAmount: number; // calculate in OrderRepository
    buyerName: string; // appUser.name
    shippingAddress: Contact; // order.shippingAddress
}



/////////////////////
////////// TS ///////
export interface Bill {
    num: string; // 0301-1001 => OrderRepo => order.billNum
    issuedOn: Date; // DateTime.UtcNow
    paiedOn: Date; // OrderRepo => order.createdOn
    products: Product[]; // products (ProductRepo) => productDto
    shippingCost: number;
    tax: number; // order.tax
    totalAmount: number; // calculate in OrderRepository
    buyerName: string; // appUser.name
    shippingAddress: Contact; // order.shippingAddress
}

BillService

// Angular DOM
// billRes.product.name
// 


/*

Arshia
Faranak

    if(count != 0) // 1 mojood
        sabte order

    Faranak Order => 0
    Arshia => -1


*/

enum Catergories {
    Electronic,
    Wearable,
    Car
}