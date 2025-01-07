// PostContext.jsx
import React, { createContext, useState } from 'react';

export const PostContext = createContext(null);

function Post({ children }) {  // Fixed capitalization of "children" prop
  const [postDetails, setPostDetails] = useState(null);
  
  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}

export default Post;