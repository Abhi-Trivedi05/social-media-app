import { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box, Divider, TextField, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';
import API from '../utils/api';
import AuthContext from '../context/AuthContext';

const PostItem = ({ post }) => {
    const { user } = useContext(AuthContext);
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState('');

    const isLiked = likes.find((like) => like.user === user._id);

    const handleLike = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await API.put(`/api/posts/${post._id}/like`, {}, config);
            setLikes(data.likes);
        } catch (error) {
            console.error('Error liking post', error);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await API.post(`/api/posts/${post._id}/comment`, { text: commentText }, config);
            setComments(data.comments);
            setCommentText('');
        } catch (error) {
            console.error('Error commenting on post', error);
        }
    };

    return (
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{post.username[0]}</Avatar>}
                action={
                    <Button variant="contained" size="small" sx={{ borderRadius: 20, mt: 1, mr: 1, textTransform: 'none' }}>
                        Follow
                    </Button>
                }
                title={<Typography variant="subtitle1" fontWeight="bold">{post.username}</Typography>}
                subheader={<Typography variant="caption" color="text.secondary">{moment(post.createdAt).format('ddd, D MMM, YYYY, h:mm:ss a')}</Typography>}
            />
            <CardContent>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {post.content}
                </Typography>
                {post.image && (
                    <Box mt={2}>
                        <img src={post.image} alt="Post content" style={{ width: '100%', borderRadius: 8 }} />
                    </Box>
                )}
            </CardContent>
            
            <Divider />
            
            <CardActions sx={{ justifyContent: 'space-around', p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handleLike} color={isLiked ? "error" : "default"}>
                        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Typography>{likes.length}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => setShowCommentBox(!showCommentBox)}>
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                    <Typography>{comments.length}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton>
                        <ShareIcon />
                    </IconButton>
                    <Typography>0</Typography>
                </Box>
            </CardActions>

            {showCommentBox && (
                <Box sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                    {comments.map((c, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                            <Typography variant="body2"><strong>{c.username}</strong>: {c.text}</Typography>
                        </Box>
                    ))}
                    <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', mt: 2 }}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <Button type="submit" variant="contained" sx={{ ml: 1 }}>Send</Button>
                    </Box>
                </Box>
            )}
        </Card>
    );
};

export default PostItem;
