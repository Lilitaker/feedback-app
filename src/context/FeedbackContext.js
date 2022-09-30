import { createContext, useState, useEffect } from 'react';

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
    // With the proxy (package.json) we delete http://localhost:5000 from here
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  //Add feedback item
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback) /* Turn to a JSON string */,
    });

    //This gives us the item that we added
    const data = await response.json();
    //Add it to the UI
    setFeedback([data, ...feedback]);
  };

  //Delete feedback item
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' });
      // Delete it from the UI
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
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    //Update it in the UI
    setFeedback(
      /* Feedbacks array */
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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
