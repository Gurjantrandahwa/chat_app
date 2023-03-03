import {createContext, useContext, useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import {auth, database} from "../helpers/firebase";


export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let userRef;
        let userStatusRef;

        const authUnsub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                userStatusRef = database.ref(`/status/${authObj.uid}`);
                userRef = database.ref(`/profiles/${authObj.uid}`)
                userRef.on('value', snap => {
                    const {name, createdAt, avatar} = snap.val();
                    const data = {
                        name,
                        avatar,
                        createdAt,
                        uid: authObj.uid,
                        email: authObj.email
                    };

                    setProfile(data)
                    setLoading(false)
                })

                database.ref('.info/connected').on('value', (snapshot) => {

                    if (!!snapshot.val() === false) {
                        return;
                    }

                    userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                        userStatusRef.set(isOnlineForDatabase);
                    });
                });

                // if(messaging){
                // try {
                //     const currentToken = await messaging.getToken();
                //     if (currentToken) {
                //         await database.ref(`/fcm_tokens${currentToken}`).set(authObj.uid)
                //     }
                //
                // } catch (e) {
                //     console.log(e)
                // }


                // }

            } else {
                if (userRef) {
                    userRef.off();
                }
                if (userStatusRef) {
                    userStatusRef.off();
                }
                database.ref('.info/connected').off();
                setProfile(null)
                setLoading(false)
            }
        })
        return () => {
            database.ref('.info/connected').off();

            authUnsub();
            if (userRef) {
                userRef.off();
            }
            if (userStatusRef) {
                userStatusRef.off();
            }
        }
    }, [])

    return <ProfileContext.Provider value={{profile, loading}}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)
