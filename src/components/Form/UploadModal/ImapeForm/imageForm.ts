
import {BindThis} from '../../../../decorators/bindthis';
// import ButtonHandler from '../../../../models/ButtonHandler';

// WHEN BUTTON IS CLICKED, THEY RENDER THE POPUP WITH THE FORM CONTAINING AN INPUT;
// AFTER IMAGE IS UPLOADED, THE IMAGEURL IS UPDATED AND THE MODAL HIDDEN;

class ImageForm {
    public imageurl: string = '';
    public form: HTMLFormElement;
    private spinner: HTMLLoadingSpinnerElement;

    constructor(private fn: (url: string, er?: string) => void){
      this.spinner = document.createElement('loading-spinner') as HTMLLoadingSpinnerElement;
      this.spinner.show = false;
      this.form = this.createForm();
      this.imageurl = '';

    }


    createForm(){
      const form = document.createElement('form') as HTMLFormElement;
      form.enctype = "multipart/form-data";
      form.method = 'post';

  
      const el = document.createElement('input') as HTMLInputElement;
      el.id = 'upload';
      el.name = 'file_upload'
      el.type = 'file';
      
      const submit = document.createElement('input') as HTMLInputElement;
      submit.type = 'submit';
      form.addEventListener('submit', this.uploadImage);

      form.appendChild(el);
      form.appendChild(submit);
      form.appendChild(this.spinner)
 
      return form;
    };


    @BindThis
    uploadImage(e:Event){
        console.log('submitted')
        console.log(e)
        this.spinner.show = true;
        e.preventDefault();
        const formData = new FormData((e.target as any));
        console.log(e.target)
        console.log(formData)
      fetch("http://localhost:4000/upload", { method: 'POST', body: new FormData((e.target as any))})
        .then(res => res.json())
        .then(result => {
          console.log('---- IMAGE FORM ---- New Cloudinary image: ' + result)
          console.log('result!')
          console.log(result)
          if (!result.url){
            this.spinner.show = false;
            this.fn('', 'Failed to upload');
            throw new Error('failed to upload');
          }
          this.spinner.show = false;
          this.imageurl = result.url;
          // const temp = 'https://res.cloudinary.com/kclsu-media/image/fetch/c_fill,f_auto,fl_any_format,w_400/https://www.kclsu.org/asset/Manifesto/9297/WhatsApp-Image-2020-10-05-at-2.44.08-PM.jpeg';
          //this.imageurl = temp;
          this.fn(result.url) ; 
          //this.fn(temp);
        })
        .catch(er => {
          console.log('ERRROR')
          this.spinner.show = false;
          this.fn('', er);
          throw new Error(er);
        })
    }

}

export default ImageForm;

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
 