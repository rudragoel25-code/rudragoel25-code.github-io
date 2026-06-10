import React, { createContext, useState, useEffect } from 'react';

export const YouTubeContext = createContext();

const DEFAULT_VIDEOS = [
  {
    id: "HcOc7P5BMi4",
    title: "HTML & CSS Full Course",
    channel: "Apna College",
    views: 27000000,
    viewsText: "27M views",
    publishedText: "3 years ago",
    category: "Web Dev",
    description: "Welcome to the ultimate HTML & CSS course. In this video, we will learn everything you need to know about building websites from scratch. Perfect for beginners!",
    subscribers: "5.4M"
  },
  {
    id: "UB1O30fR-EE",
    title: "HTML Crash Course",
    channel: "Traversy Media",
    views: 34000000,
    viewsText: "3.4M views",
    publishedText: "2 years ago",
    category: "Web Dev",
    description: "This HTML crash course is designed for absolute beginners. We will go over HTML tags, elements, attributes, forms, and layout basics in this tutorial.",
    subscribers: "2.1M"
  },
  {
    id: "mU6anWqZJcc",
    title: "CSS Flexbox in 20 Minutes",
    channel: "Web Dev Simplified",
    views: 2000000,
    viewsText: "2M views",
    publishedText: "10 months ago",
    category: "Web Dev",
    description: "Flexbox is one of the most powerful layout tools in CSS, but it can be confusing. In this tutorial, I cover everything you need to know about Flexbox in just 20 minutes.",
    subscribers: "1.5M"
  },
  {
    id: "1Rs2ND1ryYc",
    title: "Complete HTML Tutorial",
    channel: "CodeWithHarry",
    views: 10000000,
    viewsText: "10M views",
    publishedText: "4 years ago",
    category: "Web Dev",
    description: "Learn HTML from scratch in this comprehensive Hindi tutorial. We cover tags, lists, tables, layouts, forms, SEO basics and building a complete website.",
    subscribers: "4.8M"
  },
  {
    id: "8jLOx1hD3_o",
    title: "C++ Full Course",
    channel: "freeCodeCamp.org",
    views: 9000000,
    viewsText: "9M views",
    publishedText: "2 years ago",
    category: "C++",
    description: "This course will give you a full introduction into all of the core concepts in C++. Follow along to set up your environment, write syntax, work with arrays, pointers, and OOP.",
    subscribers: "10.2M"
  },
  {
    id: "BBpAmxU_NQo",
    title: "Data Structures & Algorithms",
    channel: "Abdul Bari",
    views: 4000000,
    viewsText: "4M views",
    publishedText: "1 year ago",
    category: "DSA",
    description: "Learn the core concepts of Data Structures and Algorithms. This video provides a high-level explanation of analysis, array representations, sorting methods, and tree traversals.",
    subscribers: "890K"
  },
  {
    id: "qz0aGYrrlhU",
    title: "HTML Tutorial for Beginners",
    channel: "Programming with Mosh",
    views: 8000000,
    viewsText: "8M views",
    publishedText: "5 years ago",
    category: "Web Dev",
    description: "HTML tutorial for beginners. Learn HTML5 from scratch in this crash course. Build a web page, master semantic tags, structure data and styling hooks.",
    subscribers: "3.9M"
  },
  {
    id: "yfoY53QXEnI",
    title: "CSS Crash Course",
    channel: "Traversy Media",
    views: 5000000,
    viewsText: "5M views",
    publishedText: "6 years ago",
    category: "Web Dev",
    description: "An in-depth introduction to CSS styling. Learn selectors, text styling, colors, padding/margin, floats, positioning, and custom modern layouts.",
    subscribers: "2.1M"
  },
  {
    id: "RBSGKlAvoiM",
    title: "Data Structures Full Course",
    channel: "freeCodeCamp.org",
    views: 6000000,
    viewsText: "6M views",
    publishedText: "3 years ago",
    category: "DSA",
    description: "This comprehensive course will teach you about data structures: Arrays, Linked Lists, Stacks, Queues, Hash Tables, Trees, Graphs, and algorithm analysis.",
    subscribers: "10.2M"
  },
  {
    id: "zJSY8tbf_ys",
    title: "JavaScript Full Course",
    channel: "freeCodeCamp.org",
    views: 12000000,
    viewsText: "12M views",
    publishedText: "3 years ago",
    category: "Web Dev",
    description: "Learn JavaScript in this full course designed for beginners. Understand variables, functions, conditional logic, objects, event handlers, and modern ES6 features.",
    subscribers: "10.2M"
  },
  {
    id: "OK_JCtrrv-c",
    title: "Git & GitHub Tutorial",
    channel: "Apna College",
    views: 2800000,
    viewsText: "2.8M views",
    publishedText: "1 year ago",
    category: "Web Dev",
    description: "Master Git and GitHub in this complete guide. Learn how repositories work, staging, commits, pushing, pulling, cloning, branching, merging, and collaboration.",
    subscribers: "5.4M"
  },
  {
    id: "W6NZfCO5SIk",
    title: "JavaScript in 1 Hour",
    channel: "Programming with Mosh",
    views: 15000000,
    viewsText: "15M views",
    publishedText: "4 years ago",
    category: "Web Dev",
    description: "Quickly learn the fundamentals of JavaScript in this fast-paced 1-hour tutorial. Variables, types, arrays, functions, and control flows explained clearly.",
    subscribers: "3.9M"
  },
  {
    id: "nu_pCVPKzTk",
    title: "React JS Full Course",
    channel: "freeCodeCamp.org",
    views: 5000000,
    viewsText: "5M views",
    publishedText: "2 years ago",
    category: "Web Dev",
    description: "An intensive course on React JS. Build real projects, understand components, props, state, hooks (useState, useEffect), contexts, and clean single-page patterns.",
    subscribers: "10.2M"
  },
  {
    id: "XKHEtdqhLK8",
    title: "Python Tutorial for Beginners",
    channel: "Programming with Mosh",
    views: 22000000,
    viewsText: "22M views",
    publishedText: "4 years ago",
    category: "Podcasts",
    description: "Python tutorial for beginners. Learn the absolute basics of Python programming: installation, variables, standard inputs, math operations, strings, loops, and objects.",
    subscribers: "3.9M"
  },
  {
    id: "ua-CiDNNj30",
    title: "Operating Systems Full Course",
    channel: "Gate Smashers",
    views: 3200000,
    viewsText: "3.2M views",
    publishedText: "2 years ago",
    category: "Podcasts",
    description: "Learn all about Operating Systems. Process scheduling, memory management, deadlock prevention, disk organization, paging, and synchronization algorithms.",
    subscribers: "1.2M"
  },
  // Adding specific videos for the rest of categories to feel fully working with real IDs
  {
    id: "VpZ6Kq8A1t8",
    title: "IPL Thrilling Cricket Highlights",
    channel: "IPL Official",
    views: 12000000,
    viewsText: "12M views",
    publishedText: "1 month ago",
    category: "IPL",
    description: "Witness the historical super over finish. See how the batsmen pulled off an incredible finish to lift the trophy!",
    subscribers: "8.5M"
  },
  {
    id: "2t5lJ0wU5-w",
    title: "I Survived 100 Days in Hardcore Minecraft!",
    channel: "MrBeast Gaming",
    views: 8500000,
    viewsText: "8.5M views",
    publishedText: "3 months ago",
    category: "Gaming",
    description: "Welcome to my hardcore Minecraft world. Watch my progression to defeating the Ender Dragon under extreme constraints!",
    subscribers: "740K"
  },
  {
    id: "hHW1oY26kxQ",
    title: "Lo-Fi Beats for Coding, Designing & Relaxing",
    channel: "Lofi Girl",
    views: 45000000,
    viewsText: "45M views",
    publishedText: "5 months ago",
    category: "Music",
    description: "Sit back, fire up your IDE, and enjoy the ultimate selection of chilled lofi beats. Perfect for deep focus, web development, coding, and sketching layouts.",
    subscribers: "14.3M"
  },
  {
    id: "aircAruvnKk",
    title: "How Neural Networks Actually Work Under the Hood",
    channel: "3Blue1Brown",
    views: 1200000,
    viewsText: "1.2M views",
    publishedText: "6 months ago",
    category: "Artificial Intelligence",
    description: "Neural networks explained simply. In this video, we break down transformers, embeddings, weights, and backpropagation mechanisms.",
    subscribers: "3.1M"
  },
  {
    id: "i_LwzRVPgys",
    title: "Machine Learning Course for Beginners",
    channel: "freeCodeCamp.org",
    views: 2300000,
    viewsText: "2.3M views",
    publishedText: "9 months ago",
    category: "Machine Learning",
    description: "Understand the mathematical foundations and code implementations of Machine Learning: regression, classification, clustering, vector spaces, and building ML models with Python.",
    subscribers: "10.2M"
  },
  {
    id: "PlHnamDwGmw",
    title: "Cyber Security Full Course: Learn Ethical Hacking",
    channel: "Edureka",
    views: 1500000,
    viewsText: "1.5M views",
    publishedText: "1 year ago",
    category: "Cyber Security",
    description: "Get started in Cyber Security and Ethical Hacking. Learn penetration testing, network firewalls, cryptography, social engineering, OWASP top 10, and vulnerability scans.",
    subscribers: "4.2M"
  },
  // 5 More High Quality Programming Videos
  {
    id: "SqcY0GlETPk",
    title: "Next.js 14 Full Course: Build a Real App",
    channel: "JavaScript Mastery",
    views: 4500000,
    viewsText: "4.5M views",
    publishedText: "6 months ago",
    category: "Web Dev",
    description: "Build a full stack Next.js 14 application with authentication, database connections, server actions, api routes, and deploying to production.",
    subscribers: "820K"
  },
  {
    id: "lCxcTsOHr5Y",
    title: "Tailwind CSS Course: From Zero to Hero",
    channel: "Traversy Media",
    views: 2800000,
    viewsText: "2.8M views",
    publishedText: "1 year ago",
    category: "Web Dev",
    description: "Learn Tailwind CSS from scratch. We build a responsive landing page, cover utility-first concepts, grids, animations, and custom configurations.",
    subscribers: "2.1M"
  },
  {
    id: "30LWjhZR6DY",
    title: "TypeScript Tutorial for Beginners",
    channel: "Programming with Mosh",
    views: 1800000,
    viewsText: "1.8M views",
    publishedText: "1 year ago",
    category: "Web Dev",
    description: "Learn TypeScript in this practical course. Learn types, interfaces, classes, generics, decorators, compiler settings, and debugging.",
    subscribers: "3.9M"
  },
  {
    id: "f2EqECiMcQ4",
    title: "Node.js Full Course: Express & MongoDB",
    channel: "freeCodeCamp.org",
    views: 3200000,
    viewsText: "3.2M views",
    publishedText: "8 months ago",
    category: "Web Dev",
    description: "Master Node.js, Express, and MongoDB in this complete API development tutorial. We cover REST APIs, middleware, routers, Mongoose, and authentication.",
    subscribers: "10.2M"
  },
  {
    id: "LHBE6Q9XlzI",
    title: "Python for Data Science - Full Course",
    channel: "freeCodeCamp.org",
    views: 2900000,
    viewsText: "2.9M views",
    publishedText: "1 year ago",
    category: "Podcasts",
    description: "Learn python libraries for Data Science: Numpy, Pandas, Matplotlib, Seaborn, data cleanups, statistics, and machine learning integration.",
    subscribers: "10.2M"
  }
];

const DEFAULT_COMMENTS = {
  "HcOc7P5BMi4": [
    { id: "c1", username: "JohnDoe", text: "This is by far the best HTML & CSS course on YouTube! Thank you Apna College!", time: "2 days ago", likes: 32 },
    { id: "c2", username: "CodeNewbie", text: "Loved the flexbox and grid animations, simplified it so much.", time: "1 week ago", likes: 14 }
  ],
  "nu_pCVPKzTk": [
    { id: "c3", username: "SaraCodes", text: "I finally understand React hooks. Amazing explanation of useEffect!", time: "5 days ago", likes: 45 },
    { id: "c4", username: "DevVikas", text: "This project-based learning is exactly what I needed. Keep it up!", time: "2 weeks ago", likes: 18 }
  ]
};

const DEFAULT_SHORTS = [
  {
    id: "kUMe1FH4CGY",
    title: "HTML in 100 Seconds ⚡",
    channel: "Fireship",
    likes: 85000,
    subscribers: "450K",
    description: "HTML basics explained in 100 seconds. #webdev #shorts"
  },
  {
    id: "erEgovG9WBs",
    title: "CSS in 100 Seconds 🎨",
    channel: "Fireship",
    likes: 124000,
    subscribers: "920K",
    description: "CSS basics explained in 100 seconds. Clean up your styles! #css #webdev #shorts"
  },
  {
    id: "jNQXAC9IVRw",
    title: "Me at the zoo (First YouTube Video) 🐘",
    channel: "jawed",
    likes: 98000,
    subscribers: "1.2M",
    description: "The first ever YouTube video. #history #shorts"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "The best coding tutorial ever 🎵",
    channel: "Rick Astley",
    likes: 350000,
    subscribers: "5.2M",
    description: "You've been rickrolled! #music #shorts"
  }
];

const DEFAULT_SHORT_COMMENTS = {
  "35_rXQc-Cis": [
    { id: "sc1", username: "AlexPy", text: "List comprehensions are so satisfying once you get the hang of it!", time: "1 day ago", likes: 124 },
    { id: "sc2", username: "Cody", text: "Short and direct! Keep these programming shorts coming.", time: "3 days ago", likes: 54 }
  ],
  "h3yDcrpB9t8": [
    { id: "sc3", username: "FrontEndGuy", text: "Vite literally changed my life. CRA is history.", time: "4 hours ago", likes: 231 },
    { id: "sc4", username: "MoshFan", text: "Speed is everything in dev workflow. Great short!", time: "2 days ago", likes: 89 }
  ]
};

export const YouTubeProvider = ({ children }) => {
  // Load state from local storage or defaults, auto refreshing if lists grow
  const [videos, setVideos] = useState(() => {
    const local = localStorage.getItem('yt_videos_v2');
    const parsed = local ? JSON.parse(local) : null;
    if (parsed && parsed.length >= DEFAULT_VIDEOS.length) {
      return parsed;
    }
    return DEFAULT_VIDEOS;
  });

  const [shorts, setShorts] = useState(() => {
    const local = localStorage.getItem('yt_shorts_v2');
    const parsed = local ? JSON.parse(local) : null;
    if (parsed && parsed.length >= DEFAULT_SHORTS.length) {
      return parsed;
    }
    return DEFAULT_SHORTS;
  });

  const [shortComments, setShortComments] = useState(() => {
    const local = localStorage.getItem('yt_short_comments');
    return local ? JSON.parse(local) : DEFAULT_SHORT_COMMENTS;
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    const local = localStorage.getItem('yt_subscriptions');
    return local ? JSON.parse(local) : ["freeCodeCamp.org", "Programming with Mosh", "Apna College"];
  });

  const [likes, setLikes] = useState(() => {
    const local = localStorage.getItem('yt_likes');
    return local ? JSON.parse(local) : {}; // { videoId: true }
  });

  const [dislikes, setDislikes] = useState(() => {
    const local = localStorage.getItem('yt_dislikes');
    return local ? JSON.parse(local) : {}; // { videoId: true }
  });

  const [comments, setComments] = useState(() => {
    const local = localStorage.getItem('yt_comments');
    return local ? JSON.parse(local) : DEFAULT_COMMENTS;
  });

  const [theme, setTheme] = useState(() => {
    const local = localStorage.getItem('yt_theme');
    return local ? local : 'dark'; // Dark theme as default!
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const [watchLater, setWatchLater] = useState(() => {
    const local = localStorage.getItem('yt_watch_later');
    // Prepopulate with a couple of items so page isn't empty initially
    return local ? JSON.parse(local) : ["1Rs2ND1ryYc", "8jLOx1hD3_o"];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('yt_videos_v2', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('yt_shorts_v2', JSON.stringify(shorts));
  }, [shorts]);

  useEffect(() => {
    localStorage.setItem('yt_short_comments', JSON.stringify(shortComments));
  }, [shortComments]);

  useEffect(() => {
    localStorage.setItem('yt_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('yt_likes', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem('yt_dislikes', JSON.stringify(dislikes));
  }, [dislikes]);

  useEffect(() => {
    localStorage.setItem('yt_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('yt_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('yt_watch_later', JSON.stringify(watchLater));
  }, [watchLater]);

  // Actions
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const addVideo = (newVideo) => {
    setVideos(prev => [newVideo, ...prev]);
  };

  const toggleSubscription = (channelName) => {
    setSubscriptions(prev => {
      if (prev.includes(channelName)) {
        return prev.filter(c => c !== channelName);
      } else {
        return [...prev, channelName];
      }
    });
  };

  const handleLike = (videoId) => {
    setLikes(prev => {
      const isLiked = !!prev[videoId];
      const newLikes = { ...prev };
      
      if (isLiked) {
        delete newLikes[videoId];
      } else {
        newLikes[videoId] = true;
      }
      return newLikes;
    });

    // Remove dislike if present
    setDislikes(prev => {
      const newDislikes = { ...prev };
      delete newDislikes[videoId];
      return newDislikes;
    });
  };

  const handleDislike = (videoId) => {
    setDislikes(prev => {
      const isDisliked = !!prev[videoId];
      const newDislikes = { ...prev };

      if (isDisliked) {
        delete newDislikes[videoId];
      } else {
        newDislikes[videoId] = true;
      }
      return newDislikes;
    });

    // Remove like if present
    setLikes(prev => {
      const newLikes = { ...prev };
      delete newLikes[videoId];
      return newLikes;
    });
  };

  const addComment = (videoId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      username: "You",
      text,
      time: "Just now",
      likes: 0
    };

    setComments(prev => {
      const videoComments = prev[videoId] ? [...prev[videoId]] : [];
      return {
        ...prev,
        [videoId]: [newComment, ...videoComments]
      };
    });
  };

  const deleteComment = (videoId, commentId) => {
    setComments(prev => {
      const videoComments = prev[videoId] ? [...prev[videoId]] : [];
      return {
        ...prev,
        [videoId]: videoComments.filter(c => c.id !== commentId)
      };
    });
  };

  const addShortComment = (shortId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      username: "You",
      text,
      time: "Just now",
      likes: 0
    };
    setShortComments(prev => {
      const list = prev[shortId] ? [...prev[shortId]] : [];
      return {
        ...prev,
        [shortId]: [newComment, ...list]
      };
    });
  };

  const deleteShortComment = (shortId, commentId) => {
    setShortComments(prev => {
      const list = prev[shortId] ? [...prev[shortId]] : [];
      return {
        ...prev,
        [shortId]: list.filter(c => c.id !== commentId)
      };
    });
  };

  const toggleWatchLater = (videoId) => {
    setWatchLater(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
  };

  return (
    <YouTubeContext.Provider value={{
      videos,
      shorts,
      subscriptions,
      likes,
      dislikes,
      comments,
      shortComments,
      theme,
      sidebarOpen,
      activeCategory,
      setActiveCategory,
      toggleTheme,
      toggleSidebar,
      addVideo,
      toggleSubscription,
      handleLike,
      handleDislike,
      addComment,
      deleteComment,
      addShortComment,
      deleteShortComment,
      watchLater,
      toggleWatchLater
    }}>
      {children}
    </YouTubeContext.Provider>
  );
};

