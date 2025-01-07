import React, { useEffect, useContext, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore(firebase);
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        
        const allProducts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {/* You might want to map through recommended products here instead of hardcoding */}
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="YAMAHA R15V3" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name">YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;