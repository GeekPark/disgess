const userName = [
  '极客漫游者',
];

const avatars = [];
for (let i = 1; i <= 8; i++) avatars.push(require(`./images/${i}.jpg`));

const random = (min, max) => Math.round(Math.random() * (max - min)) + min;
const randomUserName = () => userName[random(0, userName.length - 1)];
const tryKey = (obj, key) => (
  (obj === null || obj === undefined || !obj.hasOwnProperty(key)) ? null : obj[key]
);

const randomAvatar = () => avatars[random(0, avatars.length - 1)];

const mockUser = () => ({
  username: randomUserName(),
  avatar_url: randomAvatar(),
});

export { random, randomUserName, tryKey, randomAvatar, mockUser };
