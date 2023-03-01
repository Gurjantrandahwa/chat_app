import {useCallback, useEffect, useState} from "react";
import {database} from "./firebase";


export function useModalState(defaultValue = false) {
    const [isOpen, setIsOpen] = useState(defaultValue);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return {isOpen, open, close}
}


export const useMediaQuery = query => {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const queryList = window.matchMedia(query);
        const updateMatches = () => setMatches(queryList.matches);

        updateMatches();
        queryList.addEventListener('change', updateMatches);
        return () => queryList.removeEventListener('change', updateMatches);
    }, [query]);

    return matches;
};

export function usePresence(uid) {
    const [presence, setPresence] = useState(null)

    useEffect(() => {
        const useStatusRef = database.ref(`/status/${uid}`)

        useStatusRef.on('value', (snap) => {
            if (snap.exists()) {
                const data = snap.val();

                setPresence(data)
            }
        });
        return () => {
            useStatusRef.off();
        }

    }, [uid])
    return presence
}
