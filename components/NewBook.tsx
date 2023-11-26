"use client";
import React from "react";
import { useState } from "react";
import { useBookContext } from "./BookContext";

const NewBook = () => {
    const { fetchBooks } = useBookContext();
  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    ISBN: "",
    price: "",
    availability: true,
  });

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/createBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchBooks();
        setFormData({  // Clear the form after successful addition
          bookName: "",
          authorName: "",
          ISBN: "",
          price: "",
        availability: true,
        });
      } else {
        // Handle error response
      }

    } catch (error) {
      // Handle fetch error
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col my-8 mx-auto max-w-[1000px] ">
      <h1 className="text-xl font-bold">Add New Book</h1>
      <form
        className="my-4 flex flex-col gap-4 items-center justify-center border-2 p-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 items-center justify-center">
          <label className="w-24 text-right">Book Name:</label>
          <input
            type="text"
            name="bookName"
            className="border px-2 py-1 w-48"
            value={formData.bookName}
            onChange={(e) =>
              setFormData({ ...formData, bookName: e.target.value })
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
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
          />
        </div>
        <div className="flex gap-4 items-center justify-center">
          <label className="w-24 text-right">ISBN:</label>
          <input
            type="text"
            name="ISBN"
            className="border px-2 py-1 w-48"
            value={formData.ISBN}
            onChange={(e) => setFormData({ ...formData, ISBN: e.target.value })}
          />
        </div>
        <div className="flex gap-4 items-center justify-center">
          <label className="w-24 text-right">Price:</label>
          <input
            type="text"
            name="price"
            className="border px-2 py-1 w-48"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="bg-cyan-500 rounded px-2 py-1 inline-flex"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default NewBook;
