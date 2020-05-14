import React, {Component} from 'react';

class HomePage extends Component{

    goToPayPage = () => {
        this.props.push('/payForm')
    }

    handleDrop = (file) => {
        console.log(file)
    }
    

    handleFile = (file) => {
        // As a note for usfull file handling: Look up |new Blob([],{})| and |new FileReader()|
        const formData = new FormData()
        formData.append('newImg', file)
        
        // this.savePicInBackend(formData)
        const reader = new FileReader()
        const $picBox = document.querySelector('.pic-box')
        reader.readAsDataURL(file)
        reader.onload = () => {
            $picBox.style.backgroundImage = `url(${reader.result})`
        }
        
    }

    savePicInBackend = (formData) => {
        fetch('http://localhost:3001/wine',{
            method: 'POST',
            body: formData
        })
        .then((res) => {
            res.json()
            .then((data)=>{
                console.log(data.payload)
                
                const img = new Image()
                img.src = `http://localhost:3001/${data.payload.path}`
                document.body.appendChild(img)
                
            },(err)=>{console.log(err)})
        })
    }
    
    

    render(){
        return(
            <>
                <h2>Home Page</h2>
                <button onClick={this.goToPayPage} >Go to Shopping Page</button>
                <hr/>

                <h3>Test Img Reader</h3>
                
                <input type="file" name="newImg" onChange={(e)=>this.handleFile(e.target.files[0])}/> 
                {/* he also used the atrribute enctype="multipart/form-data"   I didnt because Im not using a form or ejs. hope it still works*/}
                <div className='pic-box' style={style.dragbox} onDrop={(e)=>this.handleFile(e.dataTransfer.files[0])}></div>
            </>
        )
    }
}

const style = {
    dragbox: {
        width: '200px',
        height: '200px',
        border: '1px solid black',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }
}

export default HomePage