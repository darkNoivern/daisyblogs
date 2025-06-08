import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Error from './Error'
import { db } from '../firebase.config';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import { Link } from 'react-router-dom';
import moment from 'moment';
import BlogCard from './BlogCard';

const Category = () => {

    const { id } = useParams();
    const arr = ['new_technologies', 'world_problems', 'interviews', 'project_collab'];

    const [blogs, setBlogs] = useState([]);

    const blogsCollectionRef = collection(db, "blogs");
    const sortRef = query(blogsCollectionRef, orderBy('createdAt', 'desc'));

    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            const arr = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })
            console.log(arr, id)
            arr.forEach((element, index) => {
                console.log(element.blogCategory)
            })
            const filteredArr = arr.filter((element, index) => {
                if (id === 'new_technologies' && element.blogCategory === 'New Technologies') {
                    return true;
                }
                else if (id === 'world_problems' && element.blogCategory === 'World Problems') {
                    return true;
                }
                else if (id === 'interviews' && element.blogCategory === 'Interviews') {
                    return true;
                }
                else if (id === 'project_collab' && element.blogCategory === 'Project Collab') {
                    return true;
                }
                else {
                    return false;
                }
            })
            console.log(filteredArr)
            setBlogs(filteredArr);
        });
    }, []);


    return (
        <>
            {
                (arr.includes(id)) ?
                    <>
                        <div className="card-setter">
                            {
                                blogs.map((blog, index) => {
                                    return (

                                        <BlogCard index={index} blog={blog} />
                                    )
                                })
                            }
                        </div>
                    </>
                    :
                    <Error />
            }
        </>
    )
}

export default Category