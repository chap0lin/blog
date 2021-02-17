import React, {useState, useEffect} from 'react'
import PostItem from '../../components/PostItem'
import MainHeader from '../../components/MainHeader'
import {IoIosSearch} from 'react-icons/io'

import api from '../../services/api'
import indicator from '../../assets/activityIndicator.gif'

import './styles.css'

interface postItem{
    id: number;
    title: string;
    thumbnail: string;
    category: string; //possible multiple categories in the future
    description: string;
    inserted_at: string;
}

interface categoryItem{
    id: number;
    title: string;
}

function Homepage(){
    const [categories, setCategories] = useState<categoryItem[]>([])
    const [posts, setPosts] = useState<postItem[]>([])
    const [showIndicator, setShowIndicator] = useState(false)

    useEffect(()=>{
        api.get('categories').then(response=>{
            console.log(response.data)
            setCategories(response.data)
        })
    }, [])

    useEffect(()=>{
        setShowIndicator(true)
        api.get('posts').then(response=>{
            setShowIndicator(false)
            setPosts(response.data)
        })
    }, [])
    
    return(
        <div className="page-homepage">
            <MainHeader />
            <div className="blog-header">
                <h2>Blog</h2>
                <h3>“A musician must make music, an artist must paint, a poet must write, if he is to be ultimately at peace with himself. What a man can be, he must be”</h3>
                <div className="selector-field">
                    <div className="categories">
                        <h5>TODOS</h5>
                        {categories.map(category=>(
                            <h5 key={category.id}>{category.title.toUpperCase()}</h5>
                        ))}
                    </div>
                    <div className="search-field">
                        <input placeholder="Pesquise no blog..."></input>
                        <IoIosSearch className="search-icon" size={20} color="gray" />
                    </div>
                </div>
            </div>
            <div className="posts-container">
                {posts.map(post=>(
                    <PostItem key={post.id} id={post.id} title={post.title} thumbnail={post.thumbnail} category={post.category} description={post.description} inserted_at={post.inserted_at} />
                ))}
                <img className={showIndicator?'indicator showIndicator':'indicator'} src={indicator} alt="Indicador"/>
            </div>
        </div>
    )
}
export default Homepage