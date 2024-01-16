import React, { Fragment, useEffect, useState } from 'react'
import Scrollbar from 'react-perfect-scrollbar'
import {
    navigations,
    navigations_Emp,
    navigations_Vendor,
    navigations_Student,
    navigations_TechStudent,
} from 'app/navigations'
import { MatxVerticalNav } from 'app/components'
import useSettings from 'app/hooks/useSettings'
import { styled } from '@mui/system'

const StyledScrollBar = styled(Scrollbar)(() => ({
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'relative',
}))

const SideNavMobile = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100vw',
    background: 'rgba(0, 0, 0, 0.54)',
    zIndex: -1,
    [theme.breakpoints.up('lg')]: {
        display: 'none',
    },
}))

const Sidenav = ({ children }) => {
    //
    const [UserNavigation, setUserNavigation] = useState(navigations)

    useEffect(() => {
        const loginType = window.localStorage.getItem('loginType')

        if (loginType === 'Employee') {
            setUserNavigation(navigations_Emp)
        } else if (loginType === 'Vendor') {
            setUserNavigation(navigations_Vendor)
        } else if (loginType === 'Student') {
            setUserNavigation(navigations_Student)
        } else if (loginType === 'TechStudent') {
            setUserNavigation(navigations_TechStudent)
        } else {
            setUserNavigation(navigations)
        }
    }, [])
    //
    const { settings, updateSettings } = useSettings()

    const updateSidebarMode = (sidebarSettings) => {
        let activeLayoutSettingsName = settings.activeLayout + 'Settings'
        let activeLayoutSettings = settings[activeLayoutSettingsName]

        updateSettings({
            ...settings,
            [activeLayoutSettingsName]: {
                ...activeLayoutSettings,
                leftSidebar: {
                    ...activeLayoutSettings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        })
    }

    return (
        <Fragment>
            <StyledScrollBar options={{ suppressScrollX: true }}>
                {children}
                <MatxVerticalNav items={UserNavigation} />
            </StyledScrollBar>

            <SideNavMobile
                onClick={() => updateSidebarMode({ mode: 'close' })}
            />
        </Fragment>
    )
}

export default Sidenav
