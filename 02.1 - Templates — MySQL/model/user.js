const db = require('../db/mysql');

class User {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(firstName, lastName, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    //dodawanie obiektu do bazy
    static add(user) {
      //wywołuje polecenie sql i zwraca promesę (Promise)
        return db.execute(
          'insert into users (firstName, lastName) values (?, ?)',
          [user.firstName, user.lastName]
        );
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
      //wywołuje polecenie sql i zwraca promesę (Promise)
      return db.execute('select * from users');
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
   
}
module.exports = User;