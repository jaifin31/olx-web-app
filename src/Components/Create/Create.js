// Updated Create.js component
import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const handleSubmit = async () => {
    if (!user) {
      alert('Please login to upload products');
      return;
    }

    if (!image) {
      alert('Please select an image');
      return;
    }

    try {
      setLoading(true);
      const storage = getStorage(firebase);
      const db = getFirestore(firebase);

      // Create a unique filename
      const fileName = `${Date.now()}-${image.name}`;
      const storageRef = ref(storage, `images/${fileName}`);

      // Create upload task
      const uploadTask = uploadBytesResumable(storageRef, image);

      // Monitor upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          alert('Error uploading image. Please try again.');
          setLoading(false);
        },
        async () => {
          try {
            // Get download URL after successful upload
            const url = await getDownloadURL(uploadTask.snapshot.ref);

            // Add to Firestore
            await addDoc(collection(db, 'products'), {
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString()
            });

            // Reset form
            setName('');
            setCategory('');
            setPrice('');
            setImage(null);
            setUploadProgress(0);
            setLoading(false);
            
            alert('Product uploaded successfully!');
          } catch (error) {
            console.error('Firestore error:', error);
            alert('Error saving product details. Please try again.');
            setLoading(false);
          }
        }
      );
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="card">
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
          />
          <br />
          <br />
          {image && (
            <img
              alt="Preview"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          <br />
          <input 
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            disabled={loading}
          />
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="progress">
              <div 
                className="progress-bar" 
                style={{ width: `${uploadProgress}%` }}
              >
                {Math.round(uploadProgress)}%
              </div>
            </div>
          )}
          <br />
          <button
            onClick={handleSubmit}
            className="uploadBtn"
            disabled={loading || !name || !category || !price || !image}
          >
            {loading ? 'Uploading...' : 'Upload and Submit'}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;