const linkUsers = document.getElementById('link-users');
const linkMainPage = document.getElementById('link-main-page');
const linkLogin = document.getElementById('link-login');
const linkLogout = document.getElementById('link-logout');

const usersView = document.getElementById('view-users');
const tbodyUsers = document.getElementById('tbody-users');

const formView = document.getElementById('view-form');
const formTitle = document.getElementById('form-title');
const saveButton = document.getElementById('form-submit');
const formId = document.getElementById('form-userId');
const formFirstName = document.getElementById('form-firstName');
const formLastName = document.getElementById('form-lastName');

const loginView = document.getElementById('view-login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginError = document.getElementById('login-error');

const views = [usersView, formView, loginView];

linkUsers.onclick = function(evt) {
    getAndRenderUsers();
}

linkMainPage.onclick = function(evt) {
    //ukrycie listy i formularza
    hideAllViews();
    // usersView.classList.add("hidden");
    // formView.classList.add("hidden");
    // loginView.classList.add("hidden");
}

linkLogin.onclick = function(evt) {
  hideAllViews();
  loginView.classList.remove('hidden');
}

linkLogout.onclick = function(evt) {
  logout();
}

//ukrywa wszystkie widoki
function hideAllViews() {
  views.forEach(el => el.classList.add("hidden"));
}

//pobranie danych z serwera przez API 
//i przekazanie ich do funkcji aktualizującej widok
function getAndRenderUsers() {
    getUserListCall(renderUsersTable);
}

//tworzymy widok tabeli z danymi użytkowników
//na podstawie listy użytkowników (obiektów typu JSON)
function renderUsersTable(userList) {

    //usuwamy istniejące wiersze z danymi z widoku
    while (tbodyUsers.firstChild) {
        tbodyUsers.removeChild(tbodyUsers.firstChild);
    }
    //tworzymy wiersze tabeli z danymi użytkowników na podstawie listy obiektów
    let usersHtml = "";
    userList.forEach(u => {
        usersHtml += `
            <tr>
                <td>${u.id}</td>            
                <td>${u.firstName}</td>            
                <td>${u.lastName}</td>
                <td class="actions">
                    <a href="#" onClick="showDetails(${u.id})">Szczegóły</a>
                    <a href="#" onClick="showEdit(${u.id})">Edytuj</a>
                    <a href="#" onClick="deleteUser(${u.id})">Usuń</a>
                </td>            
            </tr>
        `;
    });
    tbodyUsers.innerHTML = usersHtml;
    hideAllViews();
    //pokaż widok listy użytkowniów
    usersView.classList.remove("hidden");
}

/**
 * Wyświetla formularz użytkownika
 * @param {String} mode Tryb formularza - szczegóły (details),
 *  nowy użytkownik (new), edycja (edit)
 * @param {User} userData - dane użytkownika do wyświetlenia 
 */
function showUserForm(mode, userData) {
    const formModeSettings = formModes[mode];
    // console.log(`showUserForm() mode: ${mode}, settings: ${JSON.stringify(formModeSettings)} userData: ${JSON.stringify(userData)}`);

    if(mode == "new") {
        userData = {firstName: '', lastName: ''};
    }
    //ustawiamy tytuł formularza w zależności od typu
    formTitle.innerText = formModeSettings.title;
    //dla widoku szczegółów pola formularza będą tylko do odczytu
    //a guzik 'Zapisz' nie będzie widoczny
    if(formModeSettings.readonly === true) {
        formFirstName.readOnly = true;
        formLastName.readOnly = true;
        saveButton.classList.add('hidden');
    } else {
        formFirstName.readOnly = false;
        formLastName.readOnly = false;
        saveButton.classList.remove('hidden');
    }
    //ustawiamy wartości pól formularza (dla widoku szczegółów lub edycji)
    formId.value = userData.id;
    formFirstName.value = userData.firstName;
    formLastName.value = userData.lastName;

    //ustawiamy działanie guzika 'zapisz' w zależności od trybu formularza
    saveButton.onclick = () => { 
        saveForm(formModeSettings.saveActionApiCall);
     };

    hideAllViews();
    formView.classList.remove("hidden");
}

function showDetails(userId) {
    getUserDetailsCall(userId, 'details', showUserForm);
}

function showEdit(userId) {
    getUserDetailsCall(userId, 'edit', showUserForm);
}

function showNew() {
    showUserForm('new', {firstName: '', lastName: ''});
}

function deleteUser(userId) {
    deleteUserCall(userId, getAndRenderUsers);
}


function saveForm(apiCall) {
    // console.log(`saveForm(${action})`);

    //pobranie danych z formularza 
    //i utworznie obiektu user-a
    const userData = {
        id: formId.value,
        firstName: formFirstName.value,
        lastName: formLastName.value
    }
    
    // if('add' == action) {
        apiCall(userData, getAndRenderUsers);
    // } else if('edit' == action) {
    //     editUserCall(userData, getAndRenderUsers);
    // }

    //BARDZO WAŻNE - akcja guzika na formularzu powinna zwrócić false, inaczej
    //formularz będzie wysłany w standardowy sposób, a strona będzie przeładowana
    return false;
}

function cancelForm() {
    hideAllViews();  
    usersView.classList.remove("hidden");
}


function showLogin() {
  hideAllViews();
  loginView.classList.remove("hidden");
}


document.getElementById('login-submit').onclick = function (evt) {
  const email = loginEmail.value;
  const password = loginPassword.value;
  //wysłanie formularza logowania
  console.log(`userSPA sendLogin email: ${email} password: ${password}`);
  loginCall(email, password, loginSucessful, loginFailure);
}

function loginSucessful() {
  console.log(`login sucessful`);
  hideAllViews();
  linkLogin.classList.add('hidden');
  linkLogout.classList.remove('hidden');
  loginError.classList.add('hidden');
  
}

function loginFailure() {
  console.log(`login failure`);
  loginError.classList.remove('hidden');
}

function logout() {
  hideAllViews();
  localStorage.setItem('auth-token', null);
  linkLogin.classList.remove('hidden');
  linkLogout.classList.add('hidden');
  // linkUsers.classList.add('hidden');
}

/**
 *  konfiguracja formularza w zależności od trybu 
 *  title - tytuł formularza
 *  readonly - czy pola formularza będą tylko do odczytu
 *  saveActionApiCall - funkcja (z usersApiCalls.js) wywołująca API back-endu
 */
const formModes = {
    details: {
        title: "Szczegóły użytkownika",
        readonly: true,
        saveActionApiCall: null
    },
    "new": {
        title: "Nowy użytkownik",
        readonly: false,
        saveActionApiCall: addUserCall
    },
    edit: {
        title: "Edycja użytkownika",
        readonly: false,
        saveActionApiCall: editUserCall
    }
};