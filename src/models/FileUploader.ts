
import { BindThis } from '../decorators/bindthis';
import DOMHelper from '../utils/DOMHelper';

export type FileOptions = {
    multipart?: boolean,
    acceptedTypes?: string
}

class FileUploader {
    public form: HTMLFormElement;
    private submitCallback: (e: Event) => void;

    constructor(options: FileOptions, fn: (e: Event) => void, private fileInput?: HTMLInputElement) {
        this.form = this.createForm(options);
        this.submitCallback = fn;
    }

    createForm(options: FileOptions) {
        const form = DOMHelper.create<HTMLFormElement>('form');
        form.style.display = 'flex';
        if (options.multipart) form.enctype = "multipart/form-data";
        form.method = 'post';

        const el = DOMHelper.create<HTMLInputElement>('input');
        el.id = 'upload';
        el.name = 'file_upload'
        el.type = 'file';
        el.style.margin = '1rem';
        if (options.acceptedTypes) el.accept = options.acceptedTypes;
        this.fileInput = el;

        el.addEventListener('change', this.enableButton);

        const submit = DOMHelper.create<HTMLInputElement>('input');
        submit.type = 'submit';
        submit.value = "Upload File";
        submit.disabled = true;
        submit.style.margin = '1rem';
        form.addEventListener('submit', this.uploadImage);


        DOMHelper.appendChildren(form, [el, submit])

        return form;
    };

    public clearUploadedFile() {
        this.fileInput!.value = '';
    }

    @BindThis
    enableButton() {
        const input = this.form.querySelector('input[type=submit]')! as HTMLInputElement;
        input.disabled = false;
    }


    @BindThis
    uploadImage(e: Event) {
        e.preventDefault();
        this.submitCallback(e)
    }

}

export default FileUploader;

