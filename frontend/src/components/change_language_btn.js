import React from "react"
import { useCurrentRoute } from "../hooks/custom_hooks"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import Vietnam_flag from '../assets/images/VietNam_flag.jpg'
import English_flag from '../assets/images/English_flag.jpg'
import { Box, Tooltip, Avatar } from "@mui/material"

const ChangeLanguageBtn = () => {
    const { t, i18n } = useTranslation('common')
    const current_route = useCurrentRoute()

    const is_at_homepage = current_route === '/'
    const current_lang = i18n.resolvedLanguage

    const changeLanguage = () => {
        let language_to_change

        if (current_lang === 'vi') {
            if (!is_at_homepage) {
                return toast.warning('Xin lỗi! Hiện tại chức năng này chỉ khả dụng ở trang chủ')
            }

            language_to_change = 'en'
        } else {
            if (!is_at_homepage) {
                return toast.warning('Sorry! Currently, this feature is useable only at homepage')
            }

            language_to_change = 'vi'
        }

        setTimeout(() => { // avoid blocking UI
            i18n.changeLanguage(language_to_change)
        }, 100)
    }

    const ChangeLanguageBtn = ({ title, src }) => (
        <Tooltip title={t(title)}>
            <Box
                onClick={changeLanguage}
                component="div"
                sx={{
                    cursor: 'pointer',
                    opacity: is_at_homepage ? '1' : '0.3'
                }}
            >
                <Avatar
                    src={src}
                    sx={{
                        height: '30px',
                        width: '30px',
                    }}
                />
            </Box>
        </Tooltip>
    )

    return (
        !current_lang || current_lang === 'en' ?
            <ChangeLanguageBtn
                title="Switch to Vietnamese"
                src={English_flag}
            />
            :
            <ChangeLanguageBtn
                src={Vietnam_flag}
                title="Switch to English"
            />
    )
}

export default ChangeLanguageBtn
