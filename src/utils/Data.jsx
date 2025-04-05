export const users = [
  {
    id: 1,
    name: "Ahmed mouhamed adel hussam nour",
    img: "/users/user1.png",
    lastMessage: {
      type: "text",
      content:
        "Hey there iam her papy ooohh yaaaa! shadow fight no way stop fk",
    },
    bio: "Tech enthusiast",
    number: "+20 112 972 7995",
    lastMsgTime: "2025-03-03T09:40:00Z",
    isGroup: false,
    unReadCounter: 2,
    groupMembers: [],
    newStatus: false,
  },
  {
    id: 2,
    name: "Sara",
    img: "/users/user2.png",
    lastMessage: { type: "img" },
    bio: "Photographer",
    number: "+20 112 972 7995",

    lastMsgTime: "2025-03-14T09:40:00Z",
    isGroup: false,
    unReadCounter: 13,
    groupMembers: [],
    newStatus: true,
  },
  {
    id: 3,
    name: "Football Fans",
    img: "/users/user3.png",
    number: "+20 112 972 7995",

    lastMessage: { type: "sticker", content: "⚽" },
    bio: "Group of football lovers",
    lastMsgTime: "2025-03-08T09:40:00Z",
    isGroup: true,
    unReadCounter: 0,
    groupMembers: ["Ali", "Hassan", "Omar"],
    newStatus: false,
  },
  {
    id: 4,
    name: "Ali",
    img: "/users/user4.png",
    lastMessage: { type: "text", content: "How was your day?" },
    bio: "Gamer",
    lastMsgTime: "2025-02-25T09:40:00Z",
    isGroup: false,
    number: "+20 112 972 7995",

    unReadCounter: 1,
    groupMembers: [],
    newStatus: false,
  },
  {
    id: 5,
    name: "Family Chat",
    img: "/users/user5.png",
    lastMessage: { type: "text", content: "Dinner plans?" },
    bio: "Family chat group",
    lastMsgTime: "2025-02-01T09:40:00Z",
    isGroup: true,
    unReadCounter: 0,
    number: "+20 112 972 7995",

    groupMembers: ["Dad", "Mom", "Sister"],
    newStatus: false,
  },
  {
    id: 6,
    name: "Omar",
    img: "/users/user6.png",
    lastMessage: { type: "sticker", content: "🎉" },
    bio: "Musician",
    lastMsgTime: "2024-03-03T09:40:00Z",
    isGroup: false,
    number: "+20 112 972 7995",

    unReadCounter: 8,
    groupMembers: [],
    newStatus: true,
  },
  {
    id: 7,
    name: "Study Crew",
    img: "/users/user7.png",
    lastMessage: { type: "img" },
    bio: "Group for study discussions",
    lastMsgTime: "2023-03-03T09:40:00Z",
    number: "+20 112 972 7995",

    isGroup: true,
    unReadCounter: 2,
    groupMembers: ["John", "Sara", "Mike"],
    newStatus: false,
  },
  {
    id: 8,
    name: "Nour",
    img: "/users/user8.png",
    lastMessage: { type: "text", content: "Call me later." },
    bio: "Traveler",
    number: "+20 112 972 7995",

    lastMsgTime: "2022-03-03T09:40:00Z",
    isGroup: false,
    unReadCounter: 0,
    groupMembers: [],
    newStatus: true,
  },
  {
    id: 9,
    name: "Gaming Legends",
    img: "/users/user9.png",
    lastMessage: { type: "sticker", content: "🎮" },
    bio: "Gaming chat",
    lastMsgTime: "2025-03-01T09:40:00Z",
    isGroup: true,
    unReadCounter: 0,
    number: "+20 112 972 7995",

    groupMembers: ["Ali", "Ahmed", "Sara"],
    newStatus: false,
  },
  {
    id: 10,
    name: "Hassan",
    img: "/users/user10.png",
    lastMessage: { type: "img" },
    bio: "Coder",
    number: "+20 112 972 7995",

    lastMsgTime: "2025-03-15T09:39:00Z",
    isGroup: false,
    unReadCounter: 2,
    groupMembers: [],
    newStatus: false,
  },
  {
    id: 11,
    name: "Music Lovers",
    img: "/users/user11.png",
    lastMessage: { type: "text", content: "Check out this song!" },
    bio: "For music sharing",
    lastMsgTime: "2025-03-15T09:38:00Z",
    isGroup: true,
    number: "+20 112 972 7995",

    unReadCounter: 0,
    groupMembers: ["Ahmed", "Omar", "Nour"],
    newStatus: false,
  },
  {
    id: 12,
    name: "Mike",
    img: "/users/user12.png",
    lastMessage: { type: "sticker", content: "🤓" },
    bio: "Developer",
    lastMsgTime: "2025-03-15T08:40:00Z",
    isGroup: false,
    number: "+20 112 972 7995",

    unReadCounter: 0,
    groupMembers: [],
    newStatus: false,
  },
  {
    id: 13,
    name: "Book Circle",
    img: "/users/user13.png",
    lastMessage: { type: "img" },
    bio: "Book enthusiasts",
    number: "+20 112 972 7995",

    lastMsgTime: "2025-03-15T07:40:00Z",
    isGroup: true,
    unReadCounter: 0,
    groupMembers: ["Sara", "John", "Ali"],
    newStatus: true,
  },
  {
    id: 14,
    name: "John",
    img: "/users/user14.png",
    lastMessage: { type: "text", content: "Meeting at 5?" },
    bio: "Entrepreneur",
    lastMsgTime: "2025-03-15T00:40:00Z",
    isGroup: false,
    unReadCounter: 0,
    number: "+20 112 972 7995",

    groupMembers: [],
    newStatus: false,
  },
  {
    id: 15,
    name: "Tech World",
    img: "/users/user15.png",
    lastMessage: { type: "text", content: "New iPhone launched!" },
    bio: "Latest technology updates",
    lastMsgTime: "2025-03-14T23:59:00Z",
    number: "+20 112 972 7995",

    isGroup: true,
    unReadCounter: 0,
    groupMembers: ["Ahmed", "Nour", "Sara"],
    newStatus: true,
  },
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
    actor: "endy",
    action: "join the group using via link",
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
    time: "1/14/2025",
  },
  {
    id: 626,
    actor: "endy",
    action: "added",
    targetPerson: "3kr4",
  },

  {
    id: 6476,
    actor: "ixon",
    action: "left",
  },

  {
    id: 6160,
    actor: "endy",
    action: "giveAadmin",
    targetPerson: "3kr4",
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
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🧐",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user2.png",
        },
        emoji: "🤓",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user4.png",
        },
        emoji: "😭",
      },
      {
        id: 4,
        user: {
          name: "Alias",
          img: "/users/user6.png",
        },
        emoji: "🧐",
      },
      {
        id: 5,
        user: {
          name: "Bob",
          img: "/users/user7.png",
        },
        emoji: "🤓",
      },
      {
        id: 6,
        user: {
          name: "sass",
          img: "/users/user8.png",
        },
        emoji: "😭",
      },
      {
        id: 7,
        user: {
          name: "Alias",
          img: "/users/user10.png",
        },
        emoji: "🧐",
      },
      {
        id: 8,
        user: {
          name: "Bob",
          img: "/users/user12.png",
        },
        emoji: "🤓",
      },
      {
        id: 9,
        user: {
          name: "sass",
          img: "/users/user15.png",
        },
        emoji: "😭",
      },
      {
        id: 10,
        user: {
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🤩",
      },
      {
        id: 11,
        user: {
          name: "Bob",
          img: "/users/user2.png",
        },
        emoji: "🥶",
      },
      {
        id: 12,
        user: {
          name: "sass",
          img: "/users/user4.png",
        },
        emoji: "🤮",
      },
    ],
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
          name: "Alias",
          img: "/users/user2.png",
        },
        emoji: "🥰",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user8.png",
        },
        emoji: "👎🏻",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user7.png",
        },
        emoji: "😂",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user10.png",
        },
        emoji: "👎🏻",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user12.png",
        },
        emoji: "😂",
      },
    ],
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
    time: "Today",
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
    actor: "3kr4",
    action: "remove",
    targetPerson: "fares",
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
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🥰",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "👎🏻",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😂",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "👎🏻",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😂",
      },
    ],
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
    time: "tharathday",
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
    actor: "3kr4",
    action: "removeAdmin",
    targetPerson: "endy",
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
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🧐",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "🤓",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😭",
      },
      {
        id: 4,
        user: {
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🧐",
      },
      {
        id: 5,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "🤓",
      },
      {
        id: 6,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😭",
      },
      {
        id: 7,
        user: {
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🧐",
      },
      {
        id: 8,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "🤓",
      },
      {
        id: 9,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😭",
      },
      {
        id: 10,
        user: {
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🤩",
      },
      {
        id: 11,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "🥶",
      },
      {
        id: 12,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "🤮",
      },
    ],
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
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🥰",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "👎🏻",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😂",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "👎🏻",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😂",
      },
    ],
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
    time: "1/14/2026",
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
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🧐",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "🤓",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😭",
      },
      {
        id: 4,
        user: {
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🧐",
      },
      {
        id: 5,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "🤓",
      },
      {
        id: 6,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😭",
      },
      {
        id: 7,
        user: {
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🧐",
      },
      {
        id: 8,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "🤓",
      },
      {
        id: 9,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😭",
      },
      {
        id: 10,
        user: {
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🤩",
      },
      {
        id: 11,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "🥶",
      },
      {
        id: 12,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "🤮",
      },
    ],
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
          name: "Alias",
          img: "/users/user1.png",
        },
        emoji: "🥰",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "👎🏻",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😂",
      },
      {
        id: 2,
        user: {
          name: "Bob",
          img: "/users/user1.png",
        },
        emoji: "👎🏻",
      },
      {
        id: 3,
        user: {
          name: "sass",
          img: "/users/user1.png",
        },
        emoji: "😂",
      },
    ],
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
    img: ["/chat7.png"],
    link: ["https://fb.watch/xVFJl_Q7i0/", "www.google.com"],
    hashtags: ["gaming", "studying", "kids"],
    mentions: [
      { userId: 1, userName: "nagi" },
      { userId: 2, userName: "3kr4" },
      { userId: 3, userName: "osama" },
    ],
    paragraph:
      "Had an amazing team lunch today with @Gaelle and @Rolf. The food was fantastic, and it was great catching up with everyone. Grateful for such a talented and supportive team!",
    shareCount: 3,
    date: "2024-10-12",
    time: "16:00",
    user: {
      name: "Ahmed",
      img: "/users/user1.png",
    },
    reacts: {
      count: 5,
      topUseage: ["❤️", "😂"],
      users: [
        {
          id: 1,
          emoji: "❤️",
          name: "gendy",
        },
        {
          id: 2,
          emoji: "❤️",
          name: "marawan",
        },
        {
          id: 3,
          emoji: "❤️",
          name: "mouhamed",
        },
        {
          id: 4,
          emoji: "😂",
          name: "isaa3",
        },
        {
          id: 5,
          emoji: "😂",
          name: "gogo",
        },
      ],
    },
    comments: {
      count: 5,
      allComments: [
        {
          id: 1,
          name: "John Doe",
          img: "/chat8.png",
          time: "3 hours ago",
          paragraph:
            "The food looks incredible! You guys always have the best team events.",
          likesCount: 6,
          image: "/users/user10.png",
          replays: [
            {
              id: 1,
              name: "Emma Stone",
              time: "2 hours ago",
              paragraph: "Totally agree! I wish I could join next time!",
              likesCount: 2,
              img: "/chat3.png",
              image: "/users/user14.png",
              reacts: {
                count: 2,
                topUseage: ["👍", "😊"],
                users: [
                  [
                    {
                      id: 1,
                      emoji: "👍",
                      name: "gendy",
                    },
                    {
                      id: 1,
                      emoji: "😊",
                      name: "gendy",
                    },
                    {
                      id: 1,
                      emoji: "😊",
                      name: "gendy",
                    },
                  ],
                ],
              },
              replays: [
                {
                  id: 1,
                  name: "Emma Stone",
                  time: "2 hours ago",
                  paragraph:
                    "It’s always fun when we get together. Looking forward to the next one!",
                  likesCount: 2,
                  img: "/chat1.png",
                  image: "/users/user4.png",
                  reacts: {
                    count: 2,
                    topUseage: ["😘", "😎"],
                    users: [
                      [
                        {
                          id: 1,
                          name: "gendy",
                        },
                      ],
                      [
                        {
                          id: 1,
                          name: "sozaan",
                        },
                      ],
                    ],
                  },
                },
              ],
            },
            {
              id: 2,
              name: "Ahmed Ashraf",
              time: "5 hours ago",
              paragraph:
                "I completely agree! These gatherings are always memorable.",
              likesCount: 5,
              image: "/users/user6.png",
              reacts: {
                count: 1,
                topUseage: ["😂"],
                users: [
                  [
                    {
                      id: 1,
                      name: "gendy",
                    },
                  ],
                ],
              },
              replays: [],
            },
          ],
          reacts: {
            count: 4,
            topUseage: ["❤️", "😂", "😮"],
            users: [
              [
                {
                  id: 1,
                  name: "gendy",
                },
              ],
              [
                {
                  id: 1,
                  name: "sozaan",
                },
              ],
              [
                {
                  id: 1,
                  name: "sozaan",
                },
                {
                  id: 2,
                  name: "assmaa",
                },
              ],
            ],
          },
        },
        {
          id: 2,
          name: "Sophia Miller",
          time: "1 hour ago",
          paragraph:
            "Looks like you all had a blast! Can’t wait for the next one.",
          likesCount: 3,
          image: "/users/user12.png",
          replays: [],
        },
      ],
    },
  },
  {
    id: 2,
    img: ["/chat17.png", "/chat7.png"],
    link: ["https://fb.watch/xVFJl_Q7i0/"],
    hashtags: ["nature", "friends", "outdoor"],
    mentions: [],
    paragraph:
      "Just spent the afternoon at the park with friends. Such a beautiful day!",
    shareCount: 3,
    date: "2024-10-12",
    time: "16:00",
    user: {
      name: "Ali",
      img: "/users/user4.png",
      bio: "",
      mutualFriends: 2,
    },
    reacts: {
      count: 9,
      topUseage: ["👍", "😘"],
      users: [
        [
          {
            id: 1,
            name: "gendy",
          },
          {
            id: 2,
            name: "marawan",
          },
          {
            id: 3,
            name: "mouhamed",
          },
          {
            id: 4,
            name: "isaa3",
          },
          {
            id: 5,
            name: "gogo",
          },
        ],
        [
          {
            id: 1,
            name: "sozaan",
          },
          {
            id: 2,
            name: "assmaa",
          },
          {
            id: 3,
            name: "ibrahim",
          },
          {
            id: 4,
            name: "osama",
          },
        ],
      ],
    },
    comments: {
      count: 0,
    },
  },
  {
    id: 3,
    link: [],
    img: [
      "/chat17.png",
      "/chat6.png",
      "/chat16.png",
      "/chat7.png",
      "/chat13.png",
    ],

    hashtags: ["hiking", "adventure", "nature"],
    mentions: [],
    paragraph:
      "This weekend’s hiking trip was absolutely breathtaking. Nature at its finest!",
    shareCount: 3,
    date: "2024-10-12",
    time: "16:00",
    user: {
      name: "Hassan",
      img: "/users/user10.png",
      bio: "",
      mutualFriends: 2,
    },
    reacts: {
      count: 9,
      topUseage: ["👍", "😘"],
      users: [
        [
          {
            id: 1,
            name: "gendy",
          },
          {
            id: 2,
            name: "marawan",
          },
          {
            id: 3,
            name: "mouhamed",
          },
          {
            id: 4,
            name: "isaa3",
          },
          {
            id: 5,
            name: "gogo",
          },
        ],
        [
          {
            id: 1,
            name: "sozaan",
          },
          {
            id: 2,
            name: "assmaa",
          },
          {
            id: 3,
            name: "ibrahim",
          },
          {
            id: 4,
            name: "osama",
          },
        ],
      ],
    },
    comments: {
      count: 1,
      allComments: [
        {
          id: 1,
          name: "Lisa Brown",
          time: "5 minutes ago",
          paragraph: "Your photos look stunning! I need to plan a hike soon.",
          likesCount: 1,
          image: "/users/user13.png",
          replays: [],
          reacts: {
            count: 1,
            topUseage: ["❤️"],
            users: [
              [
                {
                  id: 1,
                  name: "gendy",
                },
              ],
            ],
          },
        },
      ],
    },
  },
  {
    id: 4,
    link: [],
    img: ["/chat17.png", "/chat6.png", "/chat16.png"],
    hashtags: ["citylife", "exploration", "travel"],
    mentions: [],
    paragraph:
      "Exploring the city this weekend – so many hidden gems to discover!",
    shareCount: 3,
    date: "2024-10-12",
    time: "16:00",
    user: {
      name: "Nour",
      img: "/users/user8.png",
      bio: "",
      mutualFriends: 2,
    },
    reacts: {
      count: 9,
      topUseage: ["👍", "😘"],
    },
    comments: {
      count: 0,
    },
  },
  {
    id: 5,
    link: [],
    hashtags: ["books", "reading", "adventure"],
    mentions: [],
    paragraph:
      "Finished reading an incredible book this week – highly recommend it to anyone who loves adventure stories!",
    shareCount: 3,
    date: "2024-10-12",
    time: "16:00",
    user: {
      name: "Nagi",
      img: "/users/user7.png",
      bio: "",
      mutualFriends: 2,
    },
    reacts: {
      count: 9,
      topUseage: ["👍", "😘"],
    },
    comments: {
      count: 6,
      allComments: [
        {
          id: 1,
          name: "Lana Henrikseen",
          time: "2 days ago",
          paragraph:
            "What was the book? I’m always on the lookout for new reads.",
          likesCount: 3,
          replays: [
            {
              id: 2,
              name: "David Kim",
              time: "2 days ago",
              paragraph:
                "It was “The Alchemist” by Paulo Coelho. Truly life-changing.",
              likesCount: 1,
              replays: [
                {
                  id: 3,
                  name: "Lana Henrikseen",
                  time: "1 days ago",
                  paragraph: "Perfect, adding it to my list!",
                  likesCount: 1,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Lana Henrikseen",
          time: "2 days ago",
          paragraph:
            "I’ve been meaning to read more this year. Any other recommendations?",
          likesCount: 3,
          replays: [
            {
              id: 3,
              name: "David Kim",
              time: "2 days ago",
              paragraph:
                "Try “Sapiens” by Yuval Noah Harari. It’s fascinating!",
              likesCount: 1,
            },
          ],
          comments: {
            count: 1,
            allComments: [
              {
                id: 1,
                name: "Lisa Brown",
                time: "5 minutes ago",
                paragraph: "Thanks for the tips! I’ll check them out.",
                likesCount: 1,
                image: "/users/user13.png",
                replays: [],
                reacts: {
                  count: 1,
                  topUseage: ["❤️"],
                },
              },
            ],
          },
        },
        {
          id: 3,
          name: "Lana Henrikseen",
          time: "2 days ago",
          paragraph:
            "Reading really opens up new worlds. Love these discussions!",
          likesCount: 3,
        },
      ],
    },
  },
  {
    id: 6,
    img: ["/chat19.png"],
    link: ["www.google.com"],

    hashtags: ["books", "reading", "adventure"],
    mentions: [],
    paragraph:
      "Finished reading an incredible book this week – highly recommend it to anyone who loves adventure stories!",
    shareCount: 3,
    date: "2024-10-12",
    time: "16:00",
    user: {
      name: "John",
      img: "/users/user14.png",
      bio: "",
      mutualFriends: 2,
    },
    reacts: {
      count: 9,
      topUseage: ["👍", "😘"],
    },
    comments: {
      count: 6,
      allComments: [
        {
          id: 1,
          name: "Lana Henrikseen",
          time: "2 days ago",
          paragraph:
            "What was the book? I’m always on the lookout for new reads.",
          likesCount: 3,
          replays: [
            {
              id: 2,
              name: "David Kim",
              time: "2 days ago",
              paragraph:
                "It was “The Alchemist” by Paulo Coelho. Truly life-changing.",
              likesCount: 1,
              replays: [
                {
                  id: 3,
                  name: "Lana Henrikseen",
                  time: "1 days ago",
                  paragraph: "Perfect, adding it to my list!",
                  likesCount: 1,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Lana Henrikseen",
          time: "2 days ago",
          paragraph:
            "I’ve been meaning to read more this year. Any other recommendations?",
          likesCount: 3,
          replays: [
            {
              id: 3,
              name: "David Kim",
              time: "2 days ago",
              paragraph:
                "Try “Sapiens” by Yuval Noah Harari. It’s fascinating!",
              likesCount: 1,
            },
          ],
          comments: {
            count: 1,
            allComments: [
              {
                id: 1,
                name: "Lisa Brown",
                time: "5 minutes ago",
                paragraph: "Thanks for the tips! I’ll check them out.",
                likesCount: 1,
                image: "/users/user13.png",
                replays: [],
                reacts: {
                  count: 1,
                  topUseage: ["❤️"],
                },
              },
            ],
          },
        },
        {
          id: 3,
          name: "Lana Henrikseen",
          time: "2 days ago",
          paragraph:
            "Reading really opens up new worlds. Love these discussions!",
          likesCount: 3,
        },
      ],
    },
  },
];

export const products = [
  {
    id: 1,
    title: "Remote Control Car",
    images: ["/products/Remote Control Car.png"],
    details: "High-speed RC car with rechargeable battery.",
    time: "2025-03-10T12:30:00Z",
    section: "toys & games",
    category: null,
    location: "New York, USA",
    deliveryService: true,
    price: 350,
    sellerType: "user",
    sale: null,
    user: { name: "John Doe", img: "/users/user1.png" },
    page: null,
  },
  {
    id: 2,
    title: "Lego Super Set",
    images: ["/products/Lego Super Set.png"],
    details: "A 500-piece Lego set for endless creativity.",
    time: "2025-03-09T15:45:00Z",
    section: "toys & games",
    category: null,
    location: "Los Angeles, USA",
    deliveryService: false,
    sellerType: "user",
    price: 560,
    sale: null,
    user: { name: "Sarah Lee", img: "/users/user4.png" },
    page: null,
  },
  {
    id: 3,
    title: "Board Game: Monopoly",
    images: ["/products/Board Game Monopoly.png"],
    details: "Classic Monopoly board game for family fun.",
    time: "2025-03-08T10:15:00Z",
    section: "toys & games",
    category: "Family Games",
    location: null,
    deliveryService: true,
    sellerType: "page",
    price: 700,
    sale: 10,
    user: null,
    page: { name: "GameWorld", img: "/users/user2.png" },
  },

  // hardware
  {
    id: 4,
    title: "Gaming Graphics Card",
    images: ["/products/Gaming Graphics Card.png"],
    details: "NVIDIA RTX 4070 with 12GB VRAM.",
    time: "2025-03-07T18:20:00Z",
    section: "hardware",
    category: "Gaming Components",
    location: null,
    deliveryService: true,
    sellerType: "page",
    price: 56000,
    sale: 5,
    user: null,
    page: { name: "TechStore", img: "/users/user5.png" },
  },
  {
    id: 5,
    title: "Mechanical Keyboard",
    images: ["/products/Mechanical Keyboard.png"],
    details: "RGB backlit mechanical keyboard with blue switches.",
    time: "2025-03-06T21:00:00Z",
    section: "hardware",
    category: null,
    location: "Houston, USA",
    deliveryService: false,
    sellerType: "user",
    price: 1600,
    sale: null,
    user: { name: "Mike Brown", img: "/users/user6.png" },
    page: null,
  },

  // phones
  {
    id: 6,
    title: "iPhone 15 Pro Max",
    images: ["/products/iPhone 15 Pro Max.png"],
    details: "256GB, Space Black, brand new in box.",
    time: "2025-03-05T13:10:00Z",
    section: "phones",
    category: null,
    location: "Chicago, USA",
    deliveryService: true,
    sellerType: "user",
    price: 45000,
    sale: null,
    user: { name: "Emily Clark", img: "/users/user7.png" },
    page: null,
  },
  {
    id: 7,
    title: "Samsung Galaxy S24 Ultra",
    images: ["/products/Samsung Galaxy S24 Ultra.png"],
    details: "512GB, Phantom Black, factory unlocked.",
    time: "2025-03-04T17:55:00Z",
    section: "phones",
    category: "Smartphones",
    location: null,
    deliveryService: true,
    sellerType: "page",
    price: 60000,
    sale: 3,
    user: null,
    page: { name: "MobileHub", img: "/users/user15.png" },
  },

  // consoles
  {
    id: 8,
    title: "PlayStation 5",
    images: ["/products/PlayStation 5.png"],
    details: "Sony PS5 console with 1TB storage.",
    time: "2025-03-03T09:40:00Z",
    section: "consoles",
    category: "Gaming consoles",
    location: null,
    deliveryService: true,
    sellerType: "page",
    price: 19000,
    sale: 6,
    user: null,
    page: { name: "GameStop", img: "/users/user13.png" },
  },
  {
    id: 9,
    title: "Smart LED Bulb",
    images: ["/products/Smart LED Bulb.png"],
    details: "Color-changing smart bulb compatible with Alexa.",
    time: "2025-03-02T22:25:00Z",
    section: "home related",
    category: null,
    location: "Miami, USA",
    deliveryService: false,
    sellerType: "user",
    price: 320,
    sale: null,
    user: { name: "Sophia Green", img: "/users/user10.png" },
    page: null,
  },

  // computers
  {
    id: 10,
    title: "MacBook Pro M2",
    images: ["/products/MacBook Pro M2.png"],
    details: "Apple MacBook Pro 14-inch, 16GB RAM, 512GB SSD.",
    time: "2025-03-01T16:05:00Z",
    section: "computers",
    category: "Laptops",
    location: null,
    deliveryService: true,
    sellerType: "page",
    price: 380000,
    sale: 1,
    user: null,
    page: { name: "TechZone", img: "/users/user14.png" },
  },

  // accessories
  {
    id: 11,
    title: "Wireless Earbuds",
    images: ["/products/Wireless Earbuds.png"],
    details: "Noise-canceling earbuds with 20-hour battery life.",
    time: "2025-02-28T14:45:00Z",
    section: "accessories",
    category: null,
    location: "Dallas, USA",
    deliveryService: true,
    sellerType: "user",
    price: 950,
    sale: null,
    user: { name: "James Wilson", img: "/users/user8.png" },
    page: null,
  },

  // sports equipment
  {
    id: 12,
    title: "Treadmill",
    images: ["/products/Treadmill.png"],
    details: "Foldable electric treadmill with LCD display.",
    time: "2025-02-27T20:30:00Z",
    section: "sports equipment",
    category: "Fitness",
    location: null,
    deliveryService: true,
    sellerType: "page",
    price: 65000,
    sale: 9,
    user: null,
    page: { name: "FitShop", img: "/users/user11.png" },
  },

  // fashion
  {
    id: 13,
    title: "Leather Jacket",
    images: ["/products/Leather Jacket.png"],
    details: "Genuine leather biker jacket for men.",
    time: "2025-02-26T12:15:00Z",
    section: "fashion",
    category: null,
    location: "San Diego, USA",
    deliveryService: false,
    sellerType: "user",
    price: 490,
    sale: null,
    user: { name: "Oliver Adams", img: "/users/user12.png" },
    page: null,
  },

  // pet supplies
  {
    id: 14,
    title: "Pet Food Bowl",
    images: ["/products/Pet Food Bowl.png"],
    details: "Stainless steel food bowl for cats and dogs.",
    time: "2025-02-25T08:50:00Z",
    section: "pet supplies",
    category: null,
    location: "Seattle, USA",
    deliveryService: true,
    sellerType: "user",
    price: 150,
    sale: null,
    user: { name: "Mia Roberts", img: "/users/user1.png" },
    page: null,
  },
  {
    id: 15,
    title: "Honda Civic 2020",
    images: ["/products/Honda Civic 2020.png"],
    details: "Well-maintained sedan with low mileage.",
    time: "2025-03-10T12:30:00Z",
    section: "vehicles",
    category: null,
    location: "New York, USA",
    deliveryService: false,
    sellerType: "user",
    price: 680000,
    sale: null,
    user: { name: "John Doe", img: "/users/user2.png" },
    page: null,
  },
  {
    id: 16,
    title: "Electric Scooter - Xiaomi Pro 2",
    images: ["/products/Electric Scooter - Xiaomi Pro 2.png"],
    details: "Foldable electric scooter with a 30-mile range.",
    time: "2025-03-09T15:45:00Z",
    section: "vehicles",
    category: "Electric vehicles",
    location: null,
    deliveryService: true,
    sellerType: "page",
    price: 3000,
    sale: 30,
    user: null,
    page: { name: "EcoRide", img: "/users/user.png" },
  },
  {
    id: 21,
    title: "Apple Watch Series 9",
    images: ["/products/Apple Watch Series 9.png"],
    details: "GPS + Cellular, 45mm, Midnight Aluminum.",
    time: "2025-03-04T17:55:00Z",
    section: "accessories",
    category: "Smartwatches",
    location: "Chicago, USA",
    deliveryService: true,
    sellerType: "user",
    price: 42000,
    sale: null,
    user: { name: "Emily Clark", img: "/users/user10.png" },
    page: null,
  },
  {
    id: 22,
    title: "Rolex Submariner",
    images: ["/products/Rolex Submariner.png"],
    details: "Luxury automatic dive watch, stainless steel.",
    time: "2025-03-03T09:40:00Z",
    section: "accessories",
    category: "Luxury watches",
    location: null,
    deliveryService: true,
    sellerType: "page",
    price: 450000,
    sale: null,
    user: null,
    page: { name: "LuxuryTime", img: "/users/user14.png" },
  },
];

export const stories = [
  {
    id: 1,
    userId: 1,
    username: "Alex Johnson",
    avatar: "/users/user1.png",
    body: "Just visited the new coffee shop downtown! ☕️",
    timestamp: "2023-05-15T09:30:00Z",
    mentions: [
      {
        id: 1,
        name: "ahmed",
      },
      {
        id: 2,
        name: "mouhamed",
      },
      {
        id: 3,
        name: "osama",
      },
      {
        id: 4,
        name: "lolooo",
      },
      {
        id: 5,
        name: "salwaaa",
      },
    ],
    settings: {
      body: {
        x: 0,
        y: 0,
        size: 18,
        family: "Roboto",
        color: "333333",
        background: "f8f8f8",
      },
      background: {
        type: "gradient",
        first_Acquisition: "30",
        second_Acquisition: "80",
        first: "#84fab0",
        second: "#8fd3f4",
        deg: "120",
      },
    },
  },
  {
    id: 2,
    userId: 2,
    username: "Sarah Williams",
    avatar: "/users/user2.png",
    body: "Weekend hiking adventures! 🏔️ #nature",
    images: ["/chat4.png"],
    timestamp: "2023-05-14T16:45:00Z",
    settings: {
      body: {
        x: 0,
        y: 220,
        size: 20,
        family: "Montserrat",
        color: "ffffff",
        background: "000000",
      },
      images: [
        {
          x: 0,
          y: 0,
          width: 150,
        },
      ],
      background: {
        type: "static",
        color: "#6a11cb",
      },
    },
  },
  {
    id: 3,
    userId: 3,
    username: "Michael Chen",
    avatar: "/users/user3.png",
    body: "كورس مجاني الحقوه بسرعة يا شباب",
    link: "https://example.com/my-project",
    timestamp: "2023-05-13T11:20:00Z",
    settings: {
      body: {
        x: 0,
        y: 0,
        size: 25,
        family: "Roboto",
        color: "333333",
        background: "f8f8f8",
      },
      link: {
        x: 0,
        y: 60,
        size: 20,
      },
      background: {
        type: "gradient",
        first_Acquisition: "30",
        second_Acquisition: "80",
        first: "#ff9a9e",
        second: "#fad0c4",
        deg: "180",
      },
    },
  },
  {
    id: 4,
    username: "Emma Davis",
    userId: 4,
    avatar: "/users/user4.png",
    body: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz 🎨",
    images: ["/chat6.png", "/chat8.png"],
    timestamp: "2023-05-12T19:15:00Z",
    settings: {
      body: {
        x: 0,
        y: 0,
        size: 22,
        family: "Playfair Display",
        color: "ff0000",
        background: "ffff00",
      },
      images: [
        { x: 0, y: -180, width: 120 },
        { x: 0, y: 200, width: 160 },
      ],
      background: {
        type: "static",
        color: "#ffffff",
      },
    },
  },
  {
    id: 5,
    userId: 4,
    username: "Emma Davis",
    avatar: "/users/user4.png",
    body: "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy 🎨",
    images: ["/chat6.png", "/chat8.png"],
    timestamp: "2023-05-12T19:15:00Z",
    settings: {
      body: {
        x: 0,
        y: 0,
        size: 22,
        family: "Playfair Display",
        color: "ff0000",
        background: "ffff00",
      },
      images: [
        { x: 0, y: -180, width: 120 },
        { x: 0, y: 200, width: 160 },
      ],
      background: {
        type: "static",
        color: "#ffffff",
      },
    },
  },
  {
    id: 6,
    userId: 4,
    username: "Emma Davis",
    avatar: "/users/user4.png",
    body: "xxxxxxxxxxxxxxxxxxxxxxxxxxx 🎨",
    images: ["/chat6.png", "/chat8.png"],
    timestamp: "2023-05-12T19:15:00Z",
    settings: {
      body: {
        x: 0,
        y: 0,
        size: 22,
        family: "Playfair Display",
        color: "ff0000",
        background: "ffff00",
      },
      images: [
        { x: 0, y: -180, width: 120 },
        { x: 0, y: 200, width: 160 },
      ],
      background: {
        type: "static",
        color: "#ffffff",
      },
    },
  },
  {
    id: 7,
    userId: 5,
    username: "David Kim",
    avatar: "/users/user5.png",
    body: "New recipe experiment! 🍳",
    timestamp: "2023-05-11T13:10:00Z",
    settings: {
      body: {
        x: 0,
        y: 0,
        size: 30,
        family: "Lato",
        color: "ffffff",
        background: "ff6347",
      },
      background: {
        type: "gradient",
        first_Acquisition: "30",
        second_Acquisition: "80",
        first: "#fbc2eb",
        second: "#a18cd1",
        deg: "45",
      },
    },
  },
  {
    id: 8,
    userId: 6,
    username: "Olivia Martinez",
    avatar: "/users/user6.png",
    images: ["/chat12.png"],
    timestamp: "2023-05-10T18:30:00Z",
    mentions: [
      {
        id: 1,
        name: "ahmed",
      },
      {
        id: 2,
        name: "mouhamed",
      },
      {
        id: 3,
        name: "osama",
      },
      {
        id: 4,
        name: "lolooo",
      },
      {
        id: 5,
        name: "salwaaa",
      },
    ],
    settings: {
      images: [
        {
          x: 0,
          y: 0,
          width: 125,
        },
      ],
      background: {
        type: "gradient",
        first: "#a1c4fd",
        second: "#c2e9fb",
        deg: "135",
        first_Acquisition: "30",
        second_Acquisition: "80",
      },
    },
  },
];


  // Function to process stories and get latest per user with counts
  export const processStories = (stories) => {
    // First sort all stories by timestamp (newest first)
    const sortedStories = [...stories].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    const userStoriesMap = new Map();

    // Iterate through sorted stories
    sortedStories.forEach((story) => {
      if (!userStoriesMap.has(story.userId)) {
        // If user not in map, add with count 1
        userStoriesMap.set(story.userId, {
          ...story,
          totalStories: 1,
        });
      } else {
        // If user already in map, just increment count
        const existing = userStoriesMap.get(story.userId);
        userStoriesMap.set(story.userId, {
          ...existing,
          totalStories: existing.totalStories + 1,
        });
      }
    });

    // Convert map values to array
    return Array.from(userStoriesMap.values());
  };