import Blog from './Blog';
import Home from './Home';
import Blogs from './Blogs';
import Error from './Error';
import Footer from './Footer';
import Profile from './Profile';
import DaisyNavbar from './DaisyNavbar';
import CreateBlog from './BlogCreate';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './Category';
import Login from './Login';

const Index = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <>
            <Router>
                <DaisyNavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs" element={ <Blogs />} />
                    <Route exact path='/blog/:id' element={ currentUser ? <Blog /> : <Login />} />
                    <Route exact path='/user/:id' element={currentUser ? <Profile /> : <Login />} />
                    <Route exact path='/category/:id' element={<Category />} />
                    
                    <Route path="/createblog" element={ currentUser ? <CreateBlog /> : <Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='*' element={<Error />} />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}

export default Index