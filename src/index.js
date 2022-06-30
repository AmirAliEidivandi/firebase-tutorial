import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, where, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDbi9uLgHxLe_HbxRSd0LvKyNwdUcOTkI",
    authDomain: "fir-project-ffd62.firebaseapp.com",
    projectId: "fir-project-ffd62",
    storageBucket: "fir-project-ffd62.appspot.com",
    messagingSenderId: "316862342151",
    appId: "1:316862342151:web:ba6cf089d021baa3c636a2",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "books");

// queries
const q = query(colRef, where("author", "==", "afdnsk"));

onSnapshot(q, colRef, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
});

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    }).then(() => {
        addBookForm.reset();
    });
});

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", deleteBookForm.id.value);

    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    });
});
