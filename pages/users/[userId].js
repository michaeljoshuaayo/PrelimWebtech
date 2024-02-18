import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Avatar, Input } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Image, CardFooter, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { SearchIcon } from '@/public/SearchIcon';

const TodoList = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (userId) {
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
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">michaeljoshua@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <h1>User To-do List</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
