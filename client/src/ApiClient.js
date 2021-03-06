// API Object

function ping(cb) {
    return fetch('/api/ping', {
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

function getFolderList(cb) {
    return fetch('/api/folders', {
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

const Client = {ping, getFolderList};
export default Client;
