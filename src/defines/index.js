const user = {
  userId: 10000,
  email: 'test@test.com',
  password: 'test123',
};

let usersList = [];

const agava = 'Aguaviva specializes in the freshest fish and seafood prepared with\n' +
  'Latino – Caribbean flair, and features a wonderful oyster and\n' +
  'ceviche bar in front of the open kitchen. In 2003, Aguaviva was\n' +
  'named one of the 75 best new restaurants in the world by Conde\n' +
  'Nast Traveler magazine. A variety of ceviches are offered, served\n' +
  'with tostones of course, as well as several types of oysters, which\n' +
  'are flown in daily, as are the fresh Maine lobsters. The\n' +
  'atmosphere at Aguaviva is hip and refreshing, designed to feel as if you were dining by the sea\n' +
  'with its glowing blue and white décor';

const sofiaItalian = 'With its romantic ambiance and superb food offering, the recently opened Sofia Italian Kitchen and\n' +
  'Bar, invites you to savor the best of Italy in Old San Juan. The place has a quiet, old world\n' +
  'environment that complements perfectly the wonderful variety of\n' +
  'traditional Italian dishes that are the main attraction in the restaurant,\n' +
  'served by a knowledgeable and friendly staff. Starters include an array\n' +
  'of traditional antipasto ingredients, a new twist on seafood favorites or\n' +
  'salads. Favorites include a medley of traditional pizzas and the outstanding classics pasta\n' +
  'menu. Delight your senses with “Brasato de cosciotto di agnello”, the traditonal “Scaloppini\n' +
  'alla parmegiana” or the wonderful “Tonno alla putanesca”. ';

const restaurants = new Array(10)
  .fill( {
    id: 1,
    name: 'restaurant',
    visits: [],
    stars: 0,
    comment: '',
  })
  .map((item, key) => (
    {
     ...item,
      id: item.id + key + 1,
      name: item.name.concat(key + 1),
      description: key % 2 === 0 ? sofiaItalian : agava,
    }
  ));

export {
  user,
  usersList,
  restaurants,
};
