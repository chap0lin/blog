import React, { ChangeEvent, useState, FormEvent } from 'react';
import api from './services/api'
function App() {
  const [image, setImage] = useState<File>()
  const [imagesrc, setImagesrc] = useState('')
  function handleUploadImage(event: ChangeEvent<HTMLInputElement>){
    const {files} = event.target
    //const file = files!=null?files[0]:null
    if(files!=null){
      setImage(files[0])
      const fileURL = URL.createObjectURL(files[0])
      setImagesrc(fileURL)
    }
  }
  async function handleSubmit(event: FormEvent){
    event.preventDefault()
    const data = new FormData()
    if(image)
      data.append('image', image)
    await api.post('points', data)
    alert('Enviado!!  ... ?')
  }
  return (
    <>
    <h1>Hello World</h1>
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleUploadImage}/>
      {imagesrc &&
        <img src={imagesrc} alt="uploaded"/>
      }
      <button type="submit">
          Enviar
      </button>
    </form>
    </>
  );
}

export default App;
