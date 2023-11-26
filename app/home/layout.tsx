"use client";
import { BookList, Navbar } from "@/components";
import { BookProvider } from "@/components/BookContext";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState(""); 

  const handleLogin = (selectedRole: string) => {
    setRole(selectedRole); 
  };

  useEffect(() => {
    setRole("");
  }, []);

  return (
    <BookProvider>
      <Navbar onLogin={handleLogin} />
      <BookList role={role} />
      {children}
    </BookProvider>
  );
}
