import React, { useState, useEffect, useContext } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom'
import { db } from "../firebase.config";
import {
    doc, deleteDoc, collection, onSnapshot, updateDoc, arrayUnion,
    query,
    orderBy,
} from 'firebase/firestore';
import { Card } from 'react-daisyui';
import '../styles/blog.css'
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import Error from './Error';
import { Link } from 'react-router-dom';

const Blog = () => {

    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [blog, setBlog] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const blogsCollectionRef = collection(db, "blogs");
    const sortRef = query(blogsCollectionRef, orderBy('createdAt', 'desc'));


    const [comment, setComment] = useState("");
    const handleChange = (event) => {
        console.log(event);
        setComment(event);
    }

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
    }, [currentUser]);

    const postComment = () => {
        const thisDocRef = doc(db, "blogs", id);

        const date = new Date();
        const newObj = {
            commentDescription: comment,
            commentAuthorEmail: currentUser.email,
            commentAuthorName: currentUser.displayName,
            commentAuthorPhoto: currentUser.photoURL,
            commentAuthorUid: currentUser.uid,
            commentTime: date,
        }
        updateDoc(thisDocRef, {
            blogComments: arrayUnion(newObj)
        });
        setComment("");
    }

    const upvote = () => {
        const thisDocRef = doc(db, "blogs", id);

        const vote = blog[0].blogUpvotes.filter(vote => vote.upVoteUid == currentUser.uid);
        const vote2 = blog[0].blogDownvotes.filter(vote => vote.downVoteUid != currentUser.uid);

        if(vote.length > 0){
            //continue;
        }
        else{
            const date = new Date();
            const newObj = {
                upVoteUid: currentUser.uid,
                upVoteEmail: currentUser.email,
                upVoteName: currentUser.displayName,
                upVoteTime: date,
            }
            updateDoc(thisDocRef, {
                blogUpvotes: arrayUnion(newObj),
                blogDownvotes: vote2,
            });
        }
    }

    const downvote = () => {
        const thisDocRef = doc(db, "blogs", id);

        const vote = blog[0].blogUpvotes.filter(vote => vote.upVoteUid != currentUser.uid);
        const vote2 = blog[0].blogDownvotes.filter(vote => vote.downVoteUid == currentUser.uid);

        if(vote2.length > 0){
            //continue;
        }
        else{
            const date = new Date();
            const newObj = {
                downVoteUid: currentUser.uid,
                downVoteEmail: currentUser.email,
                downVoteName: currentUser.displayName,
                downVoteTime: date,
            }
            updateDoc(thisDocRef, {
                blogUpvotes: vote,
                blogDownvotes: arrayUnion(newObj),
            });
        }
    }

    useEffect(() => {
        if (blogs.length > 0) {
            const obj = blogs.filter(blog => blog.id === id.toString());
            setBlog(obj);
        }
    }, [blogs]);

    return (
        <>

            <div className="flexy">     {/* FIXING THE CENTER */}
                {
                    blog.length > 0 ?
                        <>
                            <div className="p-4 blog-page">     {/* FIXING THE WIDTH */}

                                {/* UPPER PART OF A BLOG */}
                                <div className='blog-page-upper'>
                                    <div className='blog-page-title mb-3'>
                                        {blog[0].blogTitle}
                                    </div>
                                    <div className='mb-3'>
                                        {blog[0].blogAbout}
                                    </div>
                                    <div className='mb-3 small-text flex'>

                                        <div className='uppercase mr-3'>
                                            By <Link exact to={`/user/${blog[0].blogAuthorName}`} className='hover-secondary bold'>{blog[0].blogAuthorName}</Link>
                                        </div>
                                        <div className='uppercase'>
                                            Published <span className='bold'>{moment(blog[0].createdAt.toDate()).calendar()}</span>
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <img loading='lazy' src={blog[0].blogImage} className='w-full' alt="" />
                                    </div>
                                </div>

                                {/* GRID SEPARATION */}
                                <div className="grid gap1 blog-grid">
                                    <div>

                                        {/* MAIN BLOG IN WINDOW */}
                                        <div className="mockup-window window-min-height border bg-base-300">
                                            <div className='bg-base-200'>

                                                <div className='p-4 smeargle'
                                                    dangerouslySetInnerHTML={{ __html: blog[0].blogDescription }}
                                                />

                                            </div>
                                        </div>

                                        <div className='upvote-container'>
                                            <button onClick={()=>{
                                                upvote();
                                            }} className="btn-success upvote-button">Like <i class="uil uil-check"></i></button>
                                            <span className='like-content sm-content ubuntu-400'>
                                                {`${blog[0].blogUpvotes.length} Likes`}
                                            </span>

                                            <button onClick={()=>{
                                                downvote();
                                            }} className="btn-error upvote-button">Dislike <i class="uil uil-times"></i></button>
                                            <span className='like-content sm-content ubuntu-400'>
                                                {`${blog[0].blogDownvotes.length} Dislikes`}
                                            </span>

                                            <span className='comment-content sm-content ubuntu-400'>
                                                {`${blog[0].blogComments.length} Comments`}
                                            </span>
                                        </div>

                                        {/* REPLY SECTION */}
                                        <div className="mt-5">
                                            <div className='text-600'>

                                                Leave a Reply
                                            </div>
                                            <hr className='mb-3' />
                                            <div data-theme="emerald" className='mb-4'>
                                                <ReactQuill
                                                    className='custom-quill'
                                                    placeholder='write something'
                                                    modules={modules}
                                                    formats={formats}
                                                    onChange={(event) => { handleChange(event) }}
                                                    value={comment}
                                                />
                                            </div>
                                            <div
                                                onClick={postComment}
                                                className='bg-secondary cursor-pointer rounded p-2 flexy'>
                                                Post comment
                                            </div>
                                        </div>

                                        {/* COMMENTS */}
                                        <div className='mt-5'>
                                            <div className="text-600">
                                                {blog[0].blogComments.length} Comments
                                            </div>
                                            <hr className="mb-3" />

                                            <div>
                                                {
                                                    blog[0].blogComments.map((comment, index) => {
                                                        return (
                                                            <div className="chat chat-start">
                                                                <div className="chat-image avatar">
                                                                    <div className="w-10 rounded-full">
                                                                        <img src={comment.commentAuthorPhoto} />
                                                                    </div>
                                                                </div>

                                                                <div className="chat-header mb-1 w-full flex px-2 justify-between">
                                                                    <span>
                                                                        <Link className='hover-secondary bold' exact to={`/user/${comment.commentAuthorName}`}>

                                                                            {comment.commentAuthorName}
                                                                        </Link>
                                                                    </span>
                                                                    <time className="text-xs opacity-50">
                                                                        {moment(comment.commentTime.toDate()).calendar()}
                                                                    </time>
                                                                </div>

                                                                <div className="comment-smeargle chat-bubble text-black bg-primary w-max-full w-full"
                                                                    dangerouslySetInnerHTML={{ __html: comment.commentDescription }}
                                                                />

                                                            </div>

                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>


                                    </div>

                                    <div className='blog-right-custom-grid grid height-fit-content'>
                                        <div className='bg-base-200 p-4 rounded'>
                                            <div className="text-600">
                                                Recent Posts
                                            </div>
                                            <hr />
                                            <div>
                                                {
                                                    blogs.slice(0, 5).map((element, index) => {
                                                        return (
                                                            <>
                                                                <div className="grid recent-blogs-grid bg-base-300 p-2">
                                                                    <div className='image-cropper'>
                                                                        {/* <img className="mask mask-circle" src={element.blogImage} /> */}
                                                                        <img src={element.blogImage} className='my-picture' alt="" />
                                                                    </div>
                                                                    <div className='ml-2'>
                                                                        <div className='small-text bold'>
                                                                            <Link className='hover-secondary bold' exact to={`/user/${element.blogAuthorName}`}>
                                                                                {element.blogAuthorName}
                                                                            </Link>
                                                                        </div>
                                                                        <div className='hover-primary'>
                                                                            {element.blogTitle}
                                                                        </div>
                                                                        <div>
                                                                            <time className='small-text'>
                                                                                {moment(element.createdAt.toDate()).calendar()}
                                                                            </time>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                        <div className='bg-base-200 category-display p-4 rounded'>
                                            <div className="text-600">
                                                Categories
                                            </div>
                                            <hr />
                                            <div className='hover-primary px-4 py-2 mt-2 rounded-lg hover:bg-base-300'>
                                                <Link exact to={`/category/new_technologies`}>
                                                    New Technologies
                                                </Link>
                                            </div>
                                            <div className='hover-primary px-4 py-2 mt-2 rounded-lg hover:bg-base-300'>
                                                <Link exact to={`/category/world_problems`}>
                                                    World Problems
                                                </Link>
                                            </div>
                                            <div className='hover-primary px-4 py-2 mt-2 rounded-lg hover:bg-base-300'>
                                                <Link exact to={`/category/interviews`}>
                                                    Interviews
                                                </Link>
                                            </div>
                                            <div className='hover-primary px-4 py-2 mt-2 rounded-lg hover:bg-base-300'>
                                                <Link exact to={`/category/project_collab`}>
                                                    Project Collab
                                                </Link>
                                            </div>
                                        </div>



                                    </div>

                                </div>

                            </div>
                        </>
                        :
                        <>
                            <Error />
                        </>
                }

            </div>
        </>
    )
}


const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] },
            // { 'font': [] }
        ],
        [{ 'size': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
}

const formats = [
    'header',
    // 'font', 
    'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'code-block'
]

export default Blog