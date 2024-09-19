import './BookSelf.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookSelf = ({ books = [] }) => {
  const [expandedBookIds, setExpandedBookIds] = useState({});
  const navigate = useNavigate();

  const toggleReadMore = (bookId) => {
    setExpandedBookIds((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId]
    }));
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  const handleReviewClick = (book) => {
    // Pass the book details via navigate
    navigate(`/review/${book.id}`, { state: { book } });
  };

  return (
    <div className='bookself-main'>
      <h1>Book List</h1>
      <div className="book-list">
        {books.length > 0 ? (
          books.slice(0, 9).map((book) => (
            <div key={book.id} className="book-item">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
              <h3>{book.volumeInfo.title}</h3>
              <p className="authors">
                {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}
              </p>
              <button className='bookselfbtn' onClick={() => handleReviewClick(book)}>About More</button>
            </div>
          ))
        ) : (
          <p className='description'>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BookSelf;
