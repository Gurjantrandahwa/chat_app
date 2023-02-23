import {createContext, useContext, useEffect, useState} from "react";
import {auth, database} from "../helpers/firebase";


const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let userRef;

        const authUnsub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                userRef = database.ref(`/profiles/${authObj.uid}`)

                userRef.on('value', snap => {
                    const {name, createdAt} = snap.val();
                    const data = {
                        name,
                        createdAt,
                        uid: authObj.uid,
                        email: authObj.email
                    };

                    setProfile(data)
                    setLoading(false)
                })
            } else {
                if (userRef) {
                    userRef.off();
                }
                setProfile(null)
                setLoading(false)
            }
        })
        return () => {
            authUnsub();
            if (userRef) {
                userRef.off();
            }
        }
    }, [])

    return <ProfileContext.Provider value={{profile, loading}}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)
