import React, { useState, useRef, useEffect } from "react"
import { styled } from '@mui/material/styles'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useDispatch } from "react-redux"
import { updateUserAvatar } from "../../store/actions/user_actions"
import { CircularProgress } from "@mui/material"

const RenderFirstCharacterOfName = (name_of_user) => {
    let display_name = ''
    let name_of_user_trimed = name_of_user.trim()
    name_of_user_trimed = ' ' + name_of_user_trimed
    for (let i = name_of_user_trimed.length; i > -1; i--)
        if (name_of_user_trimed[i] === ' ')
            display_name = name_of_user_trimed[i + 1].toUpperCase()

    return (<span>{display_name}</span>)
}

const RenderNameOfUserConvertion = (name_of_user) => {
    let name_of_user_trimed = name_of_user.trim()
    if (name_of_user_trimed.length > 5)
        name_of_user_trimed = name_of_user_trimed.slice(0, 8) + '...'

    return name_of_user_trimed
}

const Avatar = ({ nameOfUser, userAvatar }) => {
    const [openChangeAvatarSection, setOpenChangeAvatarSection] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const image_to_upload_ref = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        setAvatarUrl(userAvatar)
        setUpdating(false)
        setOpenChangeAvatarSection(false)
    }, [userAvatar])

    const handleChangeAvatar = () => {
        let image = image_to_upload_ref.current.files[0]
        setAvatarUrl(URL.createObjectURL(image))
        setOpenChangeAvatarSection(true)
    }

    const changeAvatarAction = (is_changing) => {
        if (is_changing) {
            setUpdating(true)
            let avatar_to_update = image_to_upload_ref.current.files[0]
            dispatch(updateUserAvatar(avatar_to_update))
        } else {
            setOpenChangeAvatarSection(false)
            setUpdating(false)
            image_to_upload_ref.current.value = null
        }
    }

    return (
        <AvatarSection id="AvatarSection">

            {
                !!openChangeAvatarSection &&
                <AvatarChangingModalBase>
                    <ChangeAvatarSection>
                        <AvatarWarraper sx={{ margin: '0 auto', backgroundImage: `url("${avatarUrl}")`, backgroundSize: '100% 100%' }} />
                        <TextConfirm>Set this image to your avatar ?</TextConfirm>
                        <CancelAgreeContainer>
                            <span></span>
                            <div style={{ display: 'flex', columnGap: '15px' }}>
                                <CancelBtn onClick={() => changeAvatarAction(false)}>
                                    Cancel
                                </CancelBtn>
                                <AgreeBtn onClick={() => changeAvatarAction(true)}>
                                    {
                                        updating ?
                                            <CircularProgress
                                                sx={{ color: 'black', margin: 'auto' }}
                                                size={15}
                                                thickness={6}
                                            />
                                            :
                                            <span>Agree</span>
                                    }
                                </AgreeBtn>
                            </div>
                        </CancelAgreeContainer>
                    </ChangeAvatarSection>
                </AvatarChangingModalBase>
            }

            <input
                ref={image_to_upload_ref}
                style={{ display: 'none' }}
                type="file"
                id="fake_avatar_input"
                onChange={handleChangeAvatar}
            />

            <AvatarWarraper sx={userAvatar && { backgroundImage: `url("${userAvatar}")`, backgroundSize: '100% 100%' }}>
                {!userAvatar && nameOfUser && RenderFirstCharacterOfName(nameOfUser)}

                <ChangeAvatarBtn
                    title="Click to change avatar"
                    className="change_avatar_btn"
                    htmlFor="fake_avatar_input"
                >
                    <AddAPhotoIcon sx={{ margin: 'auto', width: '40%', height: '40%', color: 'black' }} />
                </ChangeAvatarBtn>
            </AvatarWarraper>

            <NameTextContainer>
                <div>Hello,</div>
                <div title={nameOfUser}>
                    {RenderNameOfUserConvertion(nameOfUser)}
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

const AvatarChangingModalBase = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    backgroundColor: '#0000006e',
    zIndex: '99',
})

const ChangeAvatarSection = styled('div')({
    padding: '20px 20px 15px',
    borderRadius: '10px',
    border: '1px black solid',
    backgroundColor: 'white',
    width: '30%',
    boxSizing: 'border-box',
})

const TextConfirm = styled('div')({
    marginTop: '10px',
    fontFamily: '"Kanit", "sans-serif"',
    borderBottom: '1px gray solid',
    paddingLeft: '5px',
    width: '100%',
})

const CancelAgreeContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '5px',
    fontFamily: '"Kanit", "sans-serif"',
    border: 'none',
    padding: '5px',
    borderRadius: '5px',
})

const CancelBtn = styled('span')({
    padding: '5px 15px',
    backgroundColor: '#d6d6d6',
    borderRadius: '5px',
    cursor: 'pointer',
    ':hover': {
        outline: '2px black solid',
    }
})

const AgreeBtn = styled(CancelBtn)({
    display: 'flex',
})

const AvatarWarraper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '110px',
    height: '110px',
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
    overflowX: 'hidden',
    '& div:nth-of-type(2)': {
        fontWeight: 'bold',
        fontSize: '1.2em',
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
})