import React from 'react'

const HomeCard = (props) => {
    return (
        <>
            <div className="grid home-blog home-blog-grid mb-4">
                <div className='flexy'>
                    <img src={props.blog.blogImage} className="home-blog-image" alt="blog image" />
                </div>
                <div className='p-4'>
                    <div className="home-blog-tags text-primary mb2">GAME NEWS</div>
                    <div className='home-blog-title mb2'>
                        Kids Are Reportedly Scamming Each Other In Roblox's Criminal Underworld
                    </div>
                    <div className='home-blog-about mb2'>
                        Roblox is reportedly teaching kids some rather hard lessons.
                    </div>
                    <div className='home-blog-footer'>
                        <span>
                            BY SEAN MURRAY
                        </span>
                        <span>
                            8 HOURS AGO
                        </span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeCard