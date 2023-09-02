import { clientCredentials } from '../client';

const getBusinesstype = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/businesstypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getBusinesstype;
