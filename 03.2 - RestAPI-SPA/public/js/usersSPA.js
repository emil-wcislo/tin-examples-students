const usersView = document.getElementById('view-users');
const tbodyUsers = document.getElementById('tbody-users');

const formView = document.getElementById('view-form');
const formTitle = document.getElementById('form-title');
const saveButton = document.getElementById('form-submit');
const formId = document.getElementById('form-userId');
const formFirstName = document.getElementById('form-firstName');
const formLastName = document.getElementById('form-lastName');

document.getElementById('link-users').onclick = function(evt) {
    getAndRenderUsers();
}

document.getElementById('link-main-page').onclick = function(evt) {
    //ukrycie listy i formularza
    usersView.classList.add("hidden");
    formView.classList.add("hidden");
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
    //pokaż widok listy użytkowniów
    usersView.classList.remove("hidden");
    //ukryj widok formularza
    formView.classList.add("hidden");
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

    formView.classList.remove("hidden");
    usersView.classList.add("hidden");
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
    formView.classList.add("hidden");
    usersView.classList.remove("hidden");
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