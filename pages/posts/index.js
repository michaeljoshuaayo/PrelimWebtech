import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavbarBrand, Navbar, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar as NextUIAvatar } from "@nextui-org/react";
import { SearchIcon } from '@/public/SearchIcon';
import ReplyIcon from '@mui/icons-material/Reply';
import { Image } from "@nextui-org/react";

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
// Existing imports...

const PostCard = ({ post, user, comments, avatarColors, setAvatarColors }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 1000, marginBottom: 5, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <CardHeader
        avatar={
          <Image
            src={`https://i.pravatar.cc/150?img=${user?.id}`}
            alt={user?.name}
            width={40}
            height={40}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant='body1' fontWeight='bold'>{user ? user.name : ''} </Typography>}
        subheader={<Typography variant='body2' color="primary">{user ? user.email : ''} </Typography>}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
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
                  <div style={{ width: 40, height: 40, overflow: 'hidden', borderRadius: '50%' }}>
                    <Image
                      src={`https://i.pravatar.cc/150?img=${comment.id}`}
                      alt={comment.email}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
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
