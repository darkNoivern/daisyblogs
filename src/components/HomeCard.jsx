import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

const HomeCard = (props) => {
    return (
        <>
            <div className="grid home-blog home-blog-grid mb-4">
                <div className='flexy'>
                    <img src={props.blog.blogImage} className="home-blog-image" alt="blog image" />
                </div>
                <div className='p-4'>
                    <div className="home-blog-tags text-primary mb2 uppercase">{props.blog.blogCategory}</div>
                    {/* <div className='home-blog-title mb2'> */}
                    <Link 
                        exact to={`/blog/${props.blog.id}`}
                    className='home-blog-title mb2 hover:bg-primary'
                        >
                        {props.blog.blogTitle}
                        </Link>
                    {/* </div> */}
                    <div className='home-blog-about mb2'>
                        {props.blog.blogAbout}
                    </div>
                    <div className='home-blog-footer'>
                        <span>
                            By {props.blog.blogAuthorName}
                        </span>
                        <span>
                            {moment(props.blog.createdAt.toDate()).calendar()}
                        </span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeCard