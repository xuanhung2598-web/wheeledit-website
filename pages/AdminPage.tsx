import React, { useState, useEffect } from 'react';
import { BlogPost, HomepageData, Service, Testimonial, WhyChooseUsFeature, ContactInfo, SocialLink } from '../types';

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

    // Blog Post Handlers
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
    
    // Homepage Content Handlers
    const handleHomepageChange = (path: (string|number)[], value: any) => {
        if (!homepageData) return;
        
        // Deep copy to avoid direct state mutation
        const newData = JSON.parse(JSON.stringify(homepageData));
        
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;

        setHomepageData(newData);
    };
    
    const addArrayItem = (path: (string|number)[], newItem: any) => {
        if (!homepageData) return;
        const newData = JSON.parse(JSON.stringify(homepageData));
        
        let current = newData;
        for (let i = 0; i < path.length; i++) {
            current = current[path[i]];
        }
        current.push(newItem);
        setHomepageData(newData);
    };

    const deleteArrayItem = (path: (string|number)[], index: number) => {
        if (!homepageData || !window.confirm('Are you sure you want to delete this item?')) return;
        
        const newData = JSON.parse(JSON.stringify(homepageData));
        
        let array = newData;
        for (let i = 0; i < path.length; i++) {
            array = array[path[i]];
        }
        array.splice(index, 1);
        setHomepageData(newData);
    };


    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><p>Loading admin panel...</p></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">Error: {error}</p></div>;
    
    const inputClass = "p-2 border rounded w-full mb-2 text-gray-800 bg-white";
    const textareaClass = "p-2 border rounded w-full mb-2 text-gray-800 bg-white";
    const labelClass = "block text-sm font-medium text-gray-700";
    const sectionClass = "bg-white p-6 rounded-lg shadow-md space-y-4";
    const sectionTitleClass = "text-xl font-bold border-b pb-2 mb-4 text-gray-800";
    const itemWrapperClass = "border p-4 rounded-md mt-4 space-y-2 relative bg-gray-50";
    const deleteButtonClass = "absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded text-xs hover:bg-red-600";
    const addButtonClass = "bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 mt-4 text-sm";


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
                                    <input name="title" value={currentPost.title} onChange={handlePostChange} placeholder="Title" className={inputClass}/>
                                    <input name="id" value={currentPost.id} onChange={handlePostChange} placeholder="ID (slug)" className={inputClass}/>
                                    <input name="author" value={currentPost.author} onChange={handlePostChange} placeholder="Author" className={inputClass}/>
                                    <input name="date" type="date" value={currentPost.date} onChange={handlePostChange} placeholder="Date" className={inputClass}/>
                                </div>
                                <input name="imageUrl" value={currentPost.imageUrl} onChange={handlePostChange} placeholder="Image URL" className={`${inputClass} mt-4`}/>
                                <textarea name="excerpt" value={currentPost.excerpt} onChange={handlePostChange} placeholder="Excerpt" rows={3} className={`${textareaClass} mt-4`}/>
                                <textarea name="content" value={currentPost.content} onChange={handlePostChange} placeholder="Content (Markdown)" rows={10} className={`${textareaClass} mt-4`}/>
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
                         <div className="space-y-8">
                            {/* Hero Section */}
                            <div className={sectionClass}>
                                <h3 className={sectionTitleClass}>Hero Section</h3>
                                <label className={labelClass}>Title</label>
                                <input value={homepageData.hero.title} onChange={(e) => handleHomepageChange(['hero', 'title'], e.target.value)} className={inputClass}/>
                                <label className={labelClass}>Subtitle</label>
                                <textarea value={homepageData.hero.subtitle} onChange={(e) => handleHomepageChange(['hero', 'subtitle'], e.target.value)} className={textareaClass} rows={2}/>
                                <label className={labelClass}>Button Text</label>
                                <input value={homepageData.hero.buttonText} onChange={(e) => handleHomepageChange(['hero', 'buttonText'], e.target.value)} className={inputClass}/>
                                 <label className={labelClass}>Background Image URL</label>
                                <input value={homepageData.hero.backgroundImage} onChange={(e) => handleHomepageChange(['hero', 'backgroundImage'], e.target.value)} className={inputClass}/>
                            </div>
                             
                            {/* Services Section */}
                            <div className={sectionClass}>
                                <h3 className={sectionTitleClass}>Services Section</h3>
                                {homepageData.services.map((service, index) => (
                                    <div key={index} className={itemWrapperClass}>
                                        <h4 className="font-bold text-md text-gray-600">Service #{index + 1}: {service.name}</h4>
                                        <button onClick={() => deleteArrayItem(['services'], index)} className={deleteButtonClass}>Delete</button>
                                        <label className={labelClass}>Name</label><input value={service.name} onChange={(e) => handleHomepageChange(['services', index, 'name'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Price</label><input value={service.price} onChange={(e) => handleHomepageChange(['services', index, 'price'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Description</label><textarea value={service.description} onChange={(e) => handleHomepageChange(['services', index, 'description'], e.target.value)} className={textareaClass} rows={3} />
                                        <label className={labelClass}>Before Image URL</label><input value={service.beforeImg} onChange={(e) => handleHomepageChange(['services', index, 'beforeImg'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>After Image URL</label><input value={service.afterImg} onChange={(e) => handleHomepageChange(['services', index, 'afterImg'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Video URL (optional)</label><input value={service.videoUrl} onChange={(e) => handleHomepageChange(['services', index, 'videoUrl'], e.target.value)} className={inputClass} />
                                        <div className="flex items-center"><input type="checkbox" checked={service.isTestable} onChange={(e) => handleHomepageChange(['services', index, 'isTestable'], e.target.checked)} className="mr-2 h-4 w-4" /><label>Is Testable?</label></div>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem(['services'], { id: `new-service-${Date.now()}`, name: 'New Service', price: '$0.00', description: '', beforeImg: '', afterImg: '', isTestable: false, videoUrl: '' })} className={addButtonClass}>Add New Service</button>
                            </div>

                            {/* Why Choose Us */}
                            <div className={sectionClass}>
                                <h3 className={sectionTitleClass}>Why Choose Us Section</h3>
                                <label className={labelClass}>Title</label>
                                <input value={homepageData.whyChooseUs.title} onChange={(e) => handleHomepageChange(['whyChooseUs', 'title'], e.target.value)} className={inputClass}/>
                                <label className={labelClass}>Description</label>
                                <textarea value={homepageData.whyChooseUs.description} onChange={(e) => handleHomepageChange(['whyChooseUs', 'description'], e.target.value)} className={textareaClass} rows={4}/>
                                
                                <h4 className="text-lg font-semibold border-t pt-4 mt-4 text-gray-800">Features</h4>
                                {homepageData.whyChooseUs.features.map((feature, index) => (
                                    <div key={index} className={itemWrapperClass}>
                                        <button onClick={() => deleteArrayItem(['whyChooseUs', 'features'], index)} className={deleteButtonClass}>Delete</button>
                                        <label className={labelClass}>Icon (e.g., "fas fa-rocket")</label><input value={feature.icon} onChange={(e) => handleHomepageChange(['whyChooseUs', 'features', index, 'icon'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Title</label><input value={feature.title} onChange={(e) => handleHomepageChange(['whyChooseUs', 'features', index, 'title'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Description</label><textarea value={feature.description} onChange={(e) => handleHomepageChange(['whyChooseUs', 'features', index, 'description'], e.target.value)} className={textareaClass} rows={2} />
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem(['whyChooseUs', 'features'], { icon: 'fas fa-star', title: 'New Feature', description: '' })} className={addButtonClass}>Add New Feature</button>
                            </div>

                            {/* Testimonials */}
                            <div className={sectionClass}>
                                <h3 className={sectionTitleClass}>Testimonials Section</h3>
                                {homepageData.testimonials.map((testimonial, index) => (
                                    <div key={index} className={itemWrapperClass}>
                                        <button onClick={() => deleteArrayItem(['testimonials'], index)} className={deleteButtonClass}>Delete</button>
                                        <label className={labelClass}>Quote</label><textarea value={testimonial.quote} onChange={(e) => handleHomepageChange(['testimonials', index, 'quote'], e.target.value)} className={textareaClass} rows={3} />
                                        <label className={labelClass}>Author</label><input value={testimonial.author} onChange={(e) => handleHomepageChange(['testimonials', index, 'author'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Company</label><input value={testimonial.company} onChange={(e) => handleHomepageChange(['testimonials', index, 'company'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Avatar Image URL</label><input value={testimonial.avatar} onChange={(e) => handleHomepageChange(['testimonials', index, 'avatar'], e.target.value)} className={inputClass} />
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem(['testimonials'], { quote: '', author: 'New Author', company: '', avatar: 'https://i.pravatar.cc/80' })} className={addButtonClass}>Add New Testimonial</button>
                            </div>
                             
                            {/* Contact Section */}
                            <div className={sectionClass}>
                                <h3 className={sectionTitleClass}>Contact Section</h3>
                                
                                <h4 className="text-lg font-semibold text-gray-800">Contact Information</h4>
                                {homepageData.contact.info.map((info, index) => (
                                     <div key={index} className={itemWrapperClass}>
                                        <button onClick={() => deleteArrayItem(['contact', 'info'], index)} className={deleteButtonClass}>Delete</button>
                                        <label className={labelClass}>Icon</label><input value={info.icon} onChange={(e) => handleHomepageChange(['contact', 'info', index, 'icon'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Text</label><input value={info.text} onChange={(e) => handleHomepageChange(['contact', 'info', index, 'text'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Link (href)</label><input value={info.href} onChange={(e) => handleHomepageChange(['contact', 'info', index, 'href'], e.target.value)} className={inputClass} />
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem(['contact', 'info'], { icon: 'fas fa-link', text: 'New Info', href: '#' })} className={addButtonClass}>Add Contact Info</button>

                                <h4 className="text-lg font-semibold border-t pt-4 mt-4 text-gray-800">Social Media Links</h4>
                                 {homepageData.contact.social.map((link, index) => (
                                     <div key={index} className={itemWrapperClass}>
                                        <button onClick={() => deleteArrayItem(['contact', 'social'], index)} className={deleteButtonClass}>Delete</button>
                                        <label className={labelClass}>Icon</label><input value={link.icon} onChange={(e) => handleHomepageChange(['contact', 'social', index, 'icon'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Label (for accessibility)</label><input value={link.label} onChange={(e) => handleHomepageChange(['contact', 'social', index, 'label'], e.target.value)} className={inputClass} />
                                        <label className={labelClass}>Link (href)</label><input value={link.href} onChange={(e) => handleHomepageChange(['contact', 'social', index, 'href'], e.target.value)} className={inputClass} />
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem(['contact', 'social'], { icon: 'fab fa-twitter', label: 'Twitter', href: '#' })} className={addButtonClass}>Add Social Link</button>
                            </div>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;