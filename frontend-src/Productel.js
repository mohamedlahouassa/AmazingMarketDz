import React, { useEffect, useState } from 'react'
import  Paginationa  from './Pagination';
import Product from './Product';
import { stockData } from "./stock";
import { useStateValue } from "./StateProvider";
import ContentLoader from 'react-content-loader'

function Productel(props) {
    const [{page}] = useStateValue();

  const [Products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [Productsperpage] = useState(16);

useEffect(() => {
    const fetProducts= async ()=>{
      setloading(true);
      const data=await props.data;

    setProducts(data);
    
    setloading(false);
    }

    fetProducts();
}, [props.data]);


const MyLoader = () => (
  <ContentLoader viewBox="0 0 400 180">
<rect x="0" y="0" rx="5" ry="5" width="95" height="140" />
  <rect x="100" y="0" rx="5" ry="5" width="95" height="140" />
  <rect x="200" y="0" rx="5" ry="5" width="95" height="140" />
  <rect x="300" y="0" rx="5" ry="5" width="95" height="140" />
  </ContentLoader>
)
const indexOfLastProduct=page*Productsperpage;
const indexOfFirstProduct=indexOfLastProduct-Productsperpage;
const currentProducts=Products.slice(indexOfFirstProduct,indexOfLastProduct);


 
    return ( <div><Paginationa total={Products.length} perpage={Productsperpage}  className="pag" />
      {loading?MyLoader():
        <div className="pro_items">
          
       {
       currentProducts.map(pro=>{
              return  <Product info={pro} onClick={()=>props.onClick(pro)}  />
             })}
    </div>}
    <Paginationa total={Products.length} perpage={Productsperpage}  className="pag" />
    
    </div>
        
    );
}




export default Productel
