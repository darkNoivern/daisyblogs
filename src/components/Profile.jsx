import React, { useState, useEffect, useContext } from 'react'
import '../styles/profile.css'
import { Link, useParams } from 'react-router-dom';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import Error from './Error';
import BlogCard from './BlogCard';

const Profile = () => {

    const { id } = useParams();

    const { currentUser } = useContext(AuthContext);

    const usersCollectionRef = collection(db, "users");
    const blogsCollectionRef = collection(db, "blogs");
    const sortRef = query(blogsCollectionRef, orderBy('createdAt'));

    const [user, setUser] = useState([]);
    const [blogs, setBlogs] = useState([]);

    // const [i]

    useEffect(() => {
        onSnapshot(usersCollectionRef, (snapshot) => {
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })
            console.log(users, id)
            setUser(
                users.filter((ui, index) => {
                    return (ui.displayName === id);
                })
            )
        });
    }, [currentUser]);

    const themes = ["halloween", "cmyk", "caramellatte", "bumblebee"];
    const colors = ["orange", "cyan", "brown", "gold"];

    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            const arr =
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            setBlogs(
                arr.filter((ui, index) => {
                    return ui.blogAuthorName === id
                })
            )
        });
    }, [currentUser]);

    return (
        <>
            {
                user.length > 0 ?
                    <>
                        <div className="grid grid-cols-2">
                            <div className='flexy p-4'>
                                <div className="avatar online">
                                    <div className="w16 rounded-full">
                                        <img src={user[0].photoURL} />
                                    </div>
                                </div>
                            </div>
                            <div>

                                <div className="flexy text-primary bold">
                                    {user[0].displayName}
                                </div>
                                {
                                    currentUser.displayName === id
                                        ?
                                        <>
                                            <div className="flexy text-secondary bold">
                                                {user[0].email}
                                            </div>
                                        </> : <></>
                                }
                            </div>
                        </div>
                        {/* <div className="mt-10 flexy">
                            <div className="ubuntu-400 your-blogs-heading ml-4">
                                Choose Themes
                            </div>
                            <div className="flexy">
                                {
                                    themes.map((element, index) => {
                                        return <button 
                                        onClick={() => {
                                            document.documentElement.setAttribute('data-theme', `${themes[index]}`)
                                        }}
                                        style={{backgroundColor: `${colors[index]}`}} className='theme-button'></button>
                                    })
                                }

                            </div>
                        </div> */}
                        <div className='mt-10'>
                            <div className="flexy ubuntu-400 your-blogs-heading">
                                Your Blogs
                            </div>
                            <div className="card-setter">
                                {
                                    blogs.map((blog, index) => {
                                        return (
                                            <BlogCard index={index} blog={blog} />
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Error />
                    </>
            }
        </>
    )
}

export default Profile