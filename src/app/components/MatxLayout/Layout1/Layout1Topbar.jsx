import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { styled, useTheme, Box } from '@mui/system'
import { H2, H3, H4, Span } from '../../../components/Typography'
import { MatxMenu, MatxSearchBox } from 'app/components'
// import ShoppingCart from '../../ShoppingCart/ShoppingCart'
import NotificationBar from '../../NotificationBar/NotificationBar'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import { NotificationProvider } from 'app/contexts/NotificationContext'
import { useDispatch, useSelector } from 'react-redux'

import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
    Alert,
    Snackbar,
} from '@mui/material'
import { topBarHeight } from 'app/utils/constant'
import LinearProgress from '@mui/material/LinearProgress'
import moment from 'moment'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
}))

const TopbarRoot = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[8],
    height: topBarHeight,
}))

const TopbarContainer = styled(Box)(({ theme }) => ({
    padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
    },
}))

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
        margin: '0 8px',
    },
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': {
        marginRight: '10px',
        color: theme.palette.text.primary,
    },
}))

const IconBox = styled('div')(({ theme }) => ({
    display: 'inherit',
    [theme.breakpoints.down('md')]: {
        display: 'none !important',
    },
}))

const Layout1Topbar = () => {
    const barDetails = JSON.parse(window.localStorage.getItem('TopBarDetails'))
    // console.log(barDetails)
    //
    const userData = useSelector((data) => data.loginReducer.LoginData)
    const progressData = useSelector((data) => data.focusReducer.Progress)
    //
    const [progress, setProgress] = React.useState(0)
    const [buffer, setBuffer] = React.useState(10)
    const [toggle, setToggle] = useState(false)

    const progressRef = React.useRef(() => {})
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100 || !progressData || undefined) {
                setProgress(0)
                setBuffer(10)
            } else {
                const diff = Math.random() * 10
                const diff2 = Math.random() * 10
                setProgress(progress + diff)
                setBuffer(progress + diff + diff2)
            }
        }
    })

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current()
        }, 400)

        return () => {
            clearInterval(timer)
        }
    }, [])
    //

    const theme = useTheme()
    const { settings, updateSettings } = useSettings()
    const { logout, user } = useAuth()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode
        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }
        updateSidebarMode({ mode })
    }

    useEffect(() => {
        const intervalID = setInterval(() => {
            setToggle((toggle) => !toggle)
        }, 1000)

        return () => clearInterval(intervalID)
    }, [])

    return (
        <TopbarRoot>
            <TopbarContainer>
                <Box display="flex">
                    <StyledIconButton onClick={handleSidebarToggle}>
                        <Icon>menu</Icon>
                    </StyledIconButton>

                    {/* <IconBox>
                        <StyledIconButton>
                            <Icon>mail_outline</Icon>
                        </StyledIconButton>

                        <StyledIconButton>
                            <Icon>web_asset</Icon>
                        </StyledIconButton>

                        <StyledIconButton>
                            <Icon>star_outline</Icon>
                        </StyledIconButton>
                    </IconBox> */}
                    <H2
                        style={{
                            textTransform: 'uppercase',
                            paddingLeft: 5,
                            fontSize: 20,
                            paddingTop: 5,
                        }}
                    >
                        Admission Portal
                    </H2>
                </Box>
                <Box display="flex" alignItems="center">
                    {/* <MatxSearchBox /> */}
                    <NotificationProvider>
                        {/* <b
                            style={{
                                textAlign: 'left',

                                paddingRight: 10,
                            }}
                        >
                            {moment().format('DD/MM/YYYY hh:mm:ss')}
                        </b> */}

                        <Chip
                            icon={<Icon>access_time</Icon>}
                            label={
                                <b>{moment().format('DD/MM/YYYY hh:mm:ss')}</b>
                            }
                        />
                        <NotificationBar />
                    </NotificationProvider>

                    {/* <ShoppingCart /> */}

                    <MatxMenu
                        menuButton={
                            <UserMenu>
                                <Hidden xsDown>
                                    <Span>
                                        <strong
                                            style={{
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            {/* {userData.CANDIDATE_NAME} */}{' '}
                                            {barDetails[0]}
                                        </strong>
                                    </Span>
                                </Hidden>
                                <Avatar
                                    src={barDetails[1]}
                                    sx={{ cursor: 'pointer' }}
                                />
                            </UserMenu>
                        }
                    >
                        {/* <StyledItem>
                            <Link to="/">
                                <Icon> home </Icon>
                                <Span> Home </Span>
                            </Link>
                        </StyledItem> */}
                        {/* <StyledItem>
                            <Link to="/page-layouts/user-profile">
                                <Icon> person </Icon>
                                <Span> Profile </Span>
                            </Link>
                        </StyledItem> */}
                        {/* <StyledItem>
                            <Icon> settings </Icon>
                            <Span> Settings </Span>
                        </StyledItem> */}
                        <StyledItem onClick={logout}>
                            <Icon> power_settings_new </Icon>
                            <Span> Logout </Span>
                        </StyledItem>
                    </MatxMenu>
                </Box>
            </TopbarContainer>
            {progressData || undefined ? (
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    valueBuffer={buffer}
                    color="secondary"
                />
            ) : // <LinearProgress color="secondary" />
            null}
        </TopbarRoot>
    )
}

export default React.memo(Layout1Topbar)
