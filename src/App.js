import { v4 as uuidv4} from 'uuid';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Card from './components/shared/Card'; /* NavLink */
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import FeedbackData from './data/FeedbackData';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './pages/AboutPage';

function App() {

  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback) => {
    //Generate an unique ID with UUID - It throws a string, not a number, that's why we need the +
    newFeedback.id = uuidv4(); 
    setFeedback([newFeedback, ...feedback])
  }

  /* We call this function here because the data is in App */
  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route exact path='/' element={
            <>
              <FeedbackForm handleAdd={addFeedback}/>
              <FeedbackStats feedback={feedback} />
              <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
            </>
          }>
          </Route>
          <Route path='about' element={<AboutPage />} />
        </Routes>

        {/* Example of using NavLink */}
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
  )
}

export default App;