const userApiBaseUrl = 'http://localhost:3000/api/users';

//po wykonaniu żądania będzie wywołana funkcja zwrotna (callback) z pobranymi danymi jako parametr
function getUserListCall(callback) {
    const req = new XMLHttpRequest();
    req.open('GET', userApiBaseUrl, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                // dump(respText);
                const userData = JSON.parse(respText);
                callback(userData);
                // console.log(`users json: ${JSON.stringify(userData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function getUserDetailsCall(userId, formMode, callback) {
    const req = new XMLHttpRequest();
    req.open('GET', `${userApiBaseUrl}/${userId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                // dump(respText);
                const userDetailsData = JSON.parse(respText);
                callback(formMode, userDetailsData);
                // console.log(`users json: ${JSON.stringify(userData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function addUserCall(userData, callback) {
    const req = new XMLHttpRequest();
    req.open('POST', userApiBaseUrl, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 201) {
                callback();
                // console.log(`users json: ${JSON.stringify(userData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    const userDataString = JSON.stringify(userData);
    console.log(`addUser() userData: ${userDataString}`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(userDataString);
}

function editUserCall(userData, callback) {
    const req = new XMLHttpRequest();
    req.open('PUT', `${userApiBaseUrl}/${userData.id}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 204) {
                callback();
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    const userDataString = JSON.stringify(userData);
    console.log(`addUser() userData: ${userDataString}`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(userDataString);
}

function deleteUserCall(userId, callback) {
    const req = new XMLHttpRequest();
    req.open('DELETE', `${userApiBaseUrl}/${userId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 204) {
                callback();
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function dump(text) {
    console.log(text);
}