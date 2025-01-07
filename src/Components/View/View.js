// View.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import './View.css';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!postDetails) {
      navigate('/');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const db = getFirestore(firebase);
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('id', '==', postDetails.userId));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [postDetails, firebase, navigate]);

  if (!postDetails) return null;

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.name}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;