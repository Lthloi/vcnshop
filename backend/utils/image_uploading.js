import cloudinary from 'cloudinary'

const get_data_uri = (mimetype, data) => `data:${mimetype};base64,${data.toString('base64')}`

const uploadImages = async (images_to_upload, destination_of_uploading) => {
    try {
        //delete the old images before upload
        await cloudinary.v2.api.delete_resources_by_prefix(destination_of_uploading)
    } catch (error) {
        throw error
    }

    if (!images_to_upload || images_to_upload.images.length === 0) return [[], error_of_uploading]

    //check if files is iterable
    if (typeof images_to_upload.images[Symbol.iterator] !== 'function')
        images_to_upload.images = [images_to_upload.images]

    let image_urls = []

    try {
        await new Promise((resolve, reject) => {
            let data_uri
            for (let { data, mimetype } of images_to_upload.images) {
                data_uri = get_data_uri(mimetype, data)
                cloudinary.v2.uploader.upload(
                    data_uri,
                    {
                        use_filename: true,
                        unique_filename: true,
                        folder: destination_of_uploading,
                    },
                ).then((response) => {
                    image_urls.push(response.secure_url)
                    if (image_urls.length === images_to_upload.images.length)
                        resolve()
                }).catch((error) => {
                    reject(error)
                })
            }
        })
    } catch (error) {
        throw error
    }

    return image_urls
}

const uploadOneImage = async (image_to_upload, destination_of_uploading) => {
    let data_uri = get_data_uri(image_to_upload.mimetype, image_to_upload.data)
    let avatar_public_id = 'avatar.' + image_to_upload.mimetype.split('/')[0]

    let response

    try {
        //delete the old avatar before upload
        await cloudinary.v2.api.delete_resources_by_prefix(destination_of_uploading)

        response = await cloudinary.v2.uploader.upload(
            data_uri,
            {
                public_id: avatar_public_id,
                folder: destination_of_uploading,
            }
        )
    } catch (error) {
        throw error
    }

    return response.secure_url
}

export {
    uploadImages, uploadOneImage,
} 