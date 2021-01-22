
import {BindThis} from '../../../../decorators/bindthis';
import UploadModal from '../../../Modal/UploadModal/UploadModal';


class ImageForm {
    public imageurl: string = '';
    public form: HTMLFormElement;
    private uploadModal: UploadModal;

    constructor(private fn: (url: string | null) => void){
      this.uploadModal = new UploadModal();
      this.form = this.createForm();
      console.log(this.form)
      this.uploadModal.showForm(this.form);
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
 
      return form;
    };


    @BindThis
    uploadImage(e:Event){
        this.uploadModal.showSpinner();
        e.preventDefault();
      fetch("http://localhost:4000/upload", { method: 'POST', body: new FormData((e.target as any))})
        .then(res => res.json())
        .then(result => {
          console.log('IMAHGE UPLOAD RESULT');
          console.log(result)
          if (!result.url){
            this.uploadModal.showError(result.message? result.message : 'Failed to upload')
            this.fn(null);
            throw new Error('failed to upload');
          }
          this.uploadModal.exitModal();
          this.imageurl = result.url;
          this.fn(result.url) ; 
        })
        .catch(er => {
          console.log('ERROR : Catch Statement in File Upload' + ' ' + er)
          // this.uploadModal.showError(er.message? er.message : 'Failed to upload')
          this.fn(null);
          throw new Error(er);
        })
    }

}

export default ImageForm;

 