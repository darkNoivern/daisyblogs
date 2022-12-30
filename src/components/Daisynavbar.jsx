import React, { useState } from 'react'
import '../styles/daisynavbar.css'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Button, Dropdown, Indicator, Badge, Theme } from 'react-daisyui'

const Daisynavbar = () => {

    const [checkBox, setCheckBox] = useState(true);

    return (
        <>
            <div className="pb-20 flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
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
                                    exact to="/createblog" className={`rounded-btn mouse400`} activeclassname={`active`}>
                                    <Dropdown.Item>
                                        CreateBlog
                                    </Dropdown.Item>
                                </NavLink>
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

                        <Dropdown className='mouse400' vertical="end">
                            <Button color="ghost" className="avatar" shape="circle">
                                <div className="w-10 rounded-full">
                                    <img src="https://api.lorem.space/image/face?hash=33791" />
                                </div>
                            </Button>
                            <Dropdown.Menu className="w-52 width13 menu-compact">
                                <li>
                                    <NavLink exact to='/profile' className="justify-between">
                                        Profile
                                        <span className="badge pb-1">New</span>
                                    </NavLink>
                                </li>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Logout</Dropdown.Item>
                                <Dropdown.Item>

                                    <div className="flex flex-col">
                                        <div className="form-control w-52">
                                            <label className="cursor-pointer label">
                                                <input
                                                    onChange={() => {
                                                        setCheckBox(!checkBox)
                                                        if (document.documentElement.getAttribute('data-theme') === "halloween") {
                                                            document.documentElement.setAttribute('data-theme', "cmyk")
                                                        }
                                                        else {
                                                            document.documentElement.setAttribute('data-theme', "halloween")
                                                        }
                                                    }}
                                                    id="nav-check"
                                                    type="checkbox" className="toggle toggle-primary" defaultChecked />
                                            </label>
                                        </div>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* <div className="flex flex-col hidden reverse-md-display">
                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <input
                                        onChange={() => {
                                            setCheckBox(!checkBox)
                                            if(document.documentElement.getAttribute('data-theme') === "halloween"){
                                                document.documentElement.setAttribute('data-theme', "cmyk")
                                            }
                                            else{
                                                document.documentElement.setAttribute('data-theme', "halloween")
                                            }
                                        }}
                                        id="nav-check"
                                        type="checkbox" className="toggle toggle-primary" defaultChecked />
                                </label>
                            </div>
                        </div> */}

                        {/* <Button color="ghost" shape="circle" className='hidden reverse-md-display'>
                            <Indicator item={<Badge size="xs" color="primary" />}>
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
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </Indicator>
                        </Button> */}
                    </Navbar.End>
                </Navbar>
            </div>
        </>
    )
}

export default Daisynavbar