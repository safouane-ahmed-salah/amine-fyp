import { getAuth, onAuthStateChanged } from "firebase/auth";
import { dbGet } from "./db";
import firebaseApp from './firebase';

export default function isLoggedIn(admin = false) {
    return new Promise((resolve, reject) =>
        onAuthStateChanged(getAuth(firebaseApp),
            async user => {
                var res = user ? true : false;
                if (admin && user) {
                    var userData = await dbGet('admin');
                    var findAdmin = Object.values(userData).find(u => u.email == user.email);
                    res = findAdmin ? true : false;
                }
                resolve(res)
            },
        )
    );
}

export async function isAdmin() {
    const { currentUser } = getAuth();
    if (!currentUser) return false;
    var userData = await dbGet('admin');
    var findAdmin = Object.values(userData).find(u => u.email == currentUser.email);
    return !!findAdmin;
}