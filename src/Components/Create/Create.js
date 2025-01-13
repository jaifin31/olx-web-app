import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const Create = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const date = new Date();

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dpdmojqn9'
    }
  });

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

      // Create form data for Cloudinary upload
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', '');

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dpdmojqn9/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Store the public_id for the uploaded image
      setUploadedImageId(data.public_id);

      // Save product details to Firestore
      const db = getFirestore(firebase);
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        url: data.secure_url,
        imageId: data.public_id,
        userId: user.uid,
        createdAt: date.toDateString()
      });

      // Reset form
      setName('');
      setCategory('');
      setPrice('');
      setImage(null);
      setUploadedImageId(null);
      setLoading(false);
      
      alert('Product uploaded successfully!');
      // Redirect to home page
      navigate('/');

    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading product. Please try again.');
      setLoading(false);
    }
  };

  // Rest of the component remains the same...
  const getPreviewImage = (publicId) => {
    return cld
      .image(publicId)
      .format('auto')
      .quality('auto')
      .resize(fill().gravity(autoGravity()).width(200).height(200));
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
          {uploadedImageId ? (
            <AdvancedImage 
              cldImg={getPreviewImage(uploadedImageId)} 
              alt="Preview" 
            />
          ) : image && (
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