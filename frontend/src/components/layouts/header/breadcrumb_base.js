import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import HomeIcon from '@mui/icons-material/Home'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { useLocation } from "react-router-dom"

const breadcrumbs_color = 'white'

const render_breadcrumb = (current_route, breadcrumb) => {
    return (
        <Link
            key={breadcrumb}
            underline="hover"
            color={breadcrumbs_color}
            href={current_route.slice(0, current_route.indexOf(breadcrumb)) + breadcrumb}
        >
            {breadcrumb}
        </Link>
    )
}

const BreadcrumbBase = () => {
    const location = useLocation()

    const breadcrumbs = useMemo(() => {
        if (location) {
            let breadcrumbs_list = location.pathname.split('/')
            breadcrumbs_list = breadcrumbs_list.slice(1, breadcrumbs_list.length - 1)
            return breadcrumbs_list
        }
        return []
    }, [location])

    return (
        <BreadcrumbsArea id="BreadcrumbsArea">
            <BreadcrumbName>Home.</BreadcrumbName>
            <Routes aria-label="breadcrumb" separator={'/'}>
                <HomeIconWrapper
                    title="Home page"
                    href="/"
                >
                    <StyledHomeIcon
                        sx={{ color: breadcrumbs_color }}
                    />
                </HomeIconWrapper>

                {
                    breadcrumbs.map((breadcrumb) => (
                        render_breadcrumb(location.pathname, breadcrumb)
                    ))
                }

                <div
                    style={{ color: breadcrumbs_color }}
                    title="Current page"
                >
                    ...
                </div>
            </Routes>
        </BreadcrumbsArea>
    )
}

export default BreadcrumbBase

const BreadcrumbsArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    padding: '10px 35px',
    fontFamily: '"Roboto", "sans-serif"',
    backgroundColor: 'black',
    borderBottom: '1px white solid',
    boxSizing: 'border-box',
})

const BreadcrumbName = styled('div')({
    paddingBottom: '5px',
    color: 'white',
    fontSize: '2rem',
    fontFamily: '"Chakra Petch", "sans-serif"',
})

const Routes = styled(Breadcrumbs)({
    display: 'flex',
    alignItems: 'center',
    '& .MuiBreadcrumbs-separator': {
        color: 'white',
    }
})

const HomeIconWrapper = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    cursor: 'pointer',
    marginBottom: '1px',
})

const StyledHomeIcon = styled(HomeIcon)({
    fontSize: '18px',
})