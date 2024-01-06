import USERS from '@/components/RandomAvatar/avatars';

export const randomInformation = () => {
  const randomIndex = Math.floor(Math.random() * (USERS.length - 1));
  const message = `${USERS[randomIndex].lastMessage}`;
  const name = `${USERS[randomIndex].name}`;

  return { message, name };
};
