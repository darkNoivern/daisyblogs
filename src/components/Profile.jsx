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

const Profile = () => {

    const { id } = useParams();

    const { currentUser } = useContext(AuthContext);

    const usersCollectionRef = collection(db, "users");
    const blogsCollectionRef = collection(db, "blogs");
    const sortRef = query(blogsCollectionRef, orderBy('createdAt'));

    const [user, setUser] = useState([]);
    const [blogs, setBlogs] = useState([]);

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

                        <div className='flexy p-4'>
                            {/* <img className="mask mask-circle profile-img" src={user[0].photoURL} /> */}
                            <div className="avatar online">
                            <div className="w16 rounded-full">
                                <img src={user[0].photoURL} />
                            </div>
                        </div>

                        </div>
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
                        <div className="mt-10">

                            <div className="card-setter">

                                {
                                    blogs.map((blog, index) => {
                                        return (
                                            <>
                                                <div key={index} className='cards flexy'>
                                                    <div className="card shadow-box-hig custom-card bg-base-100 shadow-xl">
                                                        <figure>
                                                            <img src={blog.blogImage} className="image-fixed-height" alt="blog image" />
                                                        </figure>
                                                        <div className="card-body">
                                                            <h2 className="card-title">
                                                                {blog.blogTitle.slice(0,20)}
                                                                {/* {
                                                                    index === 0 ?
                                                                        <div className="badge badge-secondary">NEW</div>
                                                                        :
                                                                        <></>
                                                                } */}
                                                            </h2>
                                                            <p>{blog.blogAbout.slice(0,50)}</p>
                                                            <div className="card-actions justify-between">
                                                                <Link
                                                                    exact to={`/blog/${blog.id}`}
                                                                    className="badge p-4 badge-primary">Open Blog</Link>
                                                                <div className='text-primary card-moment'>
                                                                    {moment(blog.createdAt.toDate()).calendar()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
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