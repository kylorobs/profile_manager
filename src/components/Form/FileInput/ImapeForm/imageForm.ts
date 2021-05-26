
import { store } from '../../../../app';
import { BindThis } from '../../../../decorators/bindthis';
import { setError } from '../../../../state/ProfileSlice';
import DOMHelper from '../../../../utils/DOMHelper';
import UploadModal from '../../../Modals/UploadModal';

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
      fetch("https://kclsu-heroku.herokuapp.com/upload", { method: 'POST', body: new FormData((e.target as any))})
        .then(res => res.json())
        .then(result => {
          //Check if there is a new URL in the result
          if (result.error){
            throw new Error(result.message);
          }
          this.uploadModal.exitModal();
          this.imageurl = result.url;
          this.fn(result.url) ; 
        })
        .catch(er => {
          this.fn(null);
          // this.uploadModal.exitModal();
          store.dispatch(setError('Failed to upload file: ' + er))
        })
    }

}

export default ImageForm;

 