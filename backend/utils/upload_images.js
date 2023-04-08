import cloudinary from 'cloudinary'

const get_data_uri = (mimetype, data) => `data:${mimetype};base64,${data.toString('base64')}`

const uploadReviewImages = async (files_in_request, product_id, email) => {
    let destination_of_uploading = 'products/' + product_id + '/reviews/' + email

    try {
        await cloudinary.v2.api.delete_resources_by_prefix(destination_of_uploading)
    } catch (error) {
        throw error
    }

    if (!files_in_request || files_in_request.images.length === 0) return [[], error_of_uploading]

    //check if files is iterable
    if (typeof files_in_request.images[Symbol.iterator] !== 'function')
        files_in_request.images = [files_in_request.images]

    let image_urls = []

    try {
        await new Promise((resolve, reject) => {
            let data_uri
            for (let { data, mimetype } of files_in_request.images) {
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
                    if (image_urls.length === files_in_request.images.length)
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

const uploadUserAvatar = async (avatar_image, email) => {
    let destination_of_uploading = 'users/' + email + '/profile'
    let data_uri = get_data_uri(avatar_image.mimetype, avatar_image.data)
    let avatar_public_id = 'avatar.' + avatar_image.mimetype.split('/')[0]

    let response

    try {
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
    uploadReviewImages, uploadUserAvatar,
} 