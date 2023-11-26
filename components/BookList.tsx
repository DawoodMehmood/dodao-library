"use client";
import React, { useState, useEffect } from "react";
import { useBookContext } from "./BookContext";

interface BookListProps {
  role: string; 
}

interface Book {
  id: number;
  bookName: string;
  authorName: string;
  ISBN: string;
  price: string;
  availability: boolean;
}

const BookList: React.FC<BookListProps> = ({ role }) => {
  const { books, fetchBooks } = useBookContext();
  const [editBook, setEditBook] = useState(false);
  const [bookToBeUpdated, setBookToBeUpdated] = useState<Book>({
    id: 0,
    bookName: "",
    authorName: "",
    ISBN: "",
    price: "",
    availability: true,
  });

  // Function to handle editing a book
  const handleEdit = (book: Book) => {
    setEditBook(true);
    setBookToBeUpdated(book);
  };

  // Function to handle updating a book
  const handleUpdate = async () => {
    try {
      
      const response = await fetch(`/api/updateBook/${bookToBeUpdated.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookToBeUpdated),
      });

      if (response.ok) {
        fetchBooks();
        setEditBook(false); 
      } else {
        console.error("Failed to update book");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseEdit = () => {
    setEditBook(false);
  };

  const handleDelete = async (bookId: number) => {
    try {
      const response = await fetch(`/api/deleteBook/${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBooks();
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle borrowing a book
  const handleBorrow = async (book: Book) => {
    try {
      book.availability = false;
      const response = await fetch(`/api/updateBook/${book.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        fetchBooks();
      } else {
        console.error("Failed to borrow book");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex text-center flex-col my-8 mx-auto">
      <h1 className="text-xl font-bold">Books List</h1>
      <table className="table-auto my-4 shadow-lg">
        <thead>
          <tr className="shadow py-32">
            <th>Book Name</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Price</th>
            {role !== "" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            if (book.availability) {
              return (
                <tr key={book.id} className="shadow py-32">
                  <td>{book.bookName}</td>
                  <td>{book.authorName}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.price}</td>
                  <td>
                    {role === "student" && (
                      <button
                        className="bg-cyan-500 rounded w-14 h-8 mx-1"
                        onClick={() => handleBorrow(book)}
                      >
                        Borrow
                      </button>
                    )}
                    {role === "author" && (
                      <>
                        <button
                          className="bg-purple-500 rounded w-14 h-8 mx-1"
                          onClick={() => handleEdit(book)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 rounded w-14 h-8 mx-1"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      {editBook && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Book</h2>

            <div className="my-4 flex flex-col gap-4 items-center justify-center border-2 p-4 rounded-lg">
              <div className="flex gap-4 items-center justify-center">
                <label className="w-24 text-right">Book Name:</label>
                <input
                  type="text"
                  name="bookName"
                  className="border px-2 py-1 w-48"
                  value={bookToBeUpdated.bookName}
                  onChange={(e) =>
                    setBookToBeUpdated({
                      ...bookToBeUpdated,
                      bookName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-4 items-center justify-center">
                <label className="w-24 text-right whitespace-nowrap">
                  Author Name:
                </label>
                <input
                  type="text"
                  name="authorName"
                  className="border px-2 py-1 w-48"
                  value={bookToBeUpdated.authorName}
                  onChange={(e) =>
                    setBookToBeUpdated({
                      ...bookToBeUpdated,
                      authorName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-4 items-center justify-center">
                <label className="w-24 text-right">ISBN:</label>
                <input
                  type="text"
                  name="ISBN"
                  className="border px-2 py-1 w-48"
                  value={bookToBeUpdated.ISBN}
                  onChange={(e) =>
                    setBookToBeUpdated({
                      ...bookToBeUpdated,
                      ISBN: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-4 items-center justify-center">
                <label className="w-24 text-right">Price:</label>
                <input
                  type="text"
                  name="price"
                  className="border px-2 py-1 w-48"
                  value={bookToBeUpdated.price}
                  onChange={(e) =>
                    setBookToBeUpdated({
                      ...bookToBeUpdated,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <button
                  className="bg-blue-500 text-white rounded px-3 py-1"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="bg-gray-300 rounded px-3 py-1 ml-2"
                  onClick={handleCloseEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
