import React, { createContext, useState, useContext, useEffect } from "react";

interface Book {
  availability: React.JSX.Element;
  id: number;
  bookName: string;
  authorName: string;
  ISBN: string;
  price: string;
}

interface BookContextProps {
  books: Book[];
  fetchBooks: () => void;
}

const BookContext = createContext<BookContextProps>({
  books: [],
  fetchBooks: () => {},
});

export const useBookContext = () => useContext(BookContext);

export const BookProvider: React.FC = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/retrieveAllBooks");
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle fetch error
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
};
