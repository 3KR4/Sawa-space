export const users = [
  {
      id: 1,
      name: 'Ahmed',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'text', content: 'Hey there!' },
      bio: 'Tech enthusiast',
      number: '+20 112 972 7995',
      lastMsgTime: '11:30 PM',
      isGroup: false,
      unReadCounter: 2,
      groupMembers: [],
      newStatus: false,
  },
  {
      id: 2,
      name: 'Sara',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'img' },
      bio: 'Photographer',
      lastMsgTime: '10:15 PM',
      isGroup: false,
      unReadCounter: 5,
      groupMembers: [],
      newStatus: true,
  },
  {
      id: 3,
      name: 'Football Fans',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'sticker', content: '⚽' },
      bio: 'Group of football lovers',
      lastMsgTime: '9:50 PM',
      isGroup: true,
      unReadCounter: 3,
      groupMembers: ['Ali', 'Hassan', 'Omar'],
      newStatus: false,
  },
  {
      id: 4,
      name: 'Ali',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'text', content: 'How was your day?' },
      bio: 'Gamer',
      lastMsgTime: '9:00 PM',
      isGroup: false,
      unReadCounter: 1,
      groupMembers: [],
      newStatus: false,
  },
  {
      id: 5,
      name: 'Family Chat',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'text', content: 'Dinner plans?' },
      bio: 'Family chat group',
      lastMsgTime: '8:30 PM',
      isGroup: true,
      unReadCounter: 4,
      groupMembers: ['Dad', 'Mom', 'Sister'],
      newStatus: false,
  },
  {
      id: 6,
      name: 'Omar',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'sticker', content: '🎉' },
      bio: 'Musician',
      lastMsgTime: '7:45 PM',
      isGroup: false,
      unReadCounter: 0,
      groupMembers: [],
      newStatus: true,
  },
  {
      id: 7,
      name: 'Study Crew',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'img' },
      bio: 'Group for study discussions',
      lastMsgTime: '7:00 PM',
      isGroup: true,
      unReadCounter: 2,
      groupMembers: ['John', 'Sara', 'Mike'],
      newStatus: false,
  },
  {
      id: 8,
      name: 'Nour',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'text', content: 'Call me later.' },
      bio: 'Traveler',
      lastMsgTime: '6:30 PM',
      isGroup: false,
      unReadCounter: 1,
      groupMembers: [],
      newStatus: true,
  },
  {
      id: 9,
      name: 'Gaming Legends',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'sticker', content: '🎮' },
      bio: 'Gaming chat',
      lastMsgTime: '5:50 PM',
      isGroup: true,
      unReadCounter: 6,
      groupMembers: ['Ali', 'Ahmed', 'Sara'],
      newStatus: false,
  },
  {
      id: 10,
      name: 'Hassan',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'img' },
      bio: 'Coder',
      lastMsgTime: '5:15 PM',
      isGroup: false,
      unReadCounter: 2,
      groupMembers: [],
      newStatus: false,
  },
  {
      id: 11,
      name: 'Music Lovers',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'text', content: 'Check out this song!' },
      bio: 'For music sharing',
      lastMsgTime: '4:45 PM',
      isGroup: true,
      unReadCounter: 3,
      groupMembers: ['Ahmed', 'Omar', 'Nour'],
      newStatus: false,
  },
  {
      id: 12,
      name: 'Mike',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'sticker', content: '🤓' },
      bio: 'Developer',
      lastMsgTime: '4:00 PM',
      isGroup: false,
      unReadCounter: 1,
      groupMembers: [],
      newStatus: false,
  },
  {
      id: 13,
      name: 'Book Circle',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'img' },
      bio: 'Book enthusiasts',
      lastMsgTime: '3:30 PM',
      isGroup: true,
      unReadCounter: 4,
      groupMembers: ['Sara', 'John', 'Ali'],
      newStatus: true,
  },
  {
      id: 14,
      name: 'John',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'text', content: 'Meeting at 5?' },
      bio: 'Entrepreneur',
      lastMsgTime: '3:00 PM',
      isGroup: false,
      unReadCounter: 2,
      groupMembers: [],
      newStatus: false,
  },
  {
      id: 15,
      name: 'Tech World',
      img: 'https://via.placeholder.com/50',
      lastMessage: { type: 'text', content: 'New iPhone launched!' },
      bio: 'Latest technology updates',
      lastMsgTime: '2:30 PM',
      isGroup: true,
      unReadCounter: 5,
      groupMembers: ['Ahmed', 'Nour', 'Sara'],
      newStatus: true,
  }
];

export let messages = [
  {
    id: 1,
    user: "Alice",
    message: "",
    img: "/chat3.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:00", 
    pin: false,
  },
  {
    id: 2,
    user: "Bob",
    message: "I'm good, thanks! How about you?",
    img: "",
    replyId: 1,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 3,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat4.png",
    replyId: 2,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 4,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: "",
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 5,
    user: "Alice",
    message: "It's a web app for managing tasks. What about you?",
    img: "/chat5.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:20", 
    pin: false,
  },
  {
    id: 616,
    history: true,
    time: '1/14/2025',
  },
  {
    id: 626,
    actor : 'endy',
    action: 'added',
    targetPerson: '3kr4',
  },
  {
    id: 6116,
    history: true,
    time: 'tharathday',
  },
  {
    id: 6684,
    actor : 'endy',
    action: 'join the group using via link',
  },
  {
    id: 6476,
    actor : 'ixon',
    action: 'left',
  },
  {
    id: 61416,
    history: true,
    time: 'Today',
  },
  {
    id: 6160,
    actor : 'endy',
    action: 'giveAadmin',
    targetPerson: '3kr4',
  },
  {
    id: 615,
    actor : '3kr4',
    action: 'remove',
    targetPerson: 'fares',
  },
  {
    id: 69,
    actor : '3kr4',
    action: 'removeAdmin',
    targetPerson: 'endy',
  },
  {
    id: 6136,
    history: true,
    time: '1/14/2026',
  },
  {
    id: 6,
    user: "Bob",
    message: "Just learning new things in React.",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 7,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: "",
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 4,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 5,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 6,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 7,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 8,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 9,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 10,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤩',
      },
      {
        id: 11,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥶',
      },
      {
        id: 12,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤮',
      },
    ]
  },
  {
    id: 8,
    user: "Bob",
    message: "Not yet, but it's on my list. Do you use it?",
    img: "/chat1.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:35", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 9,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat2.jpg",
    replyId: 8,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 10,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:45",
  },

  {
    id: 11,
    user: "Alice",
    message: "",
    img: "/chat3.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:00", 
  },
  {
    id: 12,
    user: "Bob",
    message: "I'm good, thanks! How about you?",
    img: "",
    replyId: 1,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 13,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat4.png",
    replyId: 2,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 14,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: "",
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 15,
    user: "Alice",
    message: "It's a web app for managing tasks. What about you?",
    img: "/chat5.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:20", 
  },
  {
    id: 16,
    user: "Bob",
    message: "Just learning new things in React.",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 17,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: "",
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 4,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 5,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 6,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 7,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 8,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 9,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 10,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤩',
      },
      {
        id: 11,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥶',
      },
      {
        id: 12,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤮',
      },
    ]
  },
  {
    id: 18,
    user: "Bob",
    message: "Not yet, but it's on my list. Do you use it?",
    img: "/chat1.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:35", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 19,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat2.jpg",
    replyId: 8,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 20,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:45",
  },

  {
    id: 21,
    user: "Alice",
    message: "",
    img: "/chat3.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:00", 
  },
  {
    id: 22,
    user: "Bob",
    message: "I'm good, thanks! How about you?",
    img: "",
    replyId: 1,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 23,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat4.png",
    replyId: 2,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 24,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: "",
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 25,
    user: "Alice",
    message: "It's a web app for managing tasks. What about you?",
    img: "/chat5.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:20", 
  },
  {
    id: 26,
    user: "Bob",
    message: "Just learning new things in React.",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 27,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: "",
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 4,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 5,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 6,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 7,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 8,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 9,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 10,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤩',
      },
      {
        id: 11,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥶',
      },
      {
        id: 12,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤮',
      },
    ]
  },
  {
    id: 28,
    user: "Bob",
    message: "Not yet, but it's on my list. Do you use it?",
    img: "/chat13.jpg",
    replyId: null,
    date: "2024-10-12",
    time: "16:35", 
    pin: false,
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 29,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat5.png",
    replyId: 8,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 30,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:45",
  },

  {
    id: 31,
    user: "Alice",
    message: "",
    img: "/chat6.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:00", 
  },
  {
    id: 32,
    user: "Bob",
    message: "I'm good, thanks! How about you?",
    img: "",
    replyId: 1,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 33,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat7.jpg",
    replyId: 2,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 34,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: "",
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 35,
    user: "Alice",
    message: "It's a web app for managing tasks. What about you?",
    img: "/chat8.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:20", 
  },
  {
    id: 36,
    user: "Bob",
    message: "Just learning new things in React.",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 37,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: "",
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 4,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 5,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 6,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 7,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 8,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 9,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 10,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤩',
      },
      {
        id: 11,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥶',
      },
      {
        id: 12,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤮',
      },
    ]
  },
  {
    id: 38,
    user: "Bob",
    message: "Not yet, but it's on my list. Do you use it?",
    img: "/chat1.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:35", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 39,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat9.ico",
    replyId: 8,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 40,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:45",
  },

  {
    id: 41,
    user: "Alice",
    message: "",
    img: "/chat10.jpg",
    replyId: null,
    date: "2024-10-12",
    time: "16:00", 
    pin: false,
  },
  {
    id: 42,
    user: "Bob",
    message: "I'm good, thanks! How about you?",
    img: "",
    replyId: 1,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 43,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat11.jpeg",
    replyId: 2,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 44,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: "",
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 45,
    user: "Alice",
    message: "It's a web app for managing tasks. What about you?",
    img: "/chat12.jpeg",
    replyId: null,
    date: "2024-10-12",
    time: "16:20", 
  },
  {
    id: 46,
    user: "Bob",
    message: "Just learning new things in React.",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 47,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: "",
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 4,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 5,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 6,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 7,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🧐',
      },
      {
        id: 8,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤓',
      },
      {
        id: 9,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😭',
      },
      {
        id: 10,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤩',
      },
      {
        id: 11,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥶',
      },
      {
        id: 12,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🤮',
      },
    ]
  },
  {
    id: 48,
    user: "Bob",
    message: "Not yet, but it's on my list. Do you use it?",
    img: "/chat13.jpg",
    replyId: null,
    date: "2024-10-12",
    time: "16:35", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: 'https://via.placeholder.com/50',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 49,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat2.jpg",
    replyId: 8,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 50,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "",
    replyId: null,
    date: "2024-10-12",
    time: "16:45",
  },
];