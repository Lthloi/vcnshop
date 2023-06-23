class FileUploadFilter {
    invalidMessage = 'Something went wrong with the file';
    file = null;
    #fileTypes = [
        'image',
    ];
    #mediaTypes = [
        'jpeg',
        'webp',
        'png',
    ];
    #limitFileSize = [100, 1000 * 1000 * 10]; //in byte

    setFile(file) { this.file = file }

    mimetypeIsValid() {
        let mimetype = this.file.type
        let type = {
            fileType: mimetype.split('/')[0],
            mediaType: mimetype.split('/')[1],
        }

        try {
            //check type of file, ex: video or image or...
            if (!this.#fileTypes.includes(type.fileType))
                throw new Error('Wrong type of the file, only images allowed')

            //check subtype of file, ex: jpeg or png or webp or...
            if (!this.#mediaTypes.includes(type.mediaType))
                throw new Error('Wrong type of the media, the file must end with .jpg or .png or .webp')

            return true
        } catch (problem) {
            this.invalidMessage = problem.message
            return false
        }
    }

    sizeIsValid() {
        let { size } = this.file

        try {
            if (size < this.#limitFileSize[0])
                throw new Error('Limit file size, minimum is 100 BYTE')

            if (size > this.#limitFileSize[1])
                throw new Error('Limit file size, up to 10 MB allowed')

            return true
        } catch (problem) {
            this.invalidMessage = problem.message
            return false
        }
    }
}

export default FileUploadFilter