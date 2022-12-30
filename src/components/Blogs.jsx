import React from 'react'
import { useState, useEffect } from 'react';
import '../styles/blogs.css'
import { db } from '../firebase.config';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import moment from 'moment';
import { Link } from 'react-router-dom';

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    const blogsCollectionRef = collection(db, "blogs");
    const sortRef = query(blogsCollectionRef, orderBy('createdAt', 'desc'));

    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setBlogs(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    }, []);

    return (
        <>
            <div className="card-setter">
                {
                    blogs.map((blog) => {
                        return (
                            <>
                                <div className='cards flexy'>
                                    <div className="card shadow-box-hig custom-card bg-base-100 shadow-xl">
                                        <figure>
                                            <img src={blog.blogImage} className="image-fixed-height" alt="blog image" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {blog.blogTitle}
                                                <div className="badge badge-secondary">NEW</div>
                                            </h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
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
        </>
    )
}

export default Blogs