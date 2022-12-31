import React from 'react'
import Blog from './Blog';
import Home from './Home';
import Blogs from './Blogs';
import Login from './Login';
import NewCreate from './NewCreate';
import Error from './Error';
import Createblog from './Createblog';
import Footer from './Footer';
import Profile from './Profile';
import Daisynavbar from './Daisynavbar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { current } from 'daisyui/src/colors';
import Category from './Category';
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
                    <Route exact path='/blog/:id' element={ currentUser ? <Blog /> : <New />} />
                    <Route exact path='/user/:id' element={currentUser ? <Profile /> : <New />} />
                    <Route exact path='/category/:id' element={<Category />} />
                    
                    <Route path="/createblog" element={ currentUser ? <NewCreate /> : <New />} />
                    <Route path="/login" element={<New />} />
                    <Route path='*' element={<Error />} />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}

export default Index