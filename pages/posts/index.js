import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavbarBrand, Navbar, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar as NextUIAvatar } from "@nextui-org/react";
import { SearchIcon } from '@/public/SearchIcon';
import ReplyIcon from '@mui/icons-material/Reply';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const getRandomColor = (name) => {
    // Check if the name is defined and not empty
    if (name && name.length > 0) {
      // Get the ASCII value of the first letter of the name
      const charCode = name.charCodeAt(0);
      // Generate a color based on the ASCII value
      const colorIndex = charCode % 9;
      const colors = [
        red[500],
        '#2196f3', 
        '#4caf50', 
        '#ff9800', 
        '#9c27b0', 
        '#ffeb3b', 
        '#00bcd4', 
        '#e91e63', 
        '#795548', 
      ];
      return colors[colorIndex];
    } else {
      // Return a default color if name is undefined or empty
      return red[500]; // Red
    }
  };
  

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [comments, setComments] = useState([]);
  const [avatarColors, setAvatarColors] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error('Error fetching post data:', error));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setUserData(users))
      .catch(error => console.error('Error fetching user data:', error));

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(comments => setComments(comments))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

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
            <NavbarItem isActive>
              <Link href="/posts"  color="secondary">
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
              <NextUIAvatar
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
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'2rem'}}>
        {postData.map(post => {
          const user = userData.find(user => user.id === post.userId);
          const postComments = comments.filter(comment => comment.postId === post.id);
          return <PostCard key={post.id} post={post} user={user} comments={postComments} avatarColors={avatarColors} setAvatarColors={setAvatarColors} />;
        })}
      </div>
    </div>
  );
};

const PostCard = ({ post, user, comments, avatarColors, setAvatarColors }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    if (user && !avatarColors[user.id]) {
      setAvatarColors(prevState => ({
        ...prevState,
        [user.id]: getRandomColor()
      }));
    }
  }, [user, avatarColors, setAvatarColors]);

  return (
    <Card sx={{ width: '100%', maxWidth: 1000, marginBottom: 5, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <CardHeader
        avatar={
        <Avatar sx={{ bgcolor: getRandomColor(user?.name) || getRandomColor('') }} aria-label="recipe">
            {user ? user.name.charAt(0) : ''}
        </Avatar>
          
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user ? user.name : ''}
        subheader={user ? user.email : ''}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <div>
          <IconButton aria-label="show more" onClick={handleExpandClick}>
            <ExpandMoreIcon style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            <Typography variant="body2" style={{ marginLeft: '0.5rem', cursor: 'pointer' }}>See All Comments</Typography>
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div style={{ marginBottom:'1rem' }}>ALL COMMENTS:</div>
          {comments.map((comment, index) => (
            <div key={comment.id}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                <div style={{marginRight:'1rem'}}>
                <Avatar sx={{ bgcolor: getRandomColor(comment.name) || getRandomColor('') }} aria-label="comment-avatar">
                    {comment.email.charAt(0)}
                </Avatar>
                </div>
                <Typography variant="body2">
                  <strong>{comment.email}: </strong>{comment.body}
                </Typography>
              </div>
              <IconButton aria-label="reply">
                <ReplyIcon/>
                <div style={{fontSize:'18px', marginLeft:'1.5rem'}}> Reply</div>
              </IconButton>
              <div style={{marginBottom:'1rem'}}>
                {index !== comments.length - 1 && <hr />}
              </div>
            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Posts;
