import { styled } from '@mui/system'
import { Autocomplete, Button, Icon } from '@mui/material'
import { TextValidator } from 'react-material-ui-form-validator'
import { useCallback, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { size } from 'lodash'

export const AutoComplete = styled(Autocomplete)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

export const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

export const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}))

export const H4 = styled('h3')(({ textcolor }) => ({
    margin: 0,
    color: textcolor,
    fontWeight: '500',
    marginLeft: '12px',
}))

export const DropdownListBox = ({
    ddlArray,
    value,
    placeholder,
    onSelectValue,
    label,
}) => {
    //
    const handleValueChange = useCallback(
        (value) => {
            onSelectValue(value)
            if (value === null) {
                onSelectValue({
                    _id: '0',
                    [label]: '',
                })
            }
        },
        [onSelectValue]
    ) //
    return (
        <AutoComplete
            value={value}
            id="combo-box-formula"
            options={ddlArray}
            onChange={(event, value) => {
                handleValueChange(value)
            }}
            getOptionLabel={(option) => option[label]}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option._id}>
                        {option[label]}
                    </li>
                )
            }}
            renderInput={(params) => (
                <TextField {...params} size="small" label={placeholder} />
            )}
        />
    )
}

export const TextInputBox = ({ value, label, onChangeValue }) => {
    const handleValueChange = useCallback(
        (value) => {
            onChangeValue(value)
        },
        [onChangeValue]
    )
    //
    return (
        <>
            <TextField
                size="small"
                type="text"
                autoComplete="off"
                onChange={(event) => {
                    handleValueChange(event.target.value)
                }}
                value={value}
                label={label}
            />
        </>
    )
}

export const TextInputBoxNumber = ({ value, label, onChangeValue }) => {
    const handleValueChange = useCallback(
        (value) => {
            onChangeValue(value)
        },
        [onChangeValue]
    )
    //
    return (
        <>
            <TextField
                size="large"
                type="number"
                autoComplete="off"
                onChange={(event) => {
                    handleValueChange(event.target.value)
                }}
                value={value}
                label={label}
            />
        </>
    )
}

export const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))

export const config = (_id, _name) => ({
    key_column: _id,
    page_size: 6,
    length_menu: [6, 10, 20, 50],
    filename: _name,
    no_data_text: 'No data available!',
    button: {
        // excel: true,
        print: true,
        csv: true,
        // extra: false,
    },
    language: {
        length_menu: 'Show _MENU_ result per page',
        filter: 'Filter in records...',
        info: 'Showing _START_ to _END_ of _TOTAL_ records',
        pagination: {
            first: 'First',
            previous: <span>&#9668;</span>,
            next: <span>&#9658;</span>,
            last: 'Last',
        },
    },
    pagination: 'advance', //advance
    show_length_menu: true,
    show_filter: true,
    show_pagination: true,
    show_info: true,
})

export const extraButtons = [
    {
        className: 'btn btn-primary buttons-pdf',
        title: 'Export TEst',
        children: [
            <span>
                <i
                    className="glyphicon glyphicon-print fa fa-print"
                    aria-hidden="true"
                ></i>
            </span>,
        ],
        onClick: (event) => {
            console.log(event)
        },
    },
    {
        className: 'btn btn-primary buttons-pdf',
        title: 'Export TEst',
        children: [
            <span>
                <i
                    className="glyphicon glyphicon-print fa fa-print"
                    aria-hidden="true"
                ></i>
            </span>,
        ],
        onClick: (event) => {
            console.log(event)
        },
        onDoubleClick: (event) => {
            console.log('doubleClick')
        },
    },
]
