import React from 'react'
import Blog from './Blog';
import Home from './Home';
import Blogs from './Blogs';
import Login from './Login';
import NewCreate from './NewCreate';
import Error from './Error';
import Createblog from './Createblog';
import Daisynavbar from './Daisynavbar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { current } from 'daisyui/src/colors';
import New from './New'

const Index = () => {
    const { currentUser } = useContext(AuthContext)

    return (
        <>
            <Router>
                <Daisynavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs" element={ <Blogs />} />
                    <Route exact path='/blog/:id' element={ <Blog />} />
                    <Route path="/createblog" element={ <NewCreate />} />
                    <Route path="/login" element={<New />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index