import { useState, useContext, useEffect } from 'react';

/* Other */
import FeedbackContext from '../context/FeedbackContext';

const RatingSelect = ({ select }) => {
  const [selected, setSelected] = useState(10);

  const { feedbackEdit } = useContext(FeedbackContext);

  /* Bring item's rating to UI form */
  useEffect(() => {
    setSelected(feedbackEdit.item.rating);
  }, [feedbackEdit]);

  const handleChange = (e) => {
    setSelected(+e.currentTarget.value);
    select(+e.currentTarget.value);
  };

  return (
    <div>
      <ul className='rating'>
        {Array.from({ length: 10 }, (_, i) => (
          <li key={`rating-${i + 1}`}>
            <input
              type='radio'
              id={`num${i + 1}`}
              name='rating'
              value={i + 1}
              onChange={handleChange}
              checked={selected === i + 1}
            />
            <label htmlFor={`num${i + 1}`}>{i + 1}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingSelect;
