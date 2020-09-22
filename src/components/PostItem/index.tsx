import React from 'react'
import {Link} from 'react-router-dom'
import './styles.css'
import thumbImage from '../../screenshot.png'

interface PostItemProps{
    id: number;
    title: string;
    thumbnail: string;
    category: string;
    description: string;
    inserted_at: string;
}
const PostItem:React.FC<PostItemProps> = (props) =>{
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const dateInserted = new Date(props.inserted_at)
    const formatedDate = `${dateInserted.getDay()} ${months[dateInserted.getMonth()]} ${dateInserted.getFullYear()}`
    return(
        <div className="post-item-container">
            <div className="image-container" style={{backgroundImage:`url(${props.thumbnail})`}}>
                <Link to={`post/${props.id}`}>
                    <div className="post-image"></div>
                    <img src={props.thumbnail} alt="thumbnail"/>
                </Link>
            </div>
            <div className="post-details">
                <div className="category">
                <h5>{props.category.toUpperCase()}</h5>
                </div>
                <Link to={`post/${props.id}`}><h2>{props.title}</h2></Link>
                <p>{props.description}</p>
                
            </div>
            <div className="post-date">
            <p>{formatedDate}</p>
            </div>
        </div>
    )
}


export default PostItem