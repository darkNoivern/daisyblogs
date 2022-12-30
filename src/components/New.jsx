import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
} from "firebase/firestore";
import '../styles/login.css'

const New = () => {

    const [signUp, setSignUp] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [email2, setEmail2] = useState("");
    const [password2, setPassword2] = useState("");

    const [illegalUsername, setIllegalUsername] = useState(false);
    const [usernamePresent, setUsernamePresent] = useState(false);
    const [emailPresent, setEmailPresent] = useState(false);
    const [error, setError] = useState(false);

    const [userlist, setUserlist] = useState([]);

    const navigate = useNavigate();

    function isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/i.test(str)
    }

    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
        onSnapshot(usersCollectionRef, (snapshot) => {

            const result = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })
            setUserlist(result);
            // console.log(result)
        });
    }, []);

    const signup = (event) => {

        event.preventDefault();

        if (!isAlphanumeric(username)) {
            setIllegalUsername(true);
            return;
        }

        const checkUsernamePresent = userlist.find((individual) => {
            return (individual.displayName === username);
        })
        if (checkUsernamePresent !== undefined) {  //  USERNAME FOUND
            setUsernamePresent(true);
            return;
        }

        const checkEmailPresent = userlist.find((individual) => {
            return (individual.email === email);
        })
        if (checkEmailPresent !== undefined) {  //  USERNAME FOUND
            setEmailPresent(true);
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in 
                const user = result.user;
                updateProfile(result.user, {
                    displayName: username,
                });

                setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    displayName: username,
                    email,
                    notebooks: [],
                });

                navigate("/");
                // ...
            })
            .catch((error) => {
                setError(true);
                setUsername("");
                setPassword("");
                setEmail("");
                return;
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }

    const signin = (event) => {

        event.preventDefault();
        signInWithEmailAndPassword(auth, email2, password2)
            .then((result) => {
                // Signed in 
                const user = result.user;
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(true);
                setEmail2("");
                setPassword2("");
                return;
            });
    }

    return (
        <>
            <div className="flexy">
                <div className='p-4 card shadow-box-hig signincard'>
                    {
                        signUp ?
                            <>
                                <div className="grid p-4 grid-permanent-2">
                                    <div
                                        onClick={() => { setSignUp(true) }}
                                        className={`flexy p-2 bg-primary login-tab text-black`}>
                                        Sign-Up
                                    </div>
                                    <div
                                        onClick={() => { setSignUp(false) }}
                                        className="flexy login-tab">
                                        Sign-In
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="grid p-4 grid-permanent-2">

                                    <div
                                        onClick={() => { setSignUp(true) }}
                                        className={`flexy login-tab`}>
                                        Sign-Up
                                    </div>
                                    <div
                                        onClick={() => { setSignUp(false) }}
                                        className={`flexy p-2 bg-primary login-tab text-black`}>
                                        Sign-In
                                    </div>

                                </div>
                            </>
                    }
                    <div className="tabsContent p-4 h-full bg-neutral">
                        <div className='flexy h-full'>
                            {
                                signUp ?
                                    <div>
                                        <input type="file" className="mb-2 border-primary custom-file-input w-full" />
                                        <input type="text" placeholder="username" className="mb-2 input input-bordered w-full max-w-xs" />
                                        <input type="email" placeholder="abc@gmail.com" className="mb-2 input input-bordered w-full max-w-xs" />
                                        <input type="password" placeholder="password" className="mb-2 input input-bordered w-full max-w-xs" />
                                        <button className="btn w-full btn-primary">Sign-Up</button>
                                    </div>
                                    :
                                    <div>
                                        <input type="email" placeholder="abc@gmail.com" className="mb-2 input input-bordered w-full max-w-xs" />
                                        <input type="password" placeholder="password" className="mb-2 input input-bordered w-full max-w-xs" />
                                        <button className="btn w-full btn-primary">Sign-In</button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default New