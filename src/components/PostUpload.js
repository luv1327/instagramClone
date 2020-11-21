import React,{useState} from 'react'
import {storage,db} from '../firebase'
import firebase from 'firebase'
import './PostUpload.css'

function PostUpload({username}) {
    const [caption,setCaption] = useState('')
    const [image,setImage] = useState(null)
    const [progress,setProgress] = useState(0)
    const [isSelected,setIsSelected] = useState('Select Here')
    const handleChange = (event)=>{
        // This Means We Are Telling to select first 
        //image selected and not multiple
        if(event.target.files[0]){
            setImage(event.target.files[0])
            setIsSelected('Selected')
        }
    }

    const handleUpload = ()=>{
        // we are first accessing storage of firebase then creating a ref to images folder and then uploading the image with put
        const uploadImage = storage.ref(`images/${image.name}`).put(image)
        // we are listening to event on state changed
        uploadImage.on('state changed',snapshot=>{
            // progress function
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgress(progress)
        },
        error =>{
            console.log(error)
            alert(error.message)
        },
        ()=>{
            // complete function
            // getting the download link of the images
            storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url=>{
                // post inside db previously we were just uploading
                db.collection('posts').add({
                    // adding timestamps so that no matter where the user is it will show their local time
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    caption : caption,
                    imageUrl : url,
                    username : username
                })
                // after the uploading is done then set the progress to 0
                // and set caption and image to null
                setProgress(0)
                setCaption('')
                setImage(null)
                window.location = '/posts'
            })
            .catch(err=>console.log(err.message))
        }
    )
    }
    const instagramLogo = <img className='postUpload__instagramLogo ' src='https://assets.stickpng.com/images/5a4e432a2da5ad73df7efe7a.png' alt='instagramLogo'></img>
    return (
        <div className='postUpload__container'>
            <div className='postUpload__section'>
                {instagramLogo}
                <div className='postUpload__inputSection'>
                    <progress className='postUpload__progressBar postUpload' value={progress} max='100' ></progress>
                    <label className='postUpload__chooseFile'>
                    <input  type="file" onChange={handleChange}></input>
                       {isSelected}
                    </label>
                    <input className='postUpload__caption postUpload' type="text" value={caption}  onChange={event=>setCaption(event.target.value)} placeholder="Caption" name='caption'></input>
                    <button className='postUpload__button postUpload'  disabled={!image} type="submit" onClick={handleUpload}>Upload</button>
                    <a className='postUpload__goBackBtn' href='/posts'>Go Back</a>
                </div>
            </div>
        </div>
    )
}

export default PostUpload
