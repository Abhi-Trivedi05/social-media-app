import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, Paper, Tabs, Tab } from '@mui/material';
import API from '../utils/api';
import CreatePost from '../components/CreatePost';
import PostItem from '../components/PostItem';
import AuthContext from '../context/AuthContext';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await API.get('/api/posts', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };
        fetchPosts();
    }, [user.token]);

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <Box sx={{ pb: 8 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, overflowX: 'auto', p: 1, '::-webkit-scrollbar': { display: 'none' } }}>
                <Button variant={tabIndex === 0 ? "contained" : "outlined"} onClick={() => setTabIndex(0)} sx={{ borderRadius: 20, textTransform: 'none' }}>All Post</Button>
                <Button variant={tabIndex === 1 ? "contained" : "outlined"} onClick={() => setTabIndex(1)} sx={{ borderRadius: 20, textTransform: 'none', color: tabIndex !== 1 && 'text.primary', borderColor: tabIndex !== 1 && '#e0e0e0' }}>For You</Button>
                <Button variant={tabIndex === 2 ? "contained" : "outlined"} onClick={() => setTabIndex(2)} sx={{ borderRadius: 20, textTransform: 'none', color: tabIndex !== 2 && 'text.primary', borderColor: tabIndex !== 2 && '#e0e0e0' }}>Most Liked</Button>
                <Button variant={tabIndex === 3 ? "contained" : "outlined"} onClick={() => setTabIndex(3)} sx={{ borderRadius: 20, textTransform: 'none', color: tabIndex !== 3 && 'text.primary', borderColor: tabIndex !== 3 && '#e0e0e0' }}>Most Commented</Button>
            </Box>

            <CreatePost onPostCreated={handlePostCreated} />

            {posts.map((post) => (
                <PostItem key={post._id} post={post} />
            ))}
        </Box>
    );
};

export default Feed;
