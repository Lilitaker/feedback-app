import { FaTimes, FaEdit } from 'react-icons/fa'; /* Font Awesome library */
import PropTypes from 'prop-types'; /* impt */
import { useContext } from 'react';

/* Components */
import Card from './shared/Card';

/* Other */
import FeedbackContext from '../context/FeedbackContext';

const FeedbackItem = ({ item }) => {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <button onClick={() => editFeedback(item)} className='edit'>
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  );
};

FeedbackItem.protoTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
