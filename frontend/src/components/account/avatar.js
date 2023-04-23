import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

const RenderFirstCharacterOfName = (name_of_user) => {
    let display_name = ''
    let name_of_user_trimed = name_of_user.trim()
    name_of_user_trimed = ' ' + name_of_user_trimed
    for (let i = name_of_user_trimed.length; i > -1; i--)
        if (name_of_user_trimed[i] === ' ')
            display_name = name_of_user_trimed[i + 1].toUpperCase()

    return (<span>{display_name}</span>)
}

const RenderConvertNameOfUser = (name_of_user) => {
    let name_of_user_trimed = name_of_user.trim()
    let includes_space = name_of_user_trimed.includes(' ')
    if (!includes_space && name_of_user_trimed.length > 6)
        name_of_user_trimed = name_of_user_trimed.slice(0, 6) + '...'
    else if (includes_space && name_of_user_trimed.length > 6)
        name_of_user_trimed = name_of_user_trimed.slice(0, 12) + '...'

    return name_of_user_trimed
}

const Avatar = ({ nameOfUser, userAvatar }) => {
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        setAvatar(userAvatar)
    }, [userAvatar])

    const handleChangeAvatar = (e) => {
        let files = e.target.files
        let image_url_temp = URL.createObjectURL(files[0])
        setAvatar(image_url_temp)
    }

    return (
        <AvatarSection id="AvatarSection">

            <input
                style={{ display: 'none' }}
                type="file"
                id="avatar_fake_input"
                onChange={handleChangeAvatar}
            />

            <AvatarWarraper sx={avatar && { backgroundImage: `url("${avatar}")`, backgroundSize: '100% 100%' }}>
                {!avatar && nameOfUser && RenderFirstCharacterOfName(nameOfUser)}

                <ChangeAvatarBtn
                    title="Click to change avatar"
                    className="change_avatar_btn"
                    htmlFor="avatar_fake_input"
                >
                    <AddAPhotoIcon sx={{ margin: 'auto', width: '40%', height: '40%', color: 'black' }} />
                </ChangeAvatarBtn>
            </AvatarWarraper>

            <NameTextContainer>
                <div>Hello,</div>
                <div title={nameOfUser}>
                    {RenderConvertNameOfUser(nameOfUser)}
                </div>
            </NameTextContainer>

        </AvatarSection>
    )
}

export default Avatar

const AvatarSection = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
}))

const AvatarWarraper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '110px',
    minHeight: '110px',
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: 'rgb(45,45,45)',
    color: 'white',
    fontSize: '3em',
    fontWeight: 'bold',
    fontFamily: '"Kanit", "sans-serif"',
    '&:hover label.change_avatar_btn': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff70',
    },
})

const ChangeAvatarBtn = styled('label')({
    display: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    cursor: 'pointer',
})

const NameTextContainer = styled('div')({
    fontFamily: '"Kanit", "sans-serif"',
    marginLeft: '15px',
    '& div:nth-of-type(2)': {
        fontWeight: 'bold',
        fontSize: '1.2em',
    },
})