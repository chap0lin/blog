import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import api from '../../services/api'

import './styles.css'
interface imageObjects {
    id: number;
    original_name: string;
    url: string;
    inserted_at: string;
}

function CreatePost(){
    const [showModal, setShowModal] = useState(0)
    const [images, setImages] = useState<imageObjects[]>([])
    const [selectedFile, setSelectedFile] = useState<File>()
    const [update, setUpdate] = useState(false)
    const [codeOrResult, setCodeOrResult] = useState(true) //true code false result
    const [code, setCode] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        thumbnail: '',
        description: '',
        author: '',
        read_time: '',
        content: '',
        categories: 1,
    })

    useEffect(()=>{
        api.get('images').then(response=>{
            setImages(response.data)
            console.log('Effect happening')
        })
    },[update])

    function handleAddImage(){
        setShowModal(showModal?0:1)
    }
    
    function handleChange(files: FileList | null){
        if(files){
            console.log(files[0].name)
            setSelectedFile(files[0])
        }
            

        // setSelectedFile(event.returnValue)
    }

    function handleSubmitFile(e: FormEvent){
        e.preventDefault()
        if(selectedFile){
            const data = new FormData()
            data.append('file', selectedFile)
            api.post('images', data)
            setUpdate(!update)
        }
    }
    function handleChangeCode(event: ChangeEvent<HTMLTextAreaElement>){
        setCode(event.target.value)
        setFormData({...formData, content: event.target.value})
    }
    function showCode(){
        setCodeOrResult(true)
        console.log('Show Code')
    }
    function showResult(){
        setCodeOrResult(false)
        console.log('Show Result')
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target
        setFormData({ ...formData, [name]: value })
    }
    function handleSubmitPost(e: FormEvent){
        e.preventDefault()
        //console.log('oi xd')
        console.log(formData)
        api.post('posts', formData)
            //alert(code)
    }
    return(
        <div className="page-createpost">
            <div className={showModal?"modal-input":"modal-input none"}>
                <div className="tiny-header">
                    <h1>Inserir Imagem</h1>
                    <div onClick={handleAddImage}>
                        <h2>X</h2>
                    </div>
                </div>
                <div className="images-container">
                    {
                        images.map((image)=>(
                            <div key={image.id} className="image-item" onClick={()=>alert(`${image.url}`)}>
                                <img src={image.url} alt={image.original_name} />
                            </div>
                        ))
                    }
                    <div className="image-item selected"></div>
                </div>
                <form onSubmit={handleSubmitFile}>
                <div className="button-container">
                    <label htmlFor="file-upload">Add Image</label>
                    <input id="file-upload" type="file"  name="Add Image"  title="Add Image" onChange={(e) => {
                        handleChange(e.target.files)
                    }}/>
                    <button  name="Enviar"  value="Enviar" type="submit">Enviar</button>
                </div>
                </form>
            </div>
            <div>
                <h2 onClick={handleAddImage}>Add image</h2>
            </div>
            <form onSubmit={handleSubmitPost} className="post-data">
                <input type="text" name="title" className="title" placeholder="title" onChange={handleInputChange} />
                <input type="text" name="thumbnail" className="thumbnail" placeholder="thumbnail url" onChange={handleInputChange} />
                <input type="text" name="description" className="description" placeholder="description here" onChange={handleInputChange} />
                <input type="text" name="author" className="author" placeholder="author" onChange={handleInputChange} />
                <input type="text" name="read_time" className="read_time" placeholder="read time" onChange={handleInputChange} />
                <input type="text" id="password" placeholder="password" />
                <div className="categories">
                    <input type="radio" id="progamacao" name="categories" value="1" onChange={handleInputChange} />
                    <label htmlFor="progamacao">Programação</label>
                    <input type="radio" id="design" name="categories" value="2" onChange={handleInputChange} />
                    <label htmlFor="design">Design</label>
                    <input type="radio" id="musica" name="categories" value="3" onChange={handleInputChange} />
                    <label htmlFor="musica">Música</label>
                    <input type="radio" id="gestao" name="categories" value="4" onChange={handleInputChange} />
                    <label htmlFor="gestao">Gestão</label>
                    <input type="radio" id="fitness" name="categories" value="5" onChange={handleInputChange} />
                    <label htmlFor="fitness">Fitness</label>
                </div>

                <div className="toolbar">
                    <p onClick={showCode}>See Code</p>
                    <p onClick={showResult}>See Result</p>
                </div>
                <textarea id="code" className={codeOrResult?'':'none'} onChange={handleChangeCode}></textarea>
                <div id="result" dangerouslySetInnerHTML={{__html:code}} className={codeOrResult?'none':''}></div>
                
                <button className="create-button" type="submit">Criar Post</button>
            </form>
        </div>
    )
}
export default CreatePost