import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
// import Book from './Components/Book';
// import ReviewForm from './Components/ReviewFrom';
import ReviewPage from './Components/ReviewFrom';
// import Search from './Components/Search';
// import BookSelf from './Components/BookSelf';

function App() {
    const books = [
        {
          id: 1,
          title: 'Book Title 1',
          author: 'Author 1',
          description: 'Description of Book 1',
          image: 'https://via.placeholder.com/150',
          reviews: []
        },
        // Add more book data here
    ];

    return (
        <Router>  
            <Routes>
                <Route path="/" element={<Home books={books} />} />
                {/* <Route path="/books/:id" element={<Book books={books} />} /> */}
                <Route path="/review/:id" element={<ReviewPage />} />
                {/* <Route path="/book" element={<ReviewForm />} /> */}
            </Routes>
        </Router>
    );
}

export default App;