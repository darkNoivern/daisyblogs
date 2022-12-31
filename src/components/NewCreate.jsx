import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/createblog.css'
import { Input, Textarea, Card, Navbar, Button, Dropdown, Indicator, Badge, Theme } from 'react-daisyui'
import { db, storage } from '../firebase.config'
import { doc, setDoc, addDoc, collection, serverTimestamp, } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../context/AuthContext'

const NewCreate = () => {

    const { currentUser } = useContext(AuthContext);
    const [blogCategory, setBlogCategory] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [blogAbout, setBlogAbout] = useState("");
    const [blogDescription, setBlogDescription] = useState("");

    const [picError, setPicError] = useState(false);
    const [fillError, setFillError] = useState(false);

    const handleChange = (event) => {
        console.log(event);
        setBlogDescription(event);
    }

    const blogsCollectionRef = collection(db, "blogs");

    const submitBlog = (event) => {

        event.preventDefault();

        if(document.querySelector('#blog-img').value === '' || blogTitle === "" || blogCategory === "" || blogAbout === "" || blogDescription === ""){
            setFillError(true);
            return ;
        }

        const imageAsFile = event.target[0].files[0]
        const file = event.target[0].files[0];

        console.log('start of upload')

        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }

        const storageRef = ref(storage, `/blogs/${imageAsFile.name}`)

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                setPicError(true);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);


                    addDoc(blogsCollectionRef, {
                        blogCategory: blogCategory,
                        blogTitle: blogTitle,
                        blogAbout: blogAbout,
                        blogImage: downloadURL,
                        blogAuthorEmail: currentUser.email,
                        blogAuthorName: currentUser.displayName,
                        blogAuthorPhoto: currentUser.photoURL,
                        blogAuthorUid: currentUser.uid,
                        blogDescription: blogDescription,
                        blogComments: new Array(),
                        createdAt: serverTimestamp(),
                    });

                    document.querySelector('.custom-file-input').value = null;
                    setBlogCategory("");
                    setBlogTitle("");
                    setBlogAbout("");
                    setBlogDescription("");
                });
            }
        );

    }

    return (
        <>
            <div className="p-4">
            {
                    picError && 
                    <div className="services__modal">
                        <div className="services__modal-content login__error__modal-content">
                            <h4 className="services__modal-title">Alakazam <br /> Guidelines</h4>
                            <i
                                onClick={() => {
                                    setPicError(false);
                                    document.querySelector('#blog-img').value = null;
                                }}
                                className="uil uil-times services__modal-close">
                            </i>
                            <div>
                                Couldn't upload profile picture !! Please Retry 🥺.
                            </div>
                        </div>
                    </div>
                }
                {
                    fillError && 
                    <div className="services__modal">
                        <div className="services__modal-content login__error__modal-content">
                            <h4 className="services__modal-title">Alakazam <br /> Guidelines</h4>
                            <i
                                onClick={() => {
                                    setFillError(false);
                                }}
                                className="uil uil-times services__modal-close">
                            </i>
                            <div>
                                Please Fill out all the fields
                            </div>
                        </div>
                    </div>
                }

                <form action="" onSubmit={submitBlog}>
                    <label className="label">
                        <span className="label-text">Blog Category</span>
                    </label>
                    <Dropdown className='mb-4 dropdown-hover bg-secondary rounded'>
                        <div className='p-2 rounded text-black border-none'>
                            {blogCategory === "" ? "Dropdown" : blogCategory} <i class="uil uil-angle-down"></i>
                        </div>
                        <Dropdown.Menu tabIndex={0} id='create-blog-dropdown' className="menu-compact text-base w-52 width13 shadow-box-med">
                            <Dropdown.Item
                                onClick={() => { setBlogCategory("New Technologies"); }}
                            >
                                New Technologies
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => { setBlogCategory("World Problems"); }}
                            >
                                World Problems
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => { setBlogCategory("Interviews"); }}
                            >
                                Interviews
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => { setBlogCategory("Project Collab"); }}
                            >
                                Project Collab
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <label className="label">
                        <span className="label-text">Blog Image</span>
                    </label>
                    <input
                        // onChange={() => {
                        //         setError(false);
                        //     }}
                        required
                        type="file" name='image' accept='image/*' id='blog-img' className="mb-4 border-primary custom-file-input w-full" />

                    <label className="label">
                        <span className="label-text">Blog Title</span>
                    </label>
                    <Input
                    required
                    onChange={(event)=>{setBlogTitle(event.target.value)}} 
                    className='mb-4 w-full' />

                    <label className="label">
                        <span className="label-text">Blog About</span>
                    </label>
                    <Input
                    required
                    onChange={(event)=>{setBlogAbout(event.target.value)}} 
                    className='mb-4 w-full' />

                    <label className="label">
                        <span className="label-text">Blog Description</span>
                    </label>

                    <div data-theme="emerald" className='mb-4'>
                        <ReactQuill
                            className='custom-quill'
                            placeholder='write something'
                            modules={modules}
                            formats={formats}
                            onChange={(event) => { handleChange(event) }}
                            value={blogDescription}
                        />
                    </div>

                    <Button
                        className='submit-btn w-full'
                        color="success">
                        Submit
                    </Button>
                </form>
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

export default NewCreate