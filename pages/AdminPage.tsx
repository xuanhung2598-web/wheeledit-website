import React, { useState, useEffect } from 'react';
import { BlogPost, HomepageData } from '../types';

const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'blog' | 'homepage'>('blog');
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
    const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [blogRes, homepageRes] = await Promise.all([
                    fetch('/data/blog.json'),
                    fetch('/data/homepage.json')
                ]);
                if (!blogRes.ok || !homepageRes.ok) {
                    throw new Error('Failed to fetch data.');
                }
                const blogData = await blogRes.json();
                const homeData = await homepageRes.json();
                
                const posts: BlogPost[] = blogData.posts || [];
                posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setBlogPosts(posts);
                setHomepageData(homeData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDownloadJson = (data: any, filename: string) => {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const handleSaveBlog = () => {
        handleDownloadJson({ posts: blogPosts }, 'blog.json');
    };

    const handleSaveHomepage = () => {
        handleDownloadJson(homepageData, 'homepage.json');
    };

    const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentPost) {
            setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
        }
    };

    const handleUpdatePost = () => {
        if (currentPost) {
            const updatedPosts = blogPosts.map(p => p.id === currentPost.id ? currentPost : p);
            setBlogPosts(updatedPosts);
            setCurrentPost(null);
        }
    };
    
    const handleAddNewPost = () => {
        const newPost: BlogPost = {
            id: 'new-post-' + Date.now(),
            title: 'New Post Title',
            author: 'Author Name',
            date: new Date().toISOString().split('T')[0],
            imageUrl: 'https://via.placeholder.com/800x400',
            excerpt: 'A short summary of the new post.',
            content: 'Write your markdown content here.'
        };
        setCurrentPost(newPost);
    };

    const handleCreatePost = () => {
        if(currentPost) {
            // Check if ID is unique
            if(blogPosts.some(p => p.id === currentPost.id)) {
                alert('Error: Post ID must be unique. Please change the ID.');
                return;
            }
            setBlogPosts([currentPost, ...blogPosts]);
            setCurrentPost(null);
        }
    };

    const handleDeletePost = (postId: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setBlogPosts(blogPosts.filter(p => p.id !== postId));
        }
    };
    
    const handleHomepageDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: keyof HomepageData, index: number | null = null, field: string) => {
        if (!homepageData) return;

        const newData = JSON.parse(JSON.stringify(homepageData)); // Deep copy

        if(index !== null) {
            (newData[section] as any[])[index][field] = e.target.value;
        } else {
            (newData[section] as any)[field] = e.target.value;
        }
        
        setHomepageData(newData);
    }

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><p>Loading admin panel...</p></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">Error: {error}</p></div>;

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                    <a href="#/" className="text-blue-600 hover:underline">Back to Website</a>
                </div>

                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                  <p className="font-bold">How to Save Changes</p>
                  <p>After editing, click the "Save and Download" button. A `.json` file will be downloaded. You must replace the existing file in the `/public/data/` folder of your project with this new file.</p>
                </div>

                <div className="flex border-b border-gray-300 mb-6">
                    <button onClick={() => setActiveTab('blog')} className={`py-2 px-4 text-lg font-semibold ${activeTab === 'blog' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Blog Posts</button>
                    <button onClick={() => setActiveTab('homepage')} className={`py-2 px-4 text-lg font-semibold ${activeTab === 'homepage' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Homepage Content</button>
                </div>

                {activeTab === 'blog' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-700">Manage Blog Posts</h2>
                            <button onClick={handleSaveBlog} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Save and Download blog.json</button>
                        </div>
                        
                        {currentPost ? (
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-xl font-bold mb-4">{currentPost.id.startsWith('new-post') ? 'Create New Post' : 'Edit Post'}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input name="title" value={currentPost.title} onChange={handlePostChange} placeholder="Title" className="p-2 border rounded w-full"/>
                                    <input name="id" value={currentPost.id} onChange={handlePostChange} placeholder="ID (slug)" className="p-2 border rounded w-full"/>
                                    <input name="author" value={currentPost.author} onChange={handlePostChange} placeholder="Author" className="p-2 border rounded w-full"/>
                                    <input name="date" type="date" value={currentPost.date} onChange={handlePostChange} placeholder="Date" className="p-2 border rounded w-full"/>
                                </div>
                                <input name="imageUrl" value={currentPost.imageUrl} onChange={handlePostChange} placeholder="Image URL" className="p-2 border rounded w-full mt-4"/>
                                <textarea name="excerpt" value={currentPost.excerpt} onChange={handlePostChange} placeholder="Excerpt" rows={3} className="p-2 border rounded w-full mt-4"/>
                                <textarea name="content" value={currentPost.content} onChange={handlePostChange} placeholder="Content (Markdown)" rows={10} className="p-2 border rounded w-full mt-4"/>
                                <div className="flex gap-4 mt-4">
                                    {currentPost.id.startsWith('new-post-') ? (
                                        <button onClick={handleCreatePost} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">Create Post</button>
                                    ) : (
                                        <button onClick={handleUpdatePost} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">Update Post</button>
                                    )}
                                    <button onClick={() => setCurrentPost(null)} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancel</button>
                                </div>
                            </div>
                        ) : (
                           <button onClick={handleAddNewPost} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 mb-4">Add New Post</button>
                        )}

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            {blogPosts.map(post => (
                                <div key={post.id} className="flex justify-between items-center p-3 border-b last:border-b-0">
                                    <div>
                                        <h4 className="font-bold">{post.title}</h4>
                                        <p className="text-sm text-gray-500">{post.id} - {post.date}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setCurrentPost(post)} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Edit</button>
                                        <button onClick={() => handleDeletePost(post.id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {activeTab === 'homepage' && homepageData && (
                     <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-700">Manage Homepage Content</h2>
                            <button onClick={handleSaveHomepage} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Save and Download homepage.json</button>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                            {/* Hero Section */}
                            <div>
                                <h3 className="text-xl font-bold border-b pb-2 mb-2">Hero Section</h3>
                                <label className="block text-sm font-medium">Title</label>
                                <input value={homepageData.hero.title} onChange={(e) => handleHomepageDataChange(e, 'hero', null, 'title')} className="p-2 border rounded w-full mb-2"/>
                                <label className="block text-sm font-medium">Subtitle</label>
                                <textarea value={homepageData.hero.subtitle} onChange={(e) => handleHomepageDataChange(e, 'hero', null, 'subtitle')} className="p-2 border rounded w-full mb-2" rows={2}/>
                                <label className="block text-sm font-medium">Button Text</label>
                                <input value={homepageData.hero.buttonText} onChange={(e) => handleHomepageDataChange(e, 'hero', null, 'buttonText')} className="p-2 border rounded w-full mb-2"/>
                                 <label className="block text-sm font-medium">Background Image URL</label>
                                <input value={homepageData.hero.backgroundImage} onChange={(e) => handleHomepageDataChange(e, 'hero', null, 'backgroundImage')} className="p-2 border rounded w-full"/>
                            </div>
                            {/* Why Choose Us */}
                            <div>
                                <h3 className="text-xl font-bold border-b pb-2 mb-2">Why Choose Us Section</h3>
                                <label className="block text-sm font-medium">Title</label>
                                <input value={homepageData.whyChooseUs.title} onChange={(e) => handleHomepageDataChange(e, 'whyChooseUs', null, 'title')} className="p-2 border rounded w-full mb-2"/>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea value={homepageData.whyChooseUs.description} onChange={(e) => handleHomepageDataChange(e, 'whyChooseUs', null, 'description')} className="p-2 border rounded w-full mb-2" rows={4}/>
                            </div>
                            {/* Add more sections for services, testimonials etc. here if needed */}
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
