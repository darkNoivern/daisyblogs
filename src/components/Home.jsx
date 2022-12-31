import React from 'react'
import { useState, useEffect, useContext } from 'react';
import HomeCard from './HomeCard';
import { db } from '../firebase.config';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../styles/home.css'
import alakazam from '../images/alakazam.png'
import { AuthContext } from '../context/AuthContext';

const Home = () => {

    const { currentUser } = useContext(AuthContext);
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
            console.log(arr)
            setBlogs(arr);
        });
    }, [currentUser]);

    return (
        <>
            <div>

                <div className="grid grid2 mb-10 p-4">
                    <div className="home-text flexy">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, ex!
                    </div>
                    <div className="home-img-container flexy">
                        <img className='home-img' src={alakazam} alt="" />
                    </div>
                </div>

                <div className="grid grid21">
                    <div>
                        <div className='p-4'>
                            {
                                blogs.map((blog) => {
                                    return (
                                        <>
                                            <HomeCard blog={blog} />
                                            <hr />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className="bg-base-200 p-4 about-part-margin rounded">

                            <div className="text-600">
                                About this site
                            </div>
                            <hr />

                            <div>
                                <div className="flexy mt-4">
                                    <img className="mask mask-circle" src="https://placeimg.com/160/160/arch" />
                                </div>
                                <div className="flexy mt-2 text-secondary bold">
                                    daisyBlogs
                                </div>
                            </div>

                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, repellendus?
                            </div>

                            <div className='mt-4 uppercase small-text bold'>
                                Categories
                            </div>
                            <div className="grid grid-permanent-2 mt-2">
                                <div className="text-primary small-text bold uppercase">New Technologies</div>
                                <div className="text-primary small-text bold uppercase">World Problems</div>
                                <div className="text-primary small-text bold uppercase">Interviews</div>
                                <div className="text-primary small-text bold uppercase">Project Collab</div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home