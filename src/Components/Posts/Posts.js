// Posts.jsx
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';  // Add this import

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);  // Get PostContext
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleCardClick = (product) => {
    setPostDetails(product);
    navigate('/viewpost');
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              onClick={() => handleCardClick(product)}
              className="card"
              key={product.id}
            >
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
    </div>
  );
}

export default Posts;