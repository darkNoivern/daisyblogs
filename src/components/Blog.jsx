import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from "../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import { Card } from 'react-daisyui';
import '../styles/blog.css'

const Blog = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const blogsCollectionRef = collection(db, "blogs");

    useEffect(() => {
        onSnapshot(blogsCollectionRef, (snapshot) => {
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

    useEffect(() => {
        if (blogs !== []) {
            const obj = blogs.filter((blog, index) => {
                return (blog.id === id.toString());
            });
            setBlog(obj);
            console.log(obj[0])
        }
    }, [blogs])

    return (
        <>
            {
                blog.length > 0 ?
                    <div className="pad-lrb grid grid21">
                        {/* <div className="mockup-window window-min-height border bg-base-300"> */}
                        <div>

                            <Card className='rem-border'>
                                <Card.Image
                                    className='image-fixed-height w-full p-2 rounded-image'
                                    src={blog[0].blogImage}
                                    alt="Shoes"
                                    loading='lazy'
                                />
                            </Card>
                            <div className='p-4 flexy'>
                                {blog[0].blogTitle}
                            </div>
                            <div className='p-4 smeargle'
                                dangerouslySetInnerHTML={{ __html: blog[0].blogDescription }}
                            />
                            {/* {blog[0].blogDescription} */}
                        </div>
                        {/* </div> */}
                    </div>
                    :
                    <>
                        hi
                    </>
            }

        </>
    )
}

export default Blog