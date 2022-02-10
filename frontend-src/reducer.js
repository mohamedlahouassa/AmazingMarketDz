import {db} from "./firebase";

export const initialState = { 
  user: null,
  page: 1,
  cart:[],
  favori:[],
  currentProduct:{}
};
export const getCartTotal = (cart) => {
  let s=0;
  cart.map((cart) => s+=cart?.product?.price*cart?.quantity);
  return s;
}
export const inCart = (cart,id) => {
  const index = cart.findIndex(
    (cartItem) => cartItem.id === id
  );
  return index;
}
export const inFavori = (favori,id) => {
  const index = favori.findIndex(
    (favoriItem) => favoriItem.sku === id
  );
  if(index===-1){
    return false;
  }
  else{
    return true;
  }
}
  
  

const reducer = (state, action) => {
  var userdb = db.collection("users").doc(state.user?.uid);  

  const setCartDatabase=(newCart)=>{
    userdb.update({
      cart:newCart
  })
  .then(function() {
      console.log("Remoe from basker");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
  }
  const setFavoriDatabase=(newfavori)=>{
   
    userdb.update({
      favori:newfavori
  })
  .then(function() {
      console.log("Remoe from basker");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });




  }
  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }
      case "SET_CART":
        return {
          ...state,
          cart: action.cart,
        }
        case "SET_FAVORI":
          return {
            ...state,
            favori: action.favori,
          }
      case "SET_PAGE":
        return {
          ...state,
          page: action.page,
        }
        case "SET_CURRENT":
        return {
          ...state,
          currentProduct: action.item,
        }
        case "SET_QUANTITY":{
        const index = state.cart.findIndex(
          (cartItem) => cartItem.id === action.id
        );
        let newCart = [...state.cart];
        if (index >= 0) {
          newCart[index].quantity=action.quantity
  
        } else {
          console.warn(
            `Cant remove product (id: ${action.id}) as its not in basket!`
          )
        }
        setCartDatabase(newCart);


        return {
          ...state,
          cart: newCart
        }
      }
        case "REMOVE_FROM_CART":{
          const index = state.cart.findIndex(
            (cartItem) => cartItem.id === action.id
          );
          let newCart = [...state.cart];
    
          if (index >= 0) {
            newCart.splice(index, 1);
    
          } else {
            console.warn(
              `Cant remove product (id: ${action.id}) as its not in basket!`
              )
          }
          setCartDatabase(newCart);
         
          return {
            ...state,
            cart: newCart
          }}
          case "REMOVE_FROM_FAVORI":{
            const index = state.favori.findIndex(
              (favoriItem) => favoriItem.sku === action.id
            );
            let newfavori = [...state.favori];
      
            if (index >= 0) {
              newfavori.splice(index, 1);
      
            } else {
              console.warn(
                `Cant remove product (id: ${action.id}) as its not in favori list!`
              )
            }
            setFavoriDatabase(newfavori);
            return {
              ...state,
              favori: newfavori
            }}
        case "ADD_TO_CART":{
          setCartDatabase([...state.cart, action.item]);
          return {
            ...state,
            cart: [...state.cart, action.item],
          };}

      case "ADD_TO_FAVORI":{
        setFavoriDatabase([...state.favori, action.item]);
        return {
          ...state,
          favori: [...state.favori, action.item],
        };}
    default:
      return state;
  }
};

export default reducer;