import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

const BlogCard = (props) => {
    var index = props.index;
    var blog = props.blog;
    console.log(blog);
    return (
        <>
            <div key={index} className='cards flexy'>
                <div className="card shadow-box-hig custom-card bg-base-100 shadow-xl">
                    <figure>
                        <img src={blog.blogImage} className="image-fixed-height" alt="blog image" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {(blog.blogTitle.length > 20) ? blog.blogTitle.slice(0, 20) + "..." : blog.blogTitle}
                        </h2>
                        <p>{blog.blogAbout.length > 30 ? (blog.blogAbout.slice(0, 25) + "...") : blog.blogAbout}</p>
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
}

export default BlogCard