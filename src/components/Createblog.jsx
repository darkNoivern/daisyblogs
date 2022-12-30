import React, { useState, useEffect } from 'react'
import '../styles/createblog.css'
import { Input, Textarea, Card, Button } from 'react-daisyui'
import { Alert } from 'react-daisyui'
import { db, storage } from '../firebase.config'
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

const Createblog = () => {

    const defaultUrl = "https://images.unsplash.com/photo-1557933106-fcc80f11b3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4MDd8MHwxfHNlYXJjaHw0fHx3YWxsYXBlcnxlbnwwfHx8fDE2NjY5MDkwNTQ&ixlib=rb-4.0.3&q=80&w=1080";
    const [url, setUrl] = useState(defaultUrl);
    const [error, setError] = useState(false);
    const [blogTitle, setBlogTitle] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogImage, setBlogImage] = useState(defaultUrl);

    //  MAKING AND ADDING A BLOG
    const blogsCollectionRef = collection(db, "blogs");

    const submitBlog = (imageAsUrl) => {

        addDoc(blogsCollectionRef, {
            blogTitle: blogTitle,
            blogDescription: blogDescription,
            blogImage: imageAsUrl,
            createdAt: serverTimestamp()
        });

        console.log({
            blogTitle: blogTitle,
            blogDescription: blogDescription,
            blogImage: imageAsUrl,
            createdAt: serverTimestamp()
        })

        setBlogTitle("");
        setBlogDescription("");
        setBlogImage(defaultUrl);
        document.querySelector('.file-input').value = null;
    }

    //  UPLOADING A IMAGE 
    const handleFireBaseUpload = (e) => {

        const imageAsFile = e.target[0].files[0]
        const file = e.target[0].files[0];
        e.preventDefault()

        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }

        const storageRef = ref(storage, `/${imageAsFile.name}`)
        // const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
            // (error) => {
            //     // Handle unsuccessful uploads

            //     setError(true)
            //     console.log(error)
            // },
            (error) => {
                setError(true);
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // https://firebase.google.com/docs/storage/web/handle-errors

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    
                    default :
                        //  unknown error
                }
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    submitBlog(downloadURL);
                    console.log('File available at', downloadURL);
                });
            }
        );

        // uploadTask.on(
        //     (error) => {
        //         setError(true);
        //         console.log(error);
        //     },
        //     // () => {
        //     //     getDownloadURL(uploadTask.snapshot.ref).then((imageAsUrl) => {
        //     //         setUrl(imageAsUrl);
        //     //         setError(false);
        //     //         // setForm({ ...form, blogImage: imageAsUrl });
        //     //     })
        //     // }
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then((imageAsUrl) => {
        //             setUrl(imageAsUrl);
        //             setError(false);
        // submitBlog(imageAsUrl);
        //             return ;
        //         })

        //         // await addDoc(blogsCollectionRef, {
        //         //     blogTitle: blogTitle,
        //         //     blogDescription: blogDescription,
        //         //     blogImage: imgUrl,
        //         //     createdAt: serverTimestamp()
        //         // });
        //     }
        // );
    }

    // useEffect(() => {
    //     if (url !== defaultUrl) {
    //         submitBlog();
    //     }
    // }, [url])

    return (
        <>
            {/* <div className="pad-lr">
                <Card className='rem-border'>
                    <Card.Image
                        className='image-fixed-height rounded'
                        src={url}
                        alt="Shoes"
                    />
                </Card>
            </div> */}
            {
                error &&
                <>
                    <div className="pad-lr pt-1-25">
                        <Alert
                            className='rounded p-2'
                            status="error"
                            icon={
                                <iconify-icon icon="charm:block" className="svg-navbar"></iconify-icon>
                            }
                        >
                            couldn't upload image; try different image
                        </Alert>
                    </div>
                </>
            }
            <div className="flex w-full mouse400 component-preview p-4 items-center justify-center gap-2 font-sans">
                <form className="form-control w-full max-w-xs" onSubmit={handleFireBaseUpload}>
                    <label className="label">
                        <span className="label-text">Blog Image</span>
                    </label>
                    {/* <Input
                        onChange={() => {
                            setError(false);
                        }}
                        className='file-input'
                        type={`file`}
                    /> */}
                    <div className="bg-dark">
                    <input 
                    onChange={() => {
                            setError(false);
                        }}
                    type="file" className="mb-2 file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                    </div>
                                
                    <label className="label">
                        <span className="label-text">Blog Title</span>
                    </label>
                    <Input
                        value={blogTitle}
                        onChange={(event) => {
                            setBlogTitle(event.target.value)
                            setError(false);
                        }} />
                    <label className="label" style={{ marginTop: `1rem` }}>
                        <span className="label-text">Write your blog here</span>
                    </label>
                    <Textarea
                        value={blogDescription}
                        onChange={(event) => {
                            setBlogDescription(event.target.value);
                            setError(false);
                        }} />
                    <Button
                        className='submit-btn'
                        color="success">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Createblog