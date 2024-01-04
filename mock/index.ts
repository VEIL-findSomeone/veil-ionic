export const images = [
  '/dummyFace/dummy1.jpeg',
  '/dummyFace/dummy2.jpeg',
  '/dummyFace/dummy3.jpeg',
  '/dummyFace/dummy4.jpeg',
  '/dummyFace/dummy5.jpeg',
  '/dummyFace/dummy6.jpeg',
];

export interface HomeItem {
  title: string;
  type: string;
  text: string;
  author: string;
  authorAvatar: string;
  image: string;
}

export const homeItems: HomeItem[] = [
  {
    title: '김나박',
    type: '27',
    text: '진지한 사람을 찾고있습니다.',
    author: 'Sunny Yoon',
    authorAvatar: '/img/sunny.jpg',
    image: images[0],
  },
  {
    title: '박수단',
    type: '35',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    author: 'Sunny Yoon',
    authorAvatar: '/img/sunny.jpg',
    image: images[1],
  },
  {
    title: '한국현',
    type: '28',
    text: 'FWB X 흡연자 X 배나온사람 뒤로가기 눌러주세요',
    author: 'Sunny Yoon',
    authorAvatar: '/img/sunny.jpg',
    image: images[2],
  },
  {
    title: '이리박',
    type: '18',
    text: 'LA를 말해서 그러는데 지금 현진이가 LAD에서 뛰고 있잖아요 요새 부상으로 맘고생이 심할텐데 제가LA있을때 말이죠 저또한 허리부상으로 인해서 굉장히 힘들었어요',
    author: 'Sunny Yoon',
    authorAvatar: '/img/sunny.jpg',
    image: images[3],
  },
  {
    title: '김리문',
    type: '22',
    text: '제가 LA에 있을때는 말이죠 정말 제가 꿈에 무대인 메이저리그로 진출해서 가는 식당마다 싸인해달라 기자들은 항상 붙어다니며 취재하고 제가 그 머~ 어~ 대통령이 된 기분이였어요 그런데 17일만에 17일만에 마이너리그로 떨어졌어요 못던져서 그만두고 그냥 확 한국으로 가버리고 싶었어요 그래서 집에 가는길에 ',
    author: 'Sunny Yoon',
    authorAvatar: '/img/sunny.jpg',
    image: images[4],
  },
  {
    title: '한순천',
    type: '36',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    author: 'Sunny Yoon',
    authorAvatar: '/img/sunny.jpg',
    image: images[5],
  },
];

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
