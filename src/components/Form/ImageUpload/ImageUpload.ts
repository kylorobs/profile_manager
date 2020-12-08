

import {BindThis} from '../../../decorators/bindthis';
import ButtonHandler from '../../../models/ButtonHandler';
import { KeyMap } from '../../../models/InputKeys';
import ImageForm from './ImapeForm/imageForm';
import Modal from '../../Modal/modal';


//IMAGEINPUTS CONSIST OF A THUMBNAIL, AN UPLOAD BUTTON, A DELETE BUTTON;
// WHEN BUTTON IS CLICKED, THEY RENDER THE POPUP WITH THE FORM CONTAINING AN INPUT;
// AFTER IMAGE IS UPLOADED, THE IMAGEURL IS UPDATED AND THE MODAL HIDDEN;

class ImageUpload {
    
    public imageurl: string;
    private uploadcontainer: HTMLDivElement;
    private modal: Modal;
    private thumbnailcontainer: HTMLDivElement;
    

    constructor(public parentId: string, protected valid: boolean = false, public keymap: KeyMap, public title: string){
      this.imageurl = '';
      this.modal = Modal.getInstance();
      const div = document.createElement('div');
      this.title = title;
      div.id = this.title;
      this.uploadcontainer = div;
      this.thumbnailcontainer = document.createElement('div');
      this.thumbnailcontainer.id = 'thumbnail';
      this.renderUploadControls();
    }

    renderUploadControls(){
      //CLEAR CONTAINERS
      this.thumbnailcontainer.innerHTML = '';
      this.uploadcontainer.innerHTML = '';

      // const thumbnail = this.createThumbnail('https://res.cloudinary.com/kclsu-media/image/upload/v1605106869/website_uploads/MISC/EM_u4q3mg.png')

      const button = document.createElement('kclsu-button') as HTMLKclsuButtonElement;
      button.emitid = 'uploadImage';
      button.text = 'Upload New';
      button.verysmall = true;
      button.purple = true;

      //REGISTER CLICK EMIT IN BUTTON HANDLER CLASS
      const btnHandler = ButtonHandler.getInstance();
      btnHandler.addEmitter('uploadImage', this.renderUploader);

      this.uploadcontainer.appendChild(this.thumbnailcontainer);
      this.uploadcontainer.appendChild(button);

      //RENDER UPLOAD CONTROLS
      document.getElementById(this.parentId)?.appendChild(this.uploadcontainer);
      this.setThumbnail('https://res.cloudinary.com/kclsu-media/image/upload/v1605106869/website_uploads/MISC/EM_u4q3mg.png')
    }

    @BindThis
    public updateImageUrl(url: string, er?: string){
      console.log('--- IMAGE UPLOAD --- image url property updated')
      if (!er){
        this.setThumbnail(url);
        this.imageurl = url;
        this.modal.exitModal();
      }
      else {
        const div = document.createElement('div');
        div.innerHTML = er;
        this.modal.showModal(div);
      }
      
    }

    public setThumbnail(url: string): void{
      console.log('setting new image')
      this.thumbnailcontainer.innerHTML = `
        <lazy-image image=${url}></lazy-image>
      `
    }

    @BindThis
    renderUploader(){
      console.log('--- IMAGE UPLOAD --- Show Uploader');
      const imageForm = new ImageForm(this.updateImageUrl);
      const div = document.createElement('div');
      div.appendChild(imageForm.form)
      this.modal.showModal(div);
    }

}

export default ImageUpload;

// <div id="profileimage">
// <lazy-image image="https://res.cloudinary.com/kclsu-media/image/upload/v1605106869/website_uploads/MISC/EM_u4q3mg.png"></lazy-image>
// </div>
// <label>Profile Image</label>
// <input id="imageupload" type="file" />

 