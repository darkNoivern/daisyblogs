import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/createblog.css'
import { Input, Textarea, Card, Button } from 'react-daisyui'

const NewCreate = () => {

    const [content, setContent] = useState("");
    const handleChange = (event) => {
        console.log(event);
        setContent(event);
    }
    return (
        <>
            <div className="p-4 rounded">

                <label className="label">
                    <span className="label-text">Blog Image</span>
                </label>
                    <input
                    // onChange={() => {
                    //         setError(false);
                    //     }}
                    type="file" className="mb-4 border-primary custom-file-input w-full" />
                                        
                <label className="label">
                    <span className="label-text">Blog Title</span>
                </label>
                <Input className='mb-4 w-full' />

                <label className="label">
                    <span className="label-text">Blog About</span>
                </label>
                <Input className='mb-4 w-full' />

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
                        value={content}
                    />
                </div>

                <Button
                    className='submit-btn w-full'
                    color="success">
                    Submit
                </Button>
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