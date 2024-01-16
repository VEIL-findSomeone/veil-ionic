export const notifications = [
  { title: 'New friend request', when: '6 hr' },
  { title: 'Please change your password', when: '1 day' },
  { title: 'You have a new message', when: '2 weeks' },
  { title: 'Welcome to the app!', when: '1 month' },
];

// Some fake lists
export const lists = [
  {
    name: 'Groceries',
    id: 'groceries',
    items: [
      { name: 'Apples', done: true },
      { name: 'Bananas', done: false },
      { name: 'Milk', done: false },
      { name: 'Ice Cream', done: true },
    ],
  },
  {
    name: 'Hardware Store',
    id: 'hardware',
    items: [
      { name: 'Circular Saw', done: true },
      { name: 'Tack Cloth', done: true },
      { name: 'Drywall', done: true },
      { name: 'Router', done: true },
    ],
  },
  {
    name: 'Work',
    id: 'work',
    items: [
      { name: 'TPS Report', done: false },
      { name: 'Set up email', done: true },
    ],
  },
  { name: 'Reminders', id: 'reminders' },
];
