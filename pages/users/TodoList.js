import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "@nextui-org/react";
import { SearchIcon } from '@/public/SearchIcon';

const TodoList = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUser(data));

      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => setTodos(data));
    }
  }, [userId]);

  return (
    <div>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <div className="flex items-center">
              <p className="sm:block font-bold text-inherit" style={{ fontSize: '1.5rem', color: '#333', marginRight: '0.5rem' }}>PRELIM GROUP 14</p>
              <div style={{ width: '100%', borderTop: '1px solid #333', marginRight:'17rem'}}></div>
            </div>
          </NavbarBrand>
          <NavbarContent className="sm:flex gap-4">
            <NavbarItem>
              <Link color="foreground" href="/">
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/posts"  color="foreground">
                Posts
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link color="secondary" href="/users">
                Users
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "w-[10rem] sm:w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 border border-gray-300 ", 
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <Avatar
            isBordered
            className="transition-transform ml-3"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </NavbarContent>
      </Navbar>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md mx-auto mt-8">
          {user && (
            <Card style={{ marginTop: '2rem', width: '40rem' }}> {/* Adjust the width as needed */}
              <CardHeader className="text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="font-bold text-lg" style={{ fontSize: '1.5rem' }}>{user.name}'s To-do List</h2>
                <div>
                  <Button color="primary" size="small" onClick={() => router.back()}>Go Back</Button>
                </div>
              </CardHeader>
              <CardBody>
                <div style={{ marginBottom: '1rem' }}>Total Todos: {todos.length}</div>
                {todos.map((todo, index) => (
                  <div key={todo.id} className={`mb-2 ${index !== todos.length - 1 ? 'border-b border-gray-300 pb-2' : ''}`}>
                    <p style={{ marginBottom: "0.5rem" }}><strong>Task:</strong> {todo.title}</p>
                    <p style={{ marginBottom: "0.5rem" }}>
                      <strong>Status:</strong>{" "}
                      <span style={{ color: todo.completed ? "green" : "red" }}>
                        {todo.completed ? "Completed" : "Incomplete"}
                      </span>
                    </p>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
