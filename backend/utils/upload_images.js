import cloudinary from 'cloudinary'
import busboy from 'busboy'

const uploadImage = (data, mimetyppe, destination_of_uploading) => {
    return new Promise((resolve) => {
        resolve(cloudinary.v2.uploader.upload(
            `data:${mimetyppe};base64,${data.toString('base64')}`,
            {
                use_filename: true,
                unique_filename: true,
                folder: destination_of_uploading,
            },
        ))
    })
}

const uploadImages = async (request, product_id, username) => {
    let busboy_instance = busboy({ headers: request.headers })

    let image_urls = []
    let data_of_images_to_upload = []
    let request_body = {}

    let error_of_uploading = null

    let destination_of_uploading = 'products/' + product_id + '/reviews/' + username

    try {
        await cloudinary.v2.api.delete_resources_by_prefix(destination_of_uploading)

        await new Promise((resolve, reject) => {
            busboy_instance.on('file', (name, file, info) => {
                let { mimeType } = info
                console.log('>>> file >>>', file)
                file
                    .on('data', async (data) => {
                        data_of_images_to_upload.push({ data, mimetype: mimeType })
                    })
                    .on('close', () => { })
            })

            busboy_instance.on('field', (field, value, info) => {
                request_body[field] = value
            })

            busboy_instance.on('close', async () => {
                console.log('>>> data_of_images_to_upload >>>', data_of_images_to_upload)
                let image_url = null
                // for (let { data, mimetype } of data_of_images_to_upload) {
                //     image_url = await uploadImage(data, mimetype, destination_of_uploading)
                //     image_urls.push(image_url)
                // }
                console.log('>>> VCNDone!')
                resolve()
            })

            busboy_instance.on('error', (error) => {
                error_of_uploading = error
                reject(error)
            })

            request.pipe(busboy_instance)
        })
    } catch (error) {
        error_of_uploading = error
    }
    console.log('>>> image_urls >>>', image_urls)
    console.log('>>> image_urls[0] >>>', image_urls[0])
    console.log('>>> Array from image_urls >>>', Array.from(image_urls))
    console.log('>>> request_body >>>', request_body)
    console.log('>>> error_of_uploading >>>', error_of_uploading)
    return [image_urls, request_body, error_of_uploading]
}

export default uploadImages