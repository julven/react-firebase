import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, endAt, endBefore, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, startAfter, startAt, updateDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
const auth = getAuth();
const storage = getStorage()

const AUTH = { 
    init: () => {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, user => {

                if (user) resolve(user)
                resolve(false);
            })
        })

    },

    login: (email, password) => {
        return new Promise(resolve => {
            signInWithEmailAndPassword(auth, email, password)
                .then(credentials => {
                    // console.log(credentials)
                    resolve(credentials);
                }).catch(err => {
                    // console.log(err)
                    resolve(false);
                })
        })

    },
    logout: () => {
        return new Promise(resolve => {
            signOut(auth).then(() => {
                resolve(true)
            }).catch(err => {
                // console.log({ logout: err })
                resolve(false)
            })
        })

    },
    verifyEmail: () => {

    },
    resetPass: (email) => {
        return new Promise(resolve => {
            sendPasswordResetEmail(auth, email)
                .then(() => resolve(true))
                .catch(err => {
                    // console.log({ resetPass: err.code })
                    resolve(false)
                })
        })

    },
    changePass: (password) => {
        return new Promise(resolve => {
            updatePassword(auth.currentUser, password).then(resp => {

                resolve(true)
            }).catch(err => {
                // console.log({ changePass: err })
                resolve(false)
            })
        })
    },
    register: (data) => {
        return new Promise(resolve => {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(credentials => {
                    // console.log(credentials.user)
                    resolve(credentials.user)

                }).catch(err => {
                    // console.log(err)
                    resolve(false)
                })
        })
    }
}

const DB = {
    create: async (table, data, id) => {

        return new Promise(resolve => {
            if (id) {
                setDoc(doc(database, table, id), data).then(resp => {
                    // console.log(resp)
                    resolve(resp);
                }).catch(err => {
                    // console.log({ addId: err })
                    resolve(false)
                });
            } else {
                addDoc(collection(database, table), data).then(resp => {
                    // console.log(resp)
                    resolve(resp)
                }).catch(err => {
                    // console.log({ add: err })
                    resolve(false)
                })
            }


        })
        // try {
        //     let docRef = doc(database, table, id );
        //     await setDoc(docRef, data)
        //     console.log(docRef)
        // } catch (err) {
        //     console.log(err)
        // }     
    },
    readOne: async (table, id, raw) => {

        const docRef = doc(database, table, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log(docSnap.data())
            if(raw) return docSnap;
            return docSnap.data();
        }
        else return false;

    },
    readAll: async () => {
        let list = [];
        let getList = await getDocs(collection(database, "person"), orderBy("fname"))
        getList.forEach(e => {
            list = [...list, { id: e.id, ...e.data() }]
        })

        return list;
    },
    readBatch: (table, startRef, raw) => {
        return new Promise(resolve => {
            // console.log(startRef)
            let ref = collection(database, table);
            // let q = startRef ?
            //     query(ref, orderBy("fname"), startAt(startRef), limit(11)) :
            //     query(ref, orderBy("fname"), limit(11))
            let q = null;
            if (startRef) q = query(ref, orderBy("fname"), startAt(startRef), limit(11))
            else q = query(ref, orderBy("fname"), limit(11))
            let list = [];

            let refDoc = null;
            getDocs(q).then(resp => {
                resp.forEach(e => {
                    //    console.log(e)
                    if(raw) list.push(e)
                    else list.push({ id: e.id, ...e.data() })
                    refDoc = e
                })

                if (list.length > 10) list.pop();
                resolve({ list, refDoc })
            })
        })
    },
    readLimit: (table, page) => {
        let list = [];
        let refDoc = null
        return new Promise(resolve => {
            let ref = collection(database, table);
            let q = query(ref, orderBy("fname"), limit(10 * page + 1))

            getDocs(q).then(docs => {
                docs.forEach(e => {
                    list.push({ id: e.id, ...e.data() })
                    refDoc = e;
                })
                // console.log(list.length == 10*page+1 )
                if (list.length % 10 === 1) list.pop()
                // console.log({list, refDoc})
                resolve({ list, refDoc })
            })
        });
    },

    readSpecific: () => {

    },
    
    update: async (id, data, table) => {
        try {
            const updateRef = doc(database, table, id);
            await updateDoc(updateRef, data)
            return true;
        } catch (error) {
            // console.log(error)
            return false
        }

    },
    deletes: async (id, table) => {
        await deleteDoc(doc(database, table, id))
        return;
    },

}

const STORAGE = {
    upload: (image) => {
        let str = Math.random().toString(36).substring(7);
        return new Promise(resolve => {

            const storageRef = ref(storage, "images/" + str + "_" + image.name)
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    // console.log({ upload: error })
                    resolve(false)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => {
                        // console.log({ url })
                        resolve(url)
                    })
                }
            )
        })
    },
    deletes: (url) => {
        return new Promise(resolve => {
            const urlRef = ref(storage, url);
            deleteObject(urlRef).then(() => {
                resolve(true);
            }).catch(err => {
                // console.log({ imageDelete: err })
                resolve(false);
            })
        })
    }
}



export { AUTH, DB, STORAGE }