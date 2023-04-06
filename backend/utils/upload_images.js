import cloudinary from 'cloudinary'

const uploadImages = async (files_in_request, product_id, username) => {
    let error_of_uploading = null
    let destination_of_uploading = 'products/' + product_id + '/reviews/' + username
    
    try {
        await cloudinary.v2.api.delete_resources_by_prefix(destination_of_uploading)
    } catch (error) {
        error_of_uploading = error
    }

    if (!files_in_request || files_in_request.images.length === 0) return [[], error_of_uploading]

    //check if files is iterable
    if (typeof files_in_request.images[Symbol.iterator] !== 'function')
        files_in_request.images = [files_in_request.images]

    let image_urls = []

    try {
        await new Promise((resolve, reject) => {
            for (let { data, mimetype } of files_in_request.images) {
                cloudinary.v2.uploader.upload(
                    `data:${mimetype};base64,${data.toString('base64')}`,
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
        error_of_uploading = error
    }

    return [image_urls, error_of_uploading]
}

export default uploadImages