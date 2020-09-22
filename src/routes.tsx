import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import CreatePost from './pages/createpost'
import Post from './pages/post'

import './styles.css'

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Homepage} />
            <Route path="/post/:id" component={Post} />
            <Route path="/newpost/" component={CreatePost} />
            
        </BrowserRouter>
    )
}

export default Routes;