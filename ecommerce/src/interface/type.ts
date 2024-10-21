export interface itemtype {
    Price: number,
    brand: string,
    category: string,
    description: string,
    id:number,
    imgurl: string,
    quantity: number,
    rating: number,
    detail:string,
    cancelledPrice:number,
    content:string,
}

export interface userType{
  name: string|null,
  email: string|null,
  user_status: boolean,
   
}  
export interface carttype {
    add_cart_reducer:itemtype[]
  }

export interface logintype{
    set_user_status:userType
}

export interface wishtype{
    wishlist_reducer:itemtype[]
}
export interface producttype{
    set_productReducer:itemtype[]
}

export interface actionType {
  type: string;
  payload: [];
}