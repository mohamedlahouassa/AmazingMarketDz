import React, { useEffect, useState } from 'react'
import "./App.css"
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './Nav'
import Footer from './Footer';
import Products from './Products';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import { useStateValue } from "./StateProvider";
import {db, auth,firebase } from "./firebase";
import ProductDetails from './ProductDetails';
import WishPro from './WishPro';
import Account from './Account';
import Contact from './Contact';
import Market from './Market';
function App() {
  const [{user}, dispatch] = useStateValue();
  const [loading, setloading] = useState(false);
  useEffect(() => { 
    setloading(true); 
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
    
        var userRef = db.collection("users").doc(authUser.uid);
        userRef.get().then((doc)=>{
            if (doc.exists) {
                console.log("Document data:", doc.data());
                dispatch({
                  type:"SET_CART",
                  cart:doc.data().cart
                })
                dispatch({
                  type:"SET_FAVORI",
                  favori:doc.data().favori
                })
                dispatch({
                  type: "SET_USER",
                  user: authUser,
                });
        
                setloading(false); 
            } 
            
            else {
              db.collection("users").doc(authUser.uid).set({
                name: authUser?.displayName,
                email: authUser?.email,
                registerWith:user?.providerData[0].providerId,
                dateReg: firebase.firestore.Timestamp.fromDate(new Date()),
                cart:[],
                favori:[],      
            })
            .then(function() {
              setloading(false); 
              dispatch({
                type: "SET_USER",
                user: authUser,
              });
      
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                setloading(false); 
            }); 

              

            }
        }).catch((error)=>{
            console.log("Error getting document:", error);
            setloading(false); 
        });
      } else {
        setloading(false); 
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type:"SET_CART",
          cart:[]
        })
        dispatch({
          type:"SET_FAVORI",
          favori:[]
        })
      }
    });
  }, []);
  return (
    <div className="App">
     <Router>

    
      
      <Switch>
      <Route path="/contact">
          <Nav loading={loading}/>
         
          <Contact/>
          <Footer/>
          
      </Route>
      <Route path="/market">
          <Nav loading={loading}/>
          <Market/>
          <Footer/>
          
      </Route>
      <Route path="/account">
         <Nav loading={loading}/>
          <Account/>
          <Footer/>
      </Route>
      <Route path="/wish">
         <Nav loading={loading}/>
          <WishPro loading={loading}/>
          <Footer/>
      </Route>
      <Route path="/prod">
         <Nav loading={loading}/>
          <ProductDetails/>
          <Footer/>
      </Route>
      <Route path="/register">
          <Register/>
      </Route>
      <Route path="/login">
          <Login/>
      </Route>
      <Route path="/shop">
         <Nav loading={loading}/>
          <div className="cont" style={{marginTop:"82px"}}>
            <Products/>
          </div>
          <Footer/>
      </Route>
      <Route path="/cart">
         <Nav loading={loading}/>
          <div className="cont" style={{marginTop:"82px"}}>
            <Cart loading={loading}/>
          </div>
          <Footer/>
      </Route>
      <Route path="/">
         <Nav loading={loading}/>
          <Home/>
          <Content/>
          <Footer/>
      </Route>
      </Switch>
     
      </Router>
     
    </div>
  );
}

export default App;
