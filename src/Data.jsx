export const users = [
  {
      id: 1,
      name: 'Ahmed',
      img: '/users/user1.png',
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
      img: '/users/user2.png',
      lastMessage: { type: 'img' },
      bio: 'Photographer',
      lastMsgTime: '10:15 PM',
      isGroup: false,
      unReadCounter: 13,
      groupMembers: [],
      newStatus: true,
  },
  {
      id: 3,
      name: 'Football Fans',
      img: '/users/user3.png',
      lastMessage: { type: 'sticker', content: '⚽' },
      bio: 'Group of football lovers',
      lastMsgTime: '9:50 PM',
      isGroup: true,
      unReadCounter: 0,
      groupMembers: ['Ali', 'Hassan', 'Omar'],
      newStatus: false,
  },
  {
      id: 4,
      name: 'Ali',
      img: '/users/user4.png',
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
      img: '/users/user5.png',
      lastMessage: { type: 'text', content: 'Dinner plans?' },
      bio: 'Family chat group',
      lastMsgTime: '8:30 PM',
      isGroup: true,
      unReadCounter: 0,
      groupMembers: ['Dad', 'Mom', 'Sister'],
      newStatus: false,
  },
  {
      id: 6,
      name: 'Omar',
      img: '/users/user6.png',
      lastMessage: { type: 'sticker', content: '🎉' },
      bio: 'Musician',
      lastMsgTime: '7:45 PM',
      isGroup: false,
      unReadCounter: 8,
      groupMembers: [],
      newStatus: true,
  },
  {
      id: 7,
      name: 'Study Crew',
      img: '/users/user7.png',
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
      img: '/users/user8.png',
      lastMessage: { type: 'text', content: 'Call me later.' },
      bio: 'Traveler',
      lastMsgTime: '6:30 PM',
      isGroup: false,
      unReadCounter: 0,
      groupMembers: [],
      newStatus: true,
  },
  {
      id: 9,
      name: 'Gaming Legends',
      img: '/users/user9.png',
      lastMessage: { type: 'sticker', content: '🎮' },
      bio: 'Gaming chat',
      lastMsgTime: '5:50 PM',
      isGroup: true,
      unReadCounter: 0,
      groupMembers: ['Ali', 'Ahmed', 'Sara'],
      newStatus: false,
  },
  {
      id: 10,
      name: 'Hassan',
      img: '/users/user10.png',
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
      img: '/users/user11.png',
      lastMessage: { type: 'text', content: 'Check out this song!' },
      bio: 'For music sharing',
      lastMsgTime: '4:45 PM',
      isGroup: true,
      unReadCounter: 0,
      groupMembers: ['Ahmed', 'Omar', 'Nour'],
      newStatus: false,
  },
  {
      id: 12,
      name: 'Mike',
      img: '/users/user12.png',
      lastMessage: { type: 'sticker', content: '🤓' },
      bio: 'Developer',
      lastMsgTime: '4:00 PM',
      isGroup: false,
      unReadCounter: 0,
      groupMembers: [],
      newStatus: false,
  },
  {
      id: 13,
      name: 'Book Circle',
      img: '/users/user13.png',
      lastMessage: { type: 'img' },
      bio: 'Book enthusiasts',
      lastMsgTime: '3:30 PM',
      isGroup: true,
      unReadCounter: 0,
      groupMembers: ['Sara', 'John', 'Ali'],
      newStatus: true,
  },
  {
      id: 14,
      name: 'John',
      img: '/users/user14.png',
      lastMessage: { type: 'text', content: 'Meeting at 5?' },
      bio: 'Entrepreneur',
      lastMsgTime: '3:00 PM',
      isGroup: false,
      unReadCounter: 0,
      groupMembers: [],
      newStatus: false,
  },
  {
      id: 15,
      name: 'Tech World',
      img: '/users/user15.png',
      lastMessage: { type: 'text', content: 'New iPhone launched!' },
      bio: 'Latest technology updates',
      lastMsgTime: '2:30 PM',
      isGroup: true,
      unReadCounter: 0,
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
    pin: true,
  },
  {
    id: 2,
    user: "Bob",
    message: "I'm good, thanks! How about you?",
    img: null,
    replyId: 1,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 3,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat4.png",
    replyId: 12,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 6684,
    actor : 'endy',
    action: 'join the group using via link',
  },
  {
    id: 4,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: null,
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 5,
    user: "Alice",
    message: "It's a web app for managing tasks. What about you?",
    img: "/chat6.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:20", 
    pin: true,
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
    id: 6476,
    actor : 'ixon',
    action: 'left',
  },

  {
    id: 6160,
    actor : 'endy',
    action: 'giveAadmin',
    targetPerson: '3kr4',
  },


  {
    id: 6,
    user: "Bob",
    message: "Just learning new things in React.",
    img: null,
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 7,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: null,
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🧐',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user2.png',
        },
        emoji: '🤓',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user4.png',
        },
        emoji: '😭',
      },
      {
        id: 4,
        user: {
          name: 'Alias',
          img: '/users/user6.png',
        },
        emoji: '🧐',
      },
      {
        id: 5,
        user: {
          name: 'Bob',
          img: '/users/user7.png',
        },
        emoji: '🤓',
      },
      {
        id: 6,
        user: {
          name: 'sass',
          img: '/users/user8.png',
        },
        emoji: '😭',
      },
      {
        id: 7,
        user: {
          name: 'Alias',
          img: '/users/user10.png',
        },
        emoji: '🧐',
      },
      {
        id: 8,
        user: {
          name: 'Bob',
          img: '/users/user12.png',
        },
        emoji: '🤓',
      },
      {
        id: 9,
        user: {
          name: 'sass',
          img: '/users/user15.png',
        },
        emoji: '😭',
      },
      {
        id: 10,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🤩',
      },
      {
        id: 11,
        user: {
          name: 'Bob',
          img: '/users/user2.png',
        },
        emoji: '🥶',
      },
      {
        id: 12,
        user: {
          name: 'sass',
          img: '/users/user4.png',
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
          img: '/users/user2.png',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user8.png',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user7.png',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user10.png',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user12.png',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 9,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat2.png",
    replyId: 8,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 10,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: null,
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
    img: null,
    replyId: 4,
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
    img: null,
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 61416,
    history: true,
    time: 'Today',
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
    img: null,
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 615,
    actor : '3kr4',
    action: 'remove',
    targetPerson: 'fares',
  },

  {
    id: 17,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: null,
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
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
          img: '/users/user1.png',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 19,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat2.png",
    replyId: 8,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 20,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: null,
    replyId: null,
    date: "2024-10-12",
    time: "16:45",
  },

  {
    id: 21,
    user: "Alice",
    message: "",
    img: "/chat18.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:00", 
  },
  {
    id: 22,
    user: "Bob",
    message: "I'm good, thanks! How about you?",
    img: null,
    replyId: 14,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 6116,
    history: true,
    time: 'tharathday',
  },

  {
    id: 23,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat17.png",
    replyId: 2,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 24,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: null,
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 69,
    actor : '3kr4',
    action: 'removeAdmin',
    targetPerson: 'endy',
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
    img: null,
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 27,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: null,
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🧐',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '🤓',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😭',
      },
      {
        id: 4,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🧐',
      },
      {
        id: 5,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '🤓',
      },
      {
        id: 6,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😭',
      },
      {
        id: 7,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🧐',
      },
      {
        id: 8,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '🤓',
      },
      {
        id: 9,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😭',
      },
      {
        id: 10,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🤩',
      },
      {
        id: 11,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '🥶',
      },
      {
        id: 12,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '🤮',
      },
    ]
  },
  {
    id: 28,
    user: "Bob",
    message: "Not yet, but it's on my list. Do you use it?",
    img: "/chat13.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:35", 
    pin: false,
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 29,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat15.png",
    replyId: 18,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 6136,
    history: true,
    time: '1/14/2026',
  },
  {
    id: 30,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: null,
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
    img: null,
    replyId: 19,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 33,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat7.png",
    replyId: 22,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 34,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: null,
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
    img: null,
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 37,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: null,
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
  },
  {
    id: 39,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat9.ico",
    replyId: 13,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 40,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: null,
    replyId: null,
    date: "2024-10-12",
    time: "16:45",
  },

  {
    id: 41,
    user: "Alice",
    message: "",
    img: "/chat10.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:00", 
    pin: true,
  },
  {
    id: 42,
    user: "Bob",
    message: "I'm good, thanks! How about you?",
    img: null,
    replyId: 1,
    date: "2024-10-12",
    time: "16:05", 
  },
  {
    id: 43,
    user: "Alice",
    message: "Doing well, just working on a project.",
    img: "/chat11.png",
    replyId: 23,
    date: "2024-10-12",
    time: "16:10", 
  },
  {
    id: 44,
    user: "Bob",
    message: "That's great! What's the project about?",
    img: null,
    replyId: 3,
    date: "2024-10-12",
    time: "16:15", 
    deleted: true,
  },
  {
    id: 45,
    user: "Alice",
    message: "It's a web app for managing tasks. What about you?",
    img: "/chat12.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:20", 
  },
  {
    id: 46,
    user: "Bob",
    message: "Just learning new things in React.",
    img: null,
    replyId: null,
    date: "2024-10-12",
    time: "16:25", 
  },
  {
    id: 47,
    user: "Alice",
    message: "React is amazing! Have you tried Next.js?",
    img: null,
    replyId: 6,
    date: "2024-10-12",
    time: "16:30", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🧐',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '🤓',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😭',
      },
      {
        id: 4,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🧐',
      },
      {
        id: 5,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '🤓',
      },
      {
        id: 6,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😭',
      },
      {
        id: 7,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🧐',
      },
      {
        id: 8,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '🤓',
      },
      {
        id: 9,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😭',
      },
      {
        id: 10,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🤩',
      },
      {
        id: 11,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '🥶',
      },
      {
        id: 12,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '🤮',
      },
    ]
  },
  {
    id: 48,
    user: "Bob",
    message: "Not yet, but it's on my list. Do you use it?",
    img: "/chat13.png",
    replyId: null,
    date: "2024-10-12",
    time: "16:35", 
    emojis: [
      {
        id: 1,
        user: {
          name: 'Alias',
          img: '/users/user1.png',
        },
        emoji: '🥰',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😂',
      },
      {
        id: 2,
        user: {
          name: 'Bob',
          img: '/users/user1.png',
        },
        emoji: '👎🏻',
      },
      {
        id: 3,
        user: {
          name: 'sass',
          img: '/users/user1.png',
        },
        emoji: '😂',
      }
    ] 
  },
  {
    id: 49,
    user: "Alice",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: "/chat19.png",
    replyId: 8,
    date: "2024-10-12",
    time: "16:40", 
  },
  {
    id: 50,
    user: "Bob",
    message: "Yes, I use it for most of my projects. It's really powerful!",
    img: null,
    replyId: null,
    date: "2024-10-12",
    time: "16:45",
  },
];

export let posts = [
  {
    id: 1,
    link: "https://fb.watch/xVFJl_Q7i0/",
    img: ["/chat7.png"],
    paragraph: "Thanks a lot to @Gaelle and @Rolf for this wonderful team lunch. The food was really tasty and we had some great laughs. Thanks to all the team, you're all awesome !",
    date: "2024-10-12",
    time: "16:00", 
    user: {
      name: 'ahmed',
      img: '/users/user1.png',
      bio: '',
      mutualFriends: 2,
    },
    shareCount: 3,
    reacts: {
      count: 15,
      topUseage: ['❤️','😂']
    },
    comments : {
      count: 5,
      allComments: [
        {
          id: 1,
          name: 'john doe',
          time: '3 hours ago',
          paragraph: 'This is an interesting discussion! I love the insights shared here.',
          likesCount: 6,
          image: '/users/user10.png',
          replays: [
            {
              id: 1,
              name: 'emma stone',
              time: '2 hours ago',
              paragraph: 'Absolutely! Some great points have been raised.',
              likesCount: 2,
              image: '/users/user14.png',
              reacts: {
                count: 2,
                topUseage: ['👍', '🔥'],
              },
              replays: [
                {
                  id: 1,
                  name: 'emma stone',
                  time: '2 hours ago',
                  paragraph: 'Absolutely! Some great Absolutely! Some great points have been raised. points have been raised.',
                  likesCount: 2,
                  image: '/users/user4.png',
                  reacts: {
                    count: 2,
                    topUseage: ['😘', '😠'],
                  },
                },
              ],
            },
            {
              id: 2,
              name: 'ahmed ashraf',
              time: '5 hours ago',
              paragraph: 'I completely agree! Looking forward to more conversations.',
              likesCount: 5,
              image: '/users/user6.png',
              reacts: {
                count: 1,
                topUseage: ['😂'],
              },
              replays: [],
            },
          ],
          reacts: {
            count: 4,
            topUseage: ['❤️', '😂', '😮'],
          },
        },
        {
          id: 2,
          name: 'sophia miller',
          time: '1 hour ago',
          paragraph: 'I completely agree! Looking forward to more conversations like this.',
          likesCount: 3,
          image: '/users/user12.png',
          replays: [],
        },
      ],
    },
  },
  {
    id: 2,
    link: "https://fb.watch/xVFJl_Q7i0/",
    img: ["/chat17.png", "/chat7.png"],
    paragraph: "",
    date: "2024-10-12",
    time: "16:00", 
    user: {
      name: 'ahmed',
      img: '/users/user4.png',
      bio: '',
      mutualFriends: 2,
    },
    shareCount: 3,
    reacts: {
      count: 9,
      topUseage: ['👍','😘']
    },
    comments: {
      count: 0,
    },
    react:'👍❤️😂😘😠',
  },
  {
    id: 3,
    link: "",
    img: ["/chat17.png", "/chat6.png", "/chat16.png"],
    paragraph: "Thanks a lot to @Gaelle and @Rolf for this wonderful team lunch. The food was really tasty and we had some great laughs.",
    date: "2024-10-12",
    time: "16:00", 
    user: {
      name: 'ahmed',
      img: '/users/user4.png',
      bio: '',
      mutualFriends: 2,
    },
    shareCount: 3,
    reacts: {
      count: 9,
      topUseage: ['👍','😘']
    },
    comments : {
      count: 1,
      friends: [
        {
          id: 1,
          name: 'lisa brown',
          img: '/users/user13.png',
        },
      ],
      friendsCount: 1,
      allComments: [
        {
          id: 1,
          name: 'lisa brown',
          time: '5 minutes ago',
          paragraph: 'This looks great! Thanks for sharing.',
          likesCount: 1,
          image: '/users/user13.png',
          replays: [],
          reacts: {
            count: 1,
            topUseage: ['❤️'],
          },
        },
      ],
    },
  },
  {
    id: 4,
    link: "",
    img: ["/chat17.png", "/chat6.png", "/chat16.png", "/chat7.png", "/chat13.png"],
    paragraph: "",
    date: "2024-10-12",
    time: "16:00", 
    user: {
      name: 'ahmed',
      img: '/users/user4.png',
      bio: '',
      mutualFriends: 2,
    },
    shareCount: 3,
    reacts: {
      count: 9,
      topUseage: ['👍','😘']
    },
    comments: {
      count: 0,
    },
    react:'👍❤️😂😘😠',
  },
  {
    id: 5,
    link: "",
    img: null,
    paragraph: "Thanks a lot to @Gaelle and @Rolf for this wonderful team lunch. The food was really tasty and we had some great laughs.",
    date: "2024-10-12",
    time: "16:00", 
    user: {
      name: 'ahmed',
      img: '/users/user4.png',
      bio: '',
      mutualFriends: 2,
    },
    shareCount: 3,
    reacts: {
      count: 9,
      topUseage: ['👍','😘']
    },
    comments: {
      count: 5,
      friends: [
        {
          id: 1,
          name:'yasser',
          img:'/users/user3.png',
        },
        {
          id: 2,
          name:'ali',
          img:'/users/user6.png',
        },
      ],
      friendsCount:3,
      allComments: [
        {
          id: 1,
          name: 'lana henrikseen',
          time: '2 days ago',
          paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris consequat.',
          likesCount: 3,
          replays: [
            {
              id: 2,
              name: 'david kim',
              time: '2 days ago',
              paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
              likesCount: 1,
              replays: [
                {
                  id: 3,
                  name: 'lana henrikseen',
                  time: '1 days ago',
                  paragraph: 'Lorem ipsum dolor sit amet.',
                  likesCount: 1,
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'lana henrikseen',
          time: '2 days ago',
          paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris consequat.',
          likesCount: 3,
          replays: [
            {
              id: 3,
              name: 'david kim',
              time: '2 days ago',
              paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
              likesCount: 1,
            }
          ],
          comments : {
            count: 1,
            friends: [
              {
                id: 1,
                name: 'lisa brown',
                img: '/users/user13.png',
              },
            ],
            friendsCount: 1,
            allComments: [
              {
                id: 1,
                name: 'lisa brown',
                time: '5 minutes ago',
                paragraph: 'This looks great! Thanks for sharing.',
                likesCount: 1,
                image: '/users/user13.png',
                replays: [],
                reacts: {
                  count: 1,
                  topUseage: ['❤️'],
                },
              },
            ],
          },          
        },
        {
          id: 3,
          name: 'lana henrikseen',
          time: '2 days ago',
          paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris consequat.',
          likesCount: 3,
        },
      ]
    },
    react:'👍❤️😂😘😠',
  },
]