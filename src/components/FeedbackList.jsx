//import { motion, AnimatePresence } from 'framer-motion';
//import PropTypes from 'prop-types';
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackList = () => {

  const {feedback} = useContext(FeedbackContext);
  
  if(!feedback || feedback.length === 0) {
    return <p>No feedback yet</p>
  }

  /* Version with the animation */
  /* return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem 
            key={item.id} 
            item={item} 
            handleDelete={handleDelete} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  ) */

  /* Version without the animation */
  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <FeedbackItem 
          key={item.id} 
          item={item} 
          />
      ))}
    </div>
  )
}

/* Just with useState and feedback as a prop */
/* FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
  )
}
 */

export default FeedbackList;