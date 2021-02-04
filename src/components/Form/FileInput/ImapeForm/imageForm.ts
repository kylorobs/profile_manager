
import {BindThis} from '../../../../decorators/bindthis';
import DOMHelper from '../../../DOMHelper/DOMHelper';
import UploadModal from '../../../Modal/UploadModal/UploadModal';


class ImageForm {
    public imageurl: string = '';
    public form: HTMLFormElement;
    private uploadModal: UploadModal;

    constructor(private fn: (url: string | null) => void){
      this.uploadModal = new UploadModal();
      this.form = this.createForm();
      this.uploadModal.showForm(this.form);
      this.imageurl = '';
    }


    createForm(){
      const form = DOMHelper.create<HTMLFormElement>('form');
      form.enctype = "multipart/form-data";
      form.method = 'post';

  
      const el = DOMHelper.create<HTMLInputElement>('input');
      el.id = 'upload';
      el.name = 'file_upload'
      el.type = 'file';
      
      const submit = DOMHelper.create<HTMLInputElement>('input');
      submit.type = 'submit';
      form.addEventListener('submit', this.uploadImage);

      DOMHelper.appendChildren(form, [el, submit])
 
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

 