import React, { useEffect, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { SearchIcon } from '@/public/SearchIcon';
import { MdPeople, MdDescription, MdComment, MdAssignment } from 'react-icons/md';
import { color } from "framer-motion";


export default function App() {
  const [userNum, userCount] = useState(0);
  const [postNum, postCount] = useState(0);
  const [commentNum, commentCount] = useState(0);
  const [todoNum, todoCount] = useState(0);
  const [userTodosCount, setUserTodosCount] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => userCount(users.length));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => postCount(posts.length));

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(comments => commentCount(comments.length));
    
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(todos => todoCount(todos.length));
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const promises = users.map(user => {
          return fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`)
            .then(response => response.json())
            .then(todos => ({ name: user.name, todoCount: todos.length }));
        });

        Promise.all(promises).then(todoCounts => {
          setUserTodosCount(todoCounts);
        });
      });
  }, []);

  const list = [
    {
      title: "Users",
      img: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
      number: userNum,
    },
    {
      title: "Posts",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
      number: postNum,
    },
    {
      title: "Comments",
      img: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
      number: commentNum,
    },
    {
      title: "Todos",
      img: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
      number: todoNum,
    },
  ];

  const [chartComponent, setChartComponent] = useState(null);

  useEffect(() => {
    import('react-apexcharts').then(ReactApexCharts => {
      const chartOptions = {
        chart: {
          height: 400,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: userTodosCount.map(user => user.name),
          labels: {
            style: {
              colors: '#black',
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#black',
            }
          }
        },
      };

      const chartSeries = [{
        data: userTodosCount.map(user => user.todoCount)
      }];

      setChartComponent(
        <div className="px-10 mt-5 text-neutral-950">
        <ReactApexCharts.default options={chartOptions} series={chartSeries} type="bar" height={350} />
        </div>
      );
    });
  }, [userTodosCount]);


  return (
  <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar isBordered className="mb-8">
        <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <div className="flex items-center">
            <p className="sm:block font-bold text-inherit" style={{ fontSize: '1.5rem', color: '#333', marginRight: '0.5rem' }}>PRELIM GROUP 14</p>
            <div style={{ width: '100%', borderTop: '1px solid #333', marginRight:'17rem'}}></div>
          </div>
        </NavbarBrand>
          <NavbarContent className="sm:flex gap-4">
            <NavbarItem isActive>
              <Link color="secondary" href="/">
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/posts"  color="foreground">
                Posts
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/users">
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
      <div style={{ marginBottom: '2rem' }}></div>
      <div className="flex justify-center gap-4 mb-8" >
      <Card shadow className="w-full max-w-sm">
        <CardBody className="flex items-center justify-center">
          <div className="flex items-center" style={{marginBottom:'2rem', marginTop:'2rem'}}>
            <MdPeople className="text-3xl mr-2" style={{ color: '#00abf0', fontSize: '2.5rem', marginLeft: '0.3rem' }} />
            <div className="flex flex-col">
              <p className="text-primary font-bold" style={{ fontSize: '3rem', color:"#00abf0", marginBottom: '0', marginLeft: '0.5rem', marginTop: '0.3rem' }}>{userNum}</p>
              <p className="text-sm text-gray-500" style={{ marginTop: '-0.5rem' }}>Users</p>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card shadow className="w-full max-w-sm">
        <CardBody className="flex items-center justify-center" style={{marginBottom:'2rem', marginTop:'2rem'}}>
          <div className="flex items-center">
            <MdDescription className="text-3xl mr-2" style={{ color: '#FF6961', fontSize: '2.5rem', marginLeft: '0.3rem' }} />
            <div className="flex flex-col">
              <p className="text-primary font-bold" style={{ fontSize: '3rem', color: '#FF6961', marginBottom: '0', marginLeft: '0.5rem', marginTop: '0.3rem' }}>{postNum}</p>
              <p className="text-sm text-gray-500" style={{ marginTop: '-0.5rem' }}>Posts</p>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card shadow className="w-full max-w-sm">
        <CardBody className="flex items-center justify-center" style={{marginBottom:'2rem', marginTop:'2rem'}}>
          <div className="flex items-center">
            <MdComment className="text-3xl mr-2" style={{ color: '#e80', fontSize: '2.5rem', marginLeft: '0.3rem' }} />
            <div className="flex flex-col">
              <p className="text-primary font-bold" style={{ fontSize: '3rem', color: '#e80', marginBottom: '0', marginLeft: '0.5rem', marginTop: '0.3rem' }}>{commentNum}</p>
              <p className="text-sm text-gray-500" style={{ marginTop: '-0.5rem' }}>Comments</p>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card shadow className="w-full max-w-sm">
        <CardBody className="flex items-center justify-center" style={{marginBottom:'2rem', marginTop:'2rem'}}>
          <div className="flex items-center">
            <MdAssignment className="text-3xl mr-2" style={{ color: '#9932cc', fontSize: '2.5rem', marginLeft: '0.3rem' }} />
            <div className="flex flex-col">
              <p className="text-primary font-bold" style={{ fontSize: '3rem', color: '#9932cc', marginBottom: '0', marginLeft: '0.5rem', marginTop: '0.3rem' }}>{todoNum}</p>
              <p className="text-sm text-gray-500" style={{ marginTop: '-0.5rem' }}>Todos</p>
            </div>
          </div>
        </CardBody>
      </Card>
      </div>
      <div style={{ marginBottom: '2rem' }}></div>
      <div className="chart-container px-20 mt-1 mb-8">
        <Card shadow>
          <CardBody>
            {chartComponent}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}