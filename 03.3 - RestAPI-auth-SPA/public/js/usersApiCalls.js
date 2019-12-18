const baseUrl = 'http://localhost:3000'
const userApiBaseUrl = `${baseUrl}/api/users`;
const authApiBaseUrl = `${baseUrl}/api/auth`;

function setAuthToken(req) {
  const jwtoken = localStorage.getItem('auth-token');
  req.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
}

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
    setAuthToken(req);
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
    setAuthToken(req);
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
    setAuthToken(req);
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
    setAuthToken(req);
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
    setAuthToken(req);
    req.send(null);
}

function loginCall(email, password, callback, errorCallback) {
  const req = new XMLHttpRequest();
  req.open('POST', `${authApiBaseUrl}/login`, true);
  req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
          if (req.status == 200) {
            const respText = req.responseText;
            console.log(`login callback: resp: ${respText}`);
            const loginData = JSON.parse(respText);
            localStorage.setItem('auth-token', loginData.token);
            callback();
          } else if (req.status == 401) {
            errorCallback();
          } else {
              dump("Błąd podczas ładowania strony\n");
          }
      }
  };
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  const loginData = JSON.stringify({
    email: email,
    password: password
  })
  req.send(loginData);
}

function dump(text) {
    console.log(text);
}