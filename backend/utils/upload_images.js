import cloudinary from 'cloudinary'

const uploadImages = async (images) => {
    console.log('>>> images >>>', images)
    await cloudinary.v2.uploader.upload(
        images[0].data,
        {
            use_filename: true,
            unique_filename: true,
            overwrite: true,
        }
    )

    // try {
    //     for (let { data } of images) {
    //         console.log('>>> data >>>', data)
    //         let result = await cloudinary.v2.uploader.upload(
    //             data,
    //             {
    //                 unique_filename:true,
    //                 use_filename: true,
    //                 folder: 'test',
    //             }
    //         )
    //         console.log('>>> result >>>', result)
    //     }
    // } catch (error) {
    //     return error
    // }
}

export default uploadImages