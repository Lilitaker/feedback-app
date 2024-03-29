import { useParams } from 'react-router-dom'; // GET PARAMS
import { Navigate, useNavigate, Routes, Route } from 'react-router-dom';

const Post = () => {
  // GET PARAMS
  // const params = useParams();

  const status = 200;
  const navigate = useNavigate();

  const onClick = () => {
    console.log('Hello');
    navigate('/about');
  };

  if (status === 404) {
    return <Navigate to='/notfound' />;
  }

  return (
    <div>
      <h1>Post</h1>
      <button onClick={onClick}>Click</button>
      <Routes>
        <Route path='/show' element={<h1>Hello World!</h1>} />
      </Routes>

      {/* Getting PARAMS */}
      {/* <h1>Post {params.id}</h1>
      <p>Name: {params.name}</p> */}
    </div>
  );
};

export default Post;
