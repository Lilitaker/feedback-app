import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); /* Spinner state */
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false /* If we click it, it will be set to true (we're in edit mode)  */,
  });

  //We want this side effect when the page loads, the dependency is empty because we want the function runs just once
  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch (get) feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  //Add feedback item
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  //Delete feedback item
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //Set item to be updated (needs the updateFeedback function)
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  //Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      /* Feedbacks array */
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback /* FeedbackList and FeedbackStats (state)*/,
        addFeedback /* FeedbackForm (function) */,
        deleteFeedback /* FeedbackItem (function) */,
        feedbackEdit /* FeedbackForm and RatingSelect (state) */,
        editFeedback /* FeedbackItem (function) */,
        updateFeedback /* FeedbackForm (function) */,
        isLoading /* FeebackList (state) */,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
