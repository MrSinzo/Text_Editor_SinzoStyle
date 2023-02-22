import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return; // if database already exists, exit this condition
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created'); // if database does not exist this will create a DB with the name of jate, gave it an object of params with keyPaths vae being id and autoIncrement will assign a new id number based on the previous one in the database 
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented correctly');
  // 1. we create a connection to the database and specify what evrsion of the database we want to use
  const jateDb = await openDB('jate', 1);
  // 2. we create a "transaction" and specify the database and data "privileges"(readonly or readwrite, ).
  const transaction = jateDb.transaction('jate', 'readwrite');
  // 3. Open up the desired object store ('your database').
  const store = transaction.objectStore('jate')
  // 4. 
  const request = store.add({ content: content }); // find where value is coming from
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented correctly');
  // we create a connection to the database and specify what evrsion of the database we want to use
  const jateDb = await openDB('jate', 1);
  //we create a "transaction" and specify the database and data "privileges"(readonly or readwrite, ).
  const transaction = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = transaction.objectStore('jate')
  // We use the .getAll() to get all data inside the database.
  const request = store.getAll()

  // wait for confirmation of request
  const result = await request;
  console.log('result.value' , result)
  return result?.content;
}

initdb();
