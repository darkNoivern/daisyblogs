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
                <div>

                    {
                        (props.blog.blogCategory === 'New Technologies') ?
                            <Link exact to='/category/new_technologies' className="home-blog-tags text-primary mb2 uppercase">{props.blog.blogCategory}</Link>
                            :
                            (props.blog.blogCategory === 'World Problems') ?
                                <Link exact to='/category/world_problems' className="home-blog-tags text-primary mb2 uppercase">{props.blog.blogCategory}</Link>
                                :
                                (props.blog.blogCategory === 'Interviews') ?
                                    <Link exact to='/category/interviews' className="home-blog-tags text-primary mb2 uppercase">{props.blog.blogCategory}</Link>
                                    :
                                    <Link exact to='/category/project_collab' className="home-blog-tags text-primary mb2 uppercase">{props.blog.blogCategory}</Link>
                    }
                </div>
                    <div className='home-blog-title mb2'>
                    <Link
                        exact to={`/blog/${props.blog.id}`}
                        className='hover:bg-primary hover-primary'
                    >
                        {props.blog.blogTitle}
                    </Link>
                    </div>
                    <div className='home-blog-about mb2'>
                        {props.blog.blogAbout}
                    </div>
                    <div className='home-blog-footer'>
                        <span>

                            By 
                        <Link exact to={`/user/${props.blog.blogAuthorName}`} className='ml-2 bold hover-secondary'>
                            {props.blog.blogAuthorName}
                        </Link>
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