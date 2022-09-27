//import PropTypes from 'prop-types'; /* impt */

import { useContext } from 'react';

/* Other */
import FeedbackContext from '../context/FeedbackContext';

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext);

  //Calculate ratings avg
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback.length;

  //Average with one decimal / if it's .0 replace it with an empty string
  average = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
};

/* Just with useState with feedback as a prop, no needed with context*/
/* FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired
} */

export default FeedbackStats;
