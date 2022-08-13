
import { store } from '../../../../app';
import { BindThis } from '../../../../decorators/bindthis';
import FileUploader from '../../../../models/FileUploader';
import { setError } from '../../../../state/ProfileSlice';
import UploadModal from '../../../Modals/UploadModal';
import TextInput from '../../TextInput/TextInput';
import { KeyMap } from '../../../../types/types';
import Validator from '../../../../utils/Validator';
import DOMHelper from '../../../../utils/DOMHelper';


const imageFormKeyMap: KeyMap = {
  keyName: 'urlInput',
  inputTitle: 'Insert Url',
  inputDefaultText: "(Optional) insert url",
  type: 'input',
  validationErrorMsg: 'The image url you supplied is invalid. Make sure it is the full URL from cloudinary or the kclsu website.',
  validationTypes: ['isAKclsuUrl', 'isACloudinaryUrl']
}

class ImageForm {

  private uploadModal: UploadModal;
  public imageurl: string = '';
  private uploader: FileUploader;
  private urlInput: TextInput;

  constructor(private fn: (url: string | null) => void) {
    this.uploader = new FileUploader({ multipart: true, acceptedTypes: '.jpg, .png, .webp' }, this.uploadImage)
    // this.imageurl = '';
    this.uploadModal = new UploadModal();
    this.urlInput = new TextInput('', imageFormKeyMap);
    this.urlInput.el.addEventListener('input', (_) => {
      if (this.urlInput.el.value !== '') {
        this.uploader.enableButton();
        this.uploader.clearUploadedFile();
      }
    })
    this.addUrlInputToForm(this.uploader.form, this.urlInput)
    this.uploadModal.showForm('<h2> Upload an image </h2>', this.uploader.form);
  }

  addUrlInputToForm(form: HTMLFormElement, input: TextInput) {
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    input.el.classList.add('urlInsert');
    const submitBtn = form.querySelector('input[type=submit]');
    const div = DOMHelper.createDivHTML(`<p>-------------     OR     --------------</p><p>Insert a cloudinary or kclsu url here instead of uploading a file..</p>`, input.el);
    submitBtn!.insertAdjacentElement('beforebegin', div);
  }

  @BindThis
  uploadImage(e: Event) {
    this.uploadModal.showSpinner();

    const inputString = this.urlInput.el.value;

    // IF URL INPUT HAS A VALUE
    if (inputString && inputString !== '') {
      // validate
      const validation = new Validator(inputString, imageFormKeyMap);
      if (!validation.isValid) return store.dispatch(setError(validation.errorMessages.join('')));
      this.uploadModal.exitModal();
      // this.imageurl = inputString;
      this.fn(inputString);
      return;
    }

    fetch("https://kclsu-heroku.herokuapp.com/upload", { method: 'POST', body: new FormData((e.target as any)) })
      .then(res => res.json())
      .then(result => {
        //Check if there is a new URL in the result
        if (result.error) {
          throw new Error(result.message);
        }
        this.uploadModal.exitModal();
        // this.imageurl = result.url;
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

