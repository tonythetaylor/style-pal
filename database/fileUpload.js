import { useState } from 'react';
import { getDownloadURL, uploadBytesResumable, ref, uploadBytes} from "firebase/storage"
import { storage } from "../config/firebase"

// Write to storage and get url
const writeToStorage = async (uri, filename) => {
    console.log('attemping to upload file to storage')
    // const storage = st.getStorage(app);
    // const fileRef = ref(storage, `/clothes/${file}`);
    // const storageRef = ref(storage, `/files/${file.name}`);
    // console.log('fileREF: ', fileRef)
    // const uploadTask = await uploadBytesResumable(fileRef, file);
    const response = await fetch(uri);
    const file = await response.blob()
    const storageRef = ref(storage, `/clothes/${filename}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    let img = ''
    uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(`${percent} % done`)
        },
        (error) => console.log(error)
      );
      await uploadTask; // 👈 uploadTask is a promise itself, so you can await it
      
      let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                     // 👆 getDownloadURL returns a promise too, so... yay more await
      console.log('PUSHED -> \n', downloadURL);
      return downloadURL

  };

  export { writeToStorage }