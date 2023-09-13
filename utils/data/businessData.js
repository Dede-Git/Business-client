import { clientCredentials } from '../client';

const getBusinesses = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/businesses`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export

const createBusiness = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/businesses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleBusiness = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/businesses/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const deleteSingleBusiness = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/businesses/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const updateBusiness = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/businesses/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const favBusiness = (businessId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/businesses/${businessId}/favorite`, {
    method: 'POST',
    body: JSON.stringify(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const unfavBusiness = (businessId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/businesses/${businessId}/unfavorite`, {
    method: 'DELETE',
    body: JSON.stringify(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getBusinesses, createBusiness, getSingleBusiness, updateBusiness, deleteSingleBusiness, favBusiness, unfavBusiness,
};
