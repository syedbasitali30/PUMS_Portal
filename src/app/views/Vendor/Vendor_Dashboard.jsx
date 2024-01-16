import React from 'react'
import { Box, Card, CardHeader, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import { SimpleCard } from 'app/components'

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: '#34314c',
    fontSize: 20,
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const StatCards2 = () => {
    const vendorData = useSelector((data) => data.loginReducer.VendorData)

    return (
        <div style={{ margin: 20 }}>
            {/*  */}

            <Grid item lg={8} md={8} sm={12} xs={12} sx={{ pl: '20px' }}>
                <H4>Welcome {vendorData.SupplierTitle}</H4>
            </Grid>

            <SimpleCard title="Open Tenders">
                <div style={{ paddingLeft: 5 }}>No Open Tenders Found</div>
            </SimpleCard>
        </div>
    )
}

export default StatCards2
