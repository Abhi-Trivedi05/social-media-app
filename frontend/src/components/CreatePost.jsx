import { useState, useContext, useRef } from 'react';
import { Box, Paper, InputBase, IconButton, Button, Divider } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SortIcon from '@mui/icons-material/Sort';
import CampaignIcon from '@mui/icons-material/Campaign';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import API from '../utils/api';
import EmojiPicker from 'emoji-picker-react';
import AuthContext from '../context/AuthContext';

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { user } = useContext(AuthContext);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        }
    };

    const onEmojiClick = (emojiObject) => {
        setContent((prev) => prev + emojiObject.emoji);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !image) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const payload = { content, image };
            const { data } = await API.post('/api/posts', payload, config);
            setContent('');
            setImage('');
            setShowEmojiPicker(false);
            if (onPostCreated) {
                onPostCreated(data);
            }
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
            <Box sx={{ mb: 2 }}>
                <InputBase
                    sx={{ ml: 1, flex: 1, width: '100%' }}
                    placeholder="What's on your mind?"
                    multiline
                    minRows={2}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Box>

            {image && (
                <Box sx={{ mb: 2, position: 'relative', display: 'inline-block' }}>
                    <img src={image} alt="preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
                    <IconButton 
                        size="small" 
                        onClick={() => setImage('')} 
                        sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}

            {showEmojiPicker && (
                <Box sx={{ position: 'absolute', zIndex: 10, mt: 1 }}>
                    <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
                </Box>
            )}

            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <input 
                        type="file" 
                        accept="image/*,video/*" 
                        style={{ display: 'none' }} 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                    />
                    <IconButton color="primary" onClick={() => fileInputRef.current.click()}>
                        <PhotoCameraIcon />
                    </IconButton>
                    <IconButton color="action" onClick={() => setShowEmojiPicker((prev) => !prev)}>
                        <InsertEmoticonIcon />
                    </IconButton>
                    <IconButton color="action" component="span">
                        <SortIcon />
                    </IconButton>
                    <Button startIcon={<CampaignIcon />} sx={{ textTransform: 'none', color: 'text.secondary', ml: 1 }}>
                        Promote
                    </Button>
                </Box>
                <Button 
                    variant="contained" 
                    endIcon={<SendIcon />} 
                    onClick={handleSubmit}
                    sx={{ borderRadius: 20, bgcolor: '#e0e0e0', color: 'text.primary', '&:hover': { bgcolor: '#d5d5d5' } }}
                    disableElevation
                >
                    Post
                </Button>
            </Box>
        </Paper>
    );
};

export default CreatePost;
