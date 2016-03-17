const userName = [
  'R2-D2',
  'C-3PO',
  'BB-8',
];

const avatars = [];
for (let i = 1; i <= 8; i++) avatars.push(require(`./images/${i}.jpg`));

const random = (min, max) => Math.round(Math.random() * (max - min)) + min;
const randomUserName = () => userName[random(0, userName.length - 1)];
const tryKey = (obj, key) => obj === null || !obj.hasOwnProperty(key) ? null : obj[key];

const randomAvatar = () => avatars[random(0, avatars.length - 1)];

export { random, randomUserName, tryKey, randomAvatar };
