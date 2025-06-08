import React from 'react'
import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import '../styles/blogs.css'
import { db } from '../firebase.config';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

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
                    blogs.map((blog, index) => {
                        return (
                            <>
                               <BlogCard index={index} blog={blog} />
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Blogs