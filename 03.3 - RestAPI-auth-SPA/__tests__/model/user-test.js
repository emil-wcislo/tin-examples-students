const User = require('../../model/user');

//resetowanie stanu bazy danych przed każdym testem
beforeEach(() => {
    User.initData();  
});

test('listTest()', () => {
    const users = User.list();
    expect(users.length).toBe(3); 
});

test('addTest()', () => {
    const newUser = new User("Sławomir", "Kowal");
    User.add(newUser);
    const users = User.list();
    expect(users.length).toBe(4);
    const addedUser = users[3];
    expect(addedUser.firstName).toBe("Sławomir"); 
    expect(addedUser.lastName).toBe("Kowal");
});

test('editTest()', () => {
    //...    
    // throw Error('test not implemented yet');
});

test('deleteTest()', () => {
    //...    
    // throw Error('test not implemented yet');
});

test('detailsTest()', () => {
    //...    
    // throw Error('test not implemented yet');
});