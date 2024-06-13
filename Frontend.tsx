import React, { useState, useEffect } from 'react';

interface Feedback {
  name: string;
  feedback: string;
}

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, feedback })
      });
      if (response.ok) {
        alert('Feedback submitted successfully!');
        setName('');
        setFeedback('');
      } else {
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br /><br />
      
      <label htmlFor="feedback">Feedback:</label><br />
      <textarea
        id="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={4}
        cols={50}
        required
      ></textarea><br /><br />
      
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:3000/feedbacks');
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getFeedbacks();
  }, []);

  return (
    <div>
      {feedbacks.map((feedback, index) => (
        <div key={index}>
          <strong>Name:</strong> {feedback.name}<br />
          <strong>Feedback:</strong> {feedback.feedback}<br /><br />
        </div>
      ))}
    </div>
  );
};

const FeedbackApp: React.FC = () => {
  return (
    <div>
      <h1>Feedback Management System</h1>
      <FeedbackForm />
      <h2>All Feedbacks</h2>
      <FeedbackList />
    </div>
  );
};

export default FeedbackApp;