import "./firebase";
import { getDatabase, ref, push, set, get, onValue, remove } from 'firebase/database';

const db = getDatabase();

export async function dbSet(table, value, key){
    var dbRef = key ? ref(db, table + '/' + key) : push(ref(db, table));
    return await set(dbRef, value);
}

export async function dbGet(table){
    try {
        const snapshot = await get(ref(db, table));
        return snapshot.exists() ? snapshot.val() : {};
    } catch (error) {
        console.error('Error retrieving records:', error);
        return {};
    }
}

export function dbGetListener(table, callback){
    return onValue(ref(db, table), (snapshot) => callback(snapshot.exists() ? snapshot.val() : {}));
}

export async function dbDelete(table){
    return await remove(ref(db, table));
}