import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import MainHeader from '../../components/MainHeader'
import {FaArrowLeft} from 'react-icons/fa'

import api from '../../services/api'

import './styles.css'

interface postData{
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    author: string;
    read_time: string;
    content: string;
    inserted_at: string;
}

interface routeParams{
    id: string;
}

const Post = () =>{
    /**
     * Need to make the sharing container
     */
    /*var postCode = `
<p>The first thing you need to do is to create a list of everything you need to get started</p>

<p>Mine looked something like this:</p>

<ul>
<li>Create kind of a rich text editor</li>
<li>Create a blog post component</li>
<li>Create a blog post page</li>
</ul>

<p>After doing all that the job is to find the motivation to do the job, and that i'm doing well</p>

<h2>Lets Do It!</h2>

<p>I'm just gonna put a image of the blog here</p>
<img src="https://github.com/chap0lin/blog/blob/master/screenshot.png?raw=true" width="96px" height="56px" />`;*/

    const { id } = useParams<routeParams>()
    const [post, setPost] = useState<postData | undefined>(undefined)
    const history = useHistory()
    useEffect(()=>{
        api.get(`post/${id}`).then(response=>{
            setPost(response.data[0])
            console.log(response.data)
        })
    }, [id])


    return(
        <div className="page-post">
            <MainHeader />
            <div className="back-header">
                <FaArrowLeft size={25} color="#555" onClick={()=>history.push('/')} className="back-icon" />
                <h2 onClick={()=>history.push('/')} >Back to homepage</h2>
            </div>
            {post!==undefined &&
            <div className="post-container">
                <div className="title-container">
                <h1>{post.title}</h1>
                </div>
                <div className="sharing-container">

                </div>
                <div className="content-container">
                    <div className="content" dangerouslySetInnerHTML={{__html: post.content}}></div>
                </div>
                <div className="end-container">

                </div>
            </div>
            }
        </div>
    )
}
export default Post