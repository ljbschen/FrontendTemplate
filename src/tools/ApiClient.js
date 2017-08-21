// API Object

function getApi(cb) {
    return fetch('/api/food', {
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getCsv(cb) {
    return fetch('/api/getCsv', {
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getFirstDate(cb) {
    return fetch('/api/countdown', {
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getFolderList(cb) {
    return fetch('/api/folders', {
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = {getApi, getFirstDate, getCsv};
export default Client;
