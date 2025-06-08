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

    const darkthemes = ["halloween", "dracula", "sunset", "dim"];
    const lightthemes = ["cmyk", "valentine", "lemonade", "pastel"];
    const darkcolors = ["orange", "grey", "lightcoral", "plum"];
    const lightcolors = ["pink", "cyan", "lime", "lightgreen"];

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
                        <div className="grid profile-grid">
                            <div className='flexy p-4'>
                                <div className="avatar online">
                                    <div className="w16 rounded-full">
                                        <img src={user[0].photoURL} />
                                    </div>
                                </div>
                            </div>
                            <div className='profile-table-container'>
                                <table className="table">
                                    <tr>
                                        <td>Username</td>
                                        <td className='flexy text-primary'>{user[0].displayName}</td>
                                    </tr>
                                    {
                                        currentUser.displayName === id
                                            ?
                                            <>
                                                <tr>
                                                    <td>EmailId</td>
                                                    <td className='flexy text-secondary'>{user[0].email}</td>
                                                </tr>
                                            </> : <></>
                                    }
                                </table>
                            </div>
                        </div>

                        
                        {/* 
                        
                        THEME SECTION
                        
                        <div className="mt-10">
                            <div className="ubuntu-400 your-blogs-heading ml-4 flexy">
                                Choose Themes
                            </div>

                            <div className='flexy mt-10'>
                                <table className="table">
                                    <tr>
                                        <td>Dark Theme</td>
                                        {
                                            darkthemes.map((element, index) => {
                                                return <td>
                                                    <button
                                                        onClick={() => {
                                                            document.documentElement.setAttribute('data-theme', `${darkthemes[index]}`)
                                                        }}
                                                        style={{ backgroundColor: `${darkcolors[index]}` }} className='theme-button'></button>
                                                    
                                                </td>
                                            })
                                        }
                                    </tr>

                                    <tr>
                                        <td>Light Theme</td>
                                        {
                                            lightthemes.map((element, index) => {
                                                return <td>
                                                    <button
                                                        onClick={() => {
                                                            document.documentElement.setAttribute('data-theme', `${lightthemes[index]}`)
                                                        }}
                                                        style={{ backgroundColor: `${lightcolors[index]}` }} className='theme-button'></button>
                                                </td>
                                            })
                                        }
                                    </tr>

                                </table>

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