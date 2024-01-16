import { Breadcrumbs, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import { styled } from '@mui/system'
import moment from 'moment/moment'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const Span = styled('div')(({ theme }) => ({
    marginBottom: 10,
}))

const Span_ = styled('div')(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: 10,
}))

const StatCards2 = () => {
    const { state } = useLocation()
    const item = state.JobDetails

    useEffect(() => {}, [])

    return (
        <div>
            <Container>
                <div className="breadcrumb">
                    <Breadcrumbs
                        routeSegments={[
                            {
                                name: 'Dashboard',
                                path: '/Admission/ADM_Dashboard',
                            },
                            { name: 'Job Details' },
                        ]}
                    />
                </div>
                <SimpleCard title="Job Details">
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={2}>
                            <Span>Job Title:</Span>
                            <Span>Department Title:</Span>
                            <Span>Designation Title:</Span>
                            <Span>BPS / Grade:</Span>
                            <Span>Start Date:</Span>
                            <Span>End Date:</Span>
                            <Span>Processing Fee:</Span>
                            <Span>Descriotion:</Span>
                        </Grid>
                        <Grid item xs={8}>
                            <Span_>{item.JOB_TITLE}</Span_>
                            <Span_>{item.DeptTitle}</Span_>
                            <Span_>{item.DesTitle}</Span_>
                            <Span_>{item.BPS_ID}</Span_>
                            <Span_>
                                {moment(item.START_DATE).format('DD/MM/YYYY')}
                            </Span_>
                            <Span_>
                                {moment(item.END_DATE).format('DD/MM/YYYY')}
                            </Span_>
                            <Span_>{item.VOUCHER_AMOUNT}</Span_>
                            <Span_>{item.DESCRIPTION}</Span_>
                        </Grid>
                    </Grid>
                </SimpleCard>
            </Container>
        </div>
    )
}

export default StatCards2
