import { Banner } from "./banner";
import { getDatabase, ref, push, set } from 'firebase/database';
import { useEffect } from "react";

export default function Homepage(){

    // async function addProduct(){
    //     try{
    //         console.log('addProduct');
    //         const db = getDatabase();
    //         console.log('add product db', db);
    //         const usersRef = ref(db, 'products');
    //         console.log('add product usersRef', usersRef);
    //         const newUserRef = push(usersRef);
    //         console.log('add product newUserRef', newUserRef);
    //         var d = await set(newUserRef, { name: "product 1", test: "1" });
    //         console.log('add product setRef', d);
    //     }catch(e){
    //         console.log('error add product', e);
    //     }
    // }
    // useEffect(()=>{ addProduct(); }, []);

    return <>
        <Banner />
    </>
}