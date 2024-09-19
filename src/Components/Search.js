import React, { useState, useEffect } from "react";
import './Search.css';
import search from '../bg2.png'
import BookSelf from "./BookSelf";
// import BookSelf from "./BookSelf";
function Search() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      // Fetch books from API when the searchTerm changes
      const fetchBooks = async () => {
        try {
          const response = await fetch(
            "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(searchTerm)
          );
          const data = await response.json();
          console.log(data)
          setBooks(data.items || []);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      if (searchTerm) {
        fetchBooks();
      }
    }, [searchTerm]);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
    console.log("-============",books)

    return (
      <div>
        <div className="main-container">
          <div className="left-section">
            <div className="quote">
              <h2>A room without books is like</h2>
              <h3>a body without a soul.</h3>
            </div>
          </div>
          <div className="right-section">
            <h2>Find Your Book</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Type a book name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="button" onClick={() => setSearchTerm(searchTerm)}>
                <i className="fa fa-search"></i>
              </button>
            </div>
            <div className="illustration">
              <img
                src={search} 
                alt="Book illustration"
              />
            </div>
          </div>
        </div>
        <BookSelf books={books}/>
      </div>
    );
}

export default Search;
