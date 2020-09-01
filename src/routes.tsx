import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Homepage from './pages/homepage'


function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Homepage} />
        </BrowserRouter>
    )
}

export default Routes;