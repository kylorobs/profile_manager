

import {BindThis} from '../../../decorators/bindthis';
import ButtonHandler from '../../../utils/ButtonConfigurer';
import { KeyMap } from '../../../types/types';
import DOMHelper from '../../../utils/DOMHelper';
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
      this.title = title;
      this.uploadcontainer = DOMHelper.createDivHTML(undefined, undefined, this.title);
      this.thumbnailcontainer = this.createThumbnailContainer();
      this.renderUploadControls();
    }

    createThumbnailContainer(){
      const div = DOMHelper.createDivHTML();
      let className = this.keymap.type === 'document_file'? 
                      'document_thumbnail' :
                      'image_thumbnail';
      div.classList.add(className);
      return div;
    }

    renderUploadControls(){
      //CLEAR CONTAINERS
      this.thumbnailcontainer.innerHTML = DOMHelper.sanitise('');
      this.uploadcontainer.innerHTML = DOMHelper.sanitise('');
      const emitter = 'upload' + this.keymap.inputTitle

      //create button to upload file
      const button = DOMHelper.create<HTMLKclsuButtonElement>('kclsu-button');
      button.emitid = emitter;
      button.text = 'Upload New';
      button.verysmall = true;
      button.purple = true;

      // create span element to hold label
      const span = DOMHelper.create<HTMLSpanElement>('span')
      span.classList.add('fileinputTitle');
      span.innerText= this.keymap.inputTitle;

      //Create container for span label and button
      const div = DOMHelper.createDivHTML();
      div.classList.add('flex-end-center');
      DOMHelper.appendChildren(div, [span, button]);

      //Register click emit in button handler class
      const btnHandler = ButtonHandler.getInstance();
      btnHandler.addEmitter(emitter, this.renderUploader);

      //Append both containers to the main upload container
      DOMHelper.appendChildren(this.uploadcontainer, [this.thumbnailcontainer, div])

      //Render upload controls
      DOMHelper.renderInnerHTML(`#${this.parentId}`, this.uploadcontainer)
      // document.getElementById(this.parentId)!.appendChild(this.uploadcontainer)
      this.setThumbnail();
    }

    @BindThis
    public updateImageUrl(url:string | null){
      let updatedUrl = '';
      if (url === '' || typeof url === 'object'){
        if (this.keymap.thumbnailUrl) updatedUrl = this.keymap.thumbnailUrl;
      }
      else updatedUrl =url;

      this.imageurl = updatedUrl;
      
      this.setThumbnail();   
    }

    @BindThis
    public setThumbnail(): void{
      let url = this.imageurl;
      
      //IF DOCUMENT TYPE, SET THUMBNAIL AS PAPERCLIP
      const regex = /.docx?$|.csv$|.xlsx$|.pptx$|.pdf$/gm
      if (regex.test(url) || url.includes('drive.google.com/drive/folders/')) url = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format/v1611323460/website_uploads/MISC/tickclip_pnpire.png'
      else if (this.keymap.type === 'document_file') url = 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format/v1611323576/website_uploads/MISC/newtick_lo6g5p.png'
      
      //SET THE THUMBNAIL URL
      DOMHelper.renderInnerHTML(this.thumbnailcontainer, `
        <lazy-image image=${url}></lazy-image>
      `, ['lazy-image'], ['image'])

    }

    @BindThis
    renderUploader(){
      new ImageForm(this.updateImageUrl);
    }

}

export default FileInput;


