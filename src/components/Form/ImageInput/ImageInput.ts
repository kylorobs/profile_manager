
class ImageInput {
    imageurl: string;

    constructor(){
        this.imageurl = '';
    }

    uploadImage(e:Event){
        e.preventDefault();
        console.log(e)
        fetch("http://localhost:4000/upload", {method: 'POST', body: new FormData((e.target as any))})
        .then(res => res.json())
        .then(result => {
          const image = result;
          console.log(image)
        
        })
        .catch(er =>{
          throw new Error(er)
        })
    }
}

export default ImageInput;

    //   e.preventDefault();
    //   console.log(e)
    //   fetch("http://localhost:4000/upload", {method: 'POST', body: new FormData((e.target as any))})
    //   .then(res => res.json())
    //   .then(result => {
    //     const image = result;
    //     console.log(image)
      
    //   })
    //   .catch(er =>{
    //     throw new Error(er)
    //   })
    // }
  
    // return (
    //   <form encType="multipart/form-data"  method="post">
    //       <input 
    //         style={{"margin": "3em"}} 
    //         name="file_upload" 
    //         id="upload" 
    //         type="file"
    //       />
    //       <input type="submit" />
    //   </form> 
    // );
 