export interface Product {
    id : string;
    name : string;
    price : number;
    promotion : boolean;
}
export interface PageProduct {
    products : Product[],
    //numero de la pge 
    page:number,
    // nombre of items par page
   size:number,
   // nombre total of pages
    totalPages: number
}