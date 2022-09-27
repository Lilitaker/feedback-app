import { useState, useContext, useEffect } from 'react';

/* Components */
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

/* Other */
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
  const [rating, setRating] = useState(10);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  /* Bring feedback to UI form - Add feedbackEdit in dependencies to run the callback function every time we click on a edit item icon, not just once */
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  /* Input text handler */
  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    const msgCondition = 'Text must be at least 10 characters';

    setText(inputValue);

    if (text === '') {
      setBtnDisabled(true);
      setMessage(msgCondition);
    } else if (text !== '' && inputValue.trim().length < 10) {
      setBtnDisabled(true);
      setMessage(msgCondition);
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
  };

  /* Form handler */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length > 10) {
      /* Creates an object with text and rating values */
      const newFeedback = {
        text /* === text: text, */,
        rating,
      };

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
