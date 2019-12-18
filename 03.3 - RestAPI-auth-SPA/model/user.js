const bcrypt = require('bcryptjs');

//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const userExtent = [];

class User {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(firstName, lastName, email, passwordHash, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    //dodawanie obiektu do bazy
    static add(user) {
        user.id = nextId++;
        userExtent.push(user);
        return user;
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return userExtent;
    }
    //edycja obiektu
    static edit(user) {
        //FIXME
    }
    //usuwanie obiektu po id
    static delete(id) {
        //FIXME
    } 
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        userExtent.splice(0, userExtent.length);
        //resetujemy licznik id
        nextId = 1;
        User.hashPassword("1234")
          .then(hash1 => {
            //dla uproszczenia wszyscy użytkowinicy mają takie samo hasło :)
            User.add(new User('Jan', 'Kowalski', 'jk@wp.pl', hash1));
            User.add(new User('Anna', 'Wiśniewska', 'aw@onet.pl', hash1));
            User.add(new User('Andrzej', 'Nowak', 'an@gmail.com', hash1));
          })
          .catch(err => {
            console.log(err);
          });
    }

    static findByEmail(email) {
      return userExtent.find(u => u.email == email);
    }

    static hashPassword(plainPassword) {
      //wołanie asynchroniczne
      //zwraca promesę, a nie wynik bezpośrednio
      return bcrypt.hash(plainPassword, 12);
    }

    comparePassword(plainPassword) {
      //wołanie asynchroniczne
      //zwraca promesę, a nie wynik bezpośrednio
      return bcrypt.compare(plainPassword, this.passwordHash);
    }
}

User.initData();

module.exports = User;