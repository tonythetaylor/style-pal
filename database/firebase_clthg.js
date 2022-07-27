import { ref, set, update, onValue, remove } from "firebase/database";
import { db, time } from '../config/firebase';
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore";

const auth = getAuth();
const createData = async (data) => {
  if (!auth) {
    return null
  }

  const userId = auth.currentUser.uid
  const itemType = data.data.type
  const docRef = doc(db, "users", userId);
  const colRef = collection(docRef, itemType)

  const docData = {
    brand: data.data.brand,
    colorway: data.data.colorway,
    id: data.data.id,
    release: '2022',
    style: data.data.style,
    type: data.data.type,
    url: data.data.url,
    createdOn: time
  };

  await addDoc(colRef, docData).then(() => {
    console.log('Data saved successfully')
  }).catch((error) => {
    // The write failed...
    console.log(error);
  });
}

const updateData = async () => {

  // const newKey = push(child(ref(database), 'users')).key;

  update(ref(db, 'users/' + username), {
    username: username,
    email: email
  }).then(() => {
    // Data saved successfully!
    alert('data updated!');
  })
    .catch((error) => {
      // The write failed...
      alert(error);
    });


};

const readData = async () => {
  let data = []
  const userId = auth.currentUser.uid
  console.log('inside read data', userId)



  const querySnapshot = await getDocs(collection(db, "users", userId, "Pants"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    data.push(doc.data())
  });

  const querySnapshotShoes = await getDocs(collection(db, "users", userId, "Shoes"));
  querySnapshotShoes.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    data.push(doc.data())
  });

  const querySnapshotShirts = await getDocs(collection(db, "users", userId, "Shirt"));
  querySnapshotShirts.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    data.push(doc.data())
  });

  // console.log(data)

  return data
  // const itemType = data.data.type
  //   const docRef = doc(db, "users", userId);
  //   // const colRef = collection(db, "users", userId)

  //   // const docRef = doc(db, "cities", "SF");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  //   return docSnap.data()
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  //      try {
  //     const docsSnap = await getDocs(colRef);
  //     if(docsSnap.docs.length > 0) {
  //        docsSnap.forEach(doc => {
  //           console.log(doc.data());
  //           console.log(doc.id);
  //        })
  //     }
  // } catch (error) {
  //     console.log(error);
  // }
  // await getDocs(colRef, docData).then(() => {
  //   console.log('Data saved successfully')
  // }).catch((error) => {
  //   // The write failed...
  //   console.log(error);
  // });

  // const clothesRef = ref(db, `users/${userId}`);
  // let clothes = onValue(clothesRef, (snapshot) => {
  //   const data = snapshot.val();
  //   // setEmail(data.email);
  //   return data

  // });


}

const deleteData = () => {

  remove(ref(db, 'users/' + username));
  alert('removed');
}

export { createData, readData, updateData, deleteData }