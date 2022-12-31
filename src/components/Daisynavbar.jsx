import React, { useState, useContext } from 'react'
import '../styles/daisynavbar.css'
import { AuthContext } from '../context/AuthContext'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Button, Dropdown, Indicator, Badge, Theme } from 'react-daisyui'
import { auth } from '../firebase.config'
import { signOut } from "firebase/auth";

const Daisynavbar = () => {

    const { currentUser } = useContext(AuthContext);
    const [checkBox, setCheckBox] = useState(true);
    
    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            <div className="pb-20 flex w-full component-preview py-4 px-2 items-center justify-center gap-2 font-sans">
                <Navbar>
                    <Navbar.Start>
                        <Dropdown className='dropdown-hover'>
                            <Button className='shadow-box-med'
                                color="ghost" shape="circle" tabIndex={0}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 svg-navbar"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h7"
                                    />
                                </svg>
                            </Button>
                            <Dropdown.Menu tabIndex={0} id='navbar-pages-dropdown' className="menu-compact w-52 width13 shadow-box-med">
                                <NavLink
                                    exact to="/" className={`rounded-btn mouse400 nav-elements`} activeclassname={`active`}>
                                    <Dropdown.Item>
                                        Homepage
                                    </Dropdown.Item>
                                </NavLink>
                                <NavLink
                                    exact to="/blogs" className={`rounded-btn mouse400 nav-elements`} activeclassname={`active`}>
                                    <Dropdown.Item>
                                        Blogs
                                    </Dropdown.Item>
                                </NavLink>
                                <NavLink
                                    exact to="/createblog" className={`rounded-btn mouse400 nav-elements`} activeclassname={`active`}>
                                    <Dropdown.Item>
                                        CreateBlog
                                    </Dropdown.Item>
                                </NavLink>
                                {
                                    (currentUser === null) ?
                                        <>
                                            <NavLink
                                                exact to="/login" className={`rounded-btn mouse400`} activeclassname={`active`}>
                                                <Dropdown.Item>
                                                    Login
                                                </Dropdown.Item>
                                            </NavLink>

                                            <Dropdown.Item
                                                onClick={() => {
                                                    if (document.documentElement.getAttribute('data-theme') === "halloween") {
                                                        document.documentElement.setAttribute('data-theme', "cmyk")
                                                    }
                                                    else {
                                                        document.documentElement.setAttribute('data-theme', "halloween")
                                                    }
                                                    setCheckBox(!checkBox);
                                                }}
                                            >

                                                <Button color="ghost" shape="circle" className='btn btn-circle btn-sm text-primary'>
                                                    <i className={`uil mode-toggle ${checkBox ? 'uil-sun' : 'uil-moon'}`}></i>
                                                </Button>
                                            </Dropdown.Item>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Start>

                    <Navbar.Center>
                        <Button color="ghost" className="normal-case text-xl mouse600">
                            <Link exact to="/">
                                daisyBlogs
                            </Link>
                        </Button>
                    </Navbar.Center>
                    <Navbar.End className="navbar-end">
                        {
                            currentUser ?
                                <Dropdown className='mouse400' vertical="end">
                                    <Button color="ghost" className="avatar" shape="circle">
                                        <div className="w-10 rounded-full">
                                            {/* <img src="https://api.lorem.space/image/face?hash=33791" /> */}
                                            <img loading='lazy' src={currentUser.photoURL} />
                                        </div>
                                    </Button>
                                    <Dropdown.Menu className="w-52 width13 menu-compact">
                                        <li>
                                            <NavLink exact to={`/user/${currentUser.displayName}`} className="justify-between">
                                                Profile
                                                <span className="badge pb-1 badge-secondary">New</span>
                                            </NavLink>
                                        </li>
                                        {/* <Dropdown.Item>Settings</Dropdown.Item> */}
                                        <Dropdown.Item
                                        onClick={logout}
                                        >Logout</Dropdown.Item>
                                        
                                        <Dropdown.Item
                                                onClick={() => {
                                                    if (document.documentElement.getAttribute('data-theme') === "halloween") {
                                                        document.documentElement.setAttribute('data-theme', "cmyk")
                                                    }
                                                    else {
                                                        document.documentElement.setAttribute('data-theme', "halloween")
                                                    }
                                                    setCheckBox(!checkBox);
                                                }}
                                            >

                                                <Button color="ghost" shape="circle" className='btn btn-circle btn-sm text-primary'>
                                                    <i className={`uil mode-toggle ${checkBox ? 'uil-sun' : 'uil-moon'}`}></i>
                                                </Button>
                                            </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                :
                                <>
                                </>
                        }
                    </Navbar.End>
                </Navbar>
            </div>
        </>
    )
}

export default Daisynavbar