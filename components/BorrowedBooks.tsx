"use client";
import React from "react";
import { useBookContext } from "./BookContext";

interface Book {
    id: number;
    bookName: string;
    authorName: string;
    ISBN: string;
    price: string;
    availability: boolean;
  }

const BorrowedBooks = () => {
  const { books, fetchBooks } = useBookContext();

  // Function to handle returning a book
  const handleReturn = async (book: Book) => {
    try {
        book.availability = true;
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
        console.error("Failed to return book");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex text-center flex-col my-8 mx-auto max-w-[1000px]">
      <h1 className="text-xl font-bold">Borrowed Books</h1>

      <table className="table-auto my-4 shadow-lg">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            if (!book.availability) {
              return (
                <tr key={book.id} className="shadow py-32">
                  <td>{book.bookName}</td>
                  <td>{book.authorName}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.price}</td>
                  <td>
                    <button
                      className="bg-purple-500 rounded p-1 inline-flex mx-1"
                      onClick={() => handleReturn(book)}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooks;
