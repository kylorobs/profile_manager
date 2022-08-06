
import { store } from '../../../../app';
import { BindThis } from '../../../../decorators/bindthis';
import FileUploader from '../../../../models/FileUploader';
import { setError } from '../../../../state/ProfileSlice';
import UploadModal from '../../../Modals/UploadModal';

class ImageForm {

  private uploadModal: UploadModal;
  public imageurl: string = '';
  private uploader: FileUploader

  constructor(private fn: (url: string | null) => void) {
    this.uploader = new FileUploader(true, this.uploadImage)
    this.imageurl = '';
    this.uploadModal = new UploadModal();
    this.uploadModal.showForm('<h2> Upload image </h2>', this.uploader.form);
  }


  @BindThis
  uploadImage(e: Event) {
    this.uploadModal.showSpinner();
    fetch("https://kclsu-heroku.herokuapp.com/upload", { method: 'POST', body: new FormData((e.target as any)) })
      .then(res => res.json())
      .then(result => {
        //Check if there is a new URL in the result
        if (result.error) {
          throw new Error(result.message);
        }
        this.uploadModal.exitModal();
        this.imageurl = result.url;
        this.fn(result.url);
      })
      .catch(er => {
        this.fn(null);
        // this.uploadModal.exitModal();
        store.dispatch(setError('Failed to upload file: ' + er))
      })
  }

}

export default ImageForm;

