//import Card from './components/shared/Card'; /* NavLink */

import {
  BrowserRouter as Router,
  Route,
  Routes,
  /*  NavLink, */
} from 'react-router-dom';

/* Components */
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutIconLink from './components/AboutIconLink';
import Post from './components/Post';
import AboutPage from './pages/AboutPage';

/* Other */
import { FeedbackProvider } from './context/FeedbackContext';
/* FeedbackProvider goes inside brackets because it isn't a default export  */

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>
            <Route path='/about' element={<AboutPage />} />
            <Route path='/post/*' element={<Post />} />

            {/* EXAMPLE OF GETTING PARAMS IN THE URL - USeful for blogs */}
            {/* <Route path='/post/:id/:name' element={<Post />} /> */}
          </Routes>

          {/* Example of NavLink - activeClassName isn't used anymore*/}
          {/* <Card>
            <NavLink to='/' activeClassName='active'>
              Home
            </NavLink>
            <NavLink to='/about' activeClassName='active'>
              About
            </NavLink>
          </Card> */}

          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
