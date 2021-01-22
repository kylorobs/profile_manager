

import {BindThis} from '../../../decorators/bindthis';
import ButtonHandler from '../../../models/ButtonHandler';
import { KeyMap } from '../../../models/InputKeys';
import ImageForm from './ImapeForm/imageForm';


//IMAGEINPUTS CONSIST OF A THUMBNAIL, AN UPLOAD BUTTON, A DELETE BUTTON;
// WHEN BUTTON IS CLICKED, THEY RENDER THE POPUP WITH THE FORM CONTAINING AN INPUT;
// AFTER IMAGE IS UPLOADED, THE IMAGEURL IS UPDATED AND THE MODAL HIDDEN;

class FileInput {
    
    public imageurl: string;
    private uploadcontainer: HTMLDivElement;
    private thumbnailcontainer: HTMLDivElement;
    
    constructor(public parentId: string, protected valid: boolean = false, public keymap: KeyMap, public title: string){
      this.imageurl = keymap.thumbnailUrl ? keymap.thumbnailUrl : '';
      const div = document.createElement('div');
      this.title = title;
      div.id = this.title;
      this.uploadcontainer = div;
      this.thumbnailcontainer = this.createThumbnailContainer();
      this.renderUploadControls();
    }

    createThumbnailContainer(){
      const div = document.createElement('div');
      let className = this.keymap.type === 'document_file'? 
                      'document_thumbnail' :
                      'image_thumbnail';
      div.classList.add(className);
      return div;
    }

    renderUploadControls(){
      //CLEAR CONTAINERS
      this.thumbnailcontainer.innerHTML = '';
      this.uploadcontainer.innerHTML = '';
      const emitter = 'upload' + this.keymap.inputTitle

      const button = document.createElement('kclsu-button') as HTMLKclsuButtonElement;
      button.emitid = emitter;
      button.text = 'Upload New';
      button.verysmall = true;
      button.purple = true;

      const label = document.createElement('span');
      label.classList.add('fileinputTitle');
      label.innerText= this.keymap.inputTitle;

      const flex = document.createElement('div');
      flex.classList.add('flex-end-center');
      flex.appendChild(label);
      flex.appendChild(button);

      //REGISTER CLICK EMIT IN BUTTON HANDLER CLASS
      const btnHandler = ButtonHandler.getInstance();
      btnHandler.addEmitter(emitter, this.renderUploader);

      this.uploadcontainer.appendChild(this.thumbnailcontainer);
      this.uploadcontainer.appendChild(flex);

      //RENDER UPLOAD CONTROLS
      document.getElementById(this.parentId)?.appendChild(this.uploadcontainer);
      this.setThumbnail();
    }

    @BindThis
    public updateImageUrl(url:string | null){
      this.imageurl = url ?? this.imageurl;
      this.setThumbnail();   
    }

    @BindThis
    public setThumbnail(): void{
      let url = this.imageurl;
      //IF DOCUMENT TYPE, SET THUMBNAIL AS PAPERCLIP
      const regex = /.docx?$|.csv$|.xlsx$|.pptx$/gm
      if (regex.test(url)) url = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format/v1611323460/website_uploads/MISC/tickclip_pnpire.png'
      else if (this.keymap.type === 'document_file') url = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format/v1611323576/website_uploads/MISC/newtick_lo6g5p.png'
      //SET THE THUMBNAIL URL
      this.thumbnailcontainer.innerHTML = `
        <lazy-image image=${url}></lazy-image>
      `
    }

    @BindThis
    renderUploader(){
      console.log(this)
      new ImageForm(this.updateImageUrl);
    }

}

export default FileInput;


 