import React, { useEffect, useState } from 'react'
import { Slide, styled } from '@mui/material'
// import 'bootstrap/dist/css/bootstrap.min.css'
import companyLogo from '../../components/MatxLogo/university-logo-transparent.png'

const Vendor_Details = ({ className, DetailsData }) => {
    const Details = DetailsData[0]
    const userCNIC = Details.CNICnumber
    var styles = {
        normal_text: {
            fontWeight: 'normal',
        },
        div_space: {
            marginRight: 50,
        },
    }

    const P = styled('a')(() => ({
        width: '50%',
        fontWeight: 'bold',
        fontFamily: 'Glory-Bold',
        paddingTop: 5,
        paddingBottom: 5,
    }))

    const Div = styled('div')(() => ({
        flexDirection: 'row',
        display: 'flex',
        borderColor: 'black',
        borderWidth: '1px',
        borderStyle: 'solid',
        paddingLeft: 10,
        borderBottomWidth: '0px',
        //
    }))
    return (
        <div
            style={{
                backgroundColor: '#525659',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* <H3
                            sx={{
                                flex: 1,
                                marginLeft: theme.spacing(2),
                            }}
                        >
                             PURCHASE ORDER REPORT
                        </H3> */}

            <div
                style={{
                    backgroundColor: 'white',
                    padding: 50,
                    width: '800px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <img
                            style={{
                                height: 90,
                                width: 90,
                                marginTop: '-100px',
                            }}
                            src={companyLogo}
                        ></img>
                    </div>
                    <div
                        style={{
                            paddingLeft: 20,
                            marginTop: '-100px',
                            paddingRight: '-59px',
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: 'Glory-Bold',
                                fontSize: '22px',
                                marginRight: '20px',
                            }}
                        >
                            Peoples University of Medical and Health
                            <br /> Sciences For Women
                            <br />
                        </h2>
                        <a>
                            <P style={{ marginRight: '-20px' }}>
                                Form # : {Details.VendorID}
                            </P>
                        </a>
                    </div>

                    <div>
                        {/* <div><P style={{marginRight:'-20px'}}>Form # : <br />  AU-F22-00616</P></div>  */}
                        <div
                            style={{
                                height: 200,
                                width: 200,
                            }}
                        >
                            {/* <img
                                style={{
                                    height: 200,
                                    width: 200,
                                }}
                                src={`http://121.52.155.34:5000/uploads/EMP_Profile/${userCNIC}.png`}
                                alt="Profile"
                            />{' '} */}
                        </div>
                    </div>
                </div>
                {/* HEADER */}
                <div
                    style={{
                        marginTop: '-53px',
                        marginBottom: 50,
                        marginLeft: 80,
                    }}
                >
                    <P
                        style={{
                            fontWeight: 'normal',
                            fontSize: 20,
                            backgroundColor: '#7f6000',
                            color: '#fff',
                            paddingLeft: 30,
                            paddingRight: 39,
                            textDecoration: 'none',
                            // paddingTop: 10,
                            // paddingBottom: 10,
                        }}
                    >
                        ONLINE VENDOR APPLICATION 2022-2023
                    </P>
                    <div></div>
                </div>
                {/* HEADER */}
                <div
                    style={{
                        width: '100%',
                        backgroundColor: '#7f6000',
                        paddingTop: 5,
                        paddingBottom: 5,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderStyle: 'solid',
                    }}
                >
                    <P
                        style={{
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#fff',
                            paddingLeft: 30,
                            textDecoration: 'none',
                        }}
                    >
                        PART - I: PERSONAL INFORMATION
                    </P>
                </div>
                <div>
                    <Div>
                        <P
                            style={{
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Business Name : {Details.businessName}
                        </P>
                    </Div>
                    <Div>
                        <P
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Contact Name:{'    '}
                            {Details.contactName}
                        </P>
                    </Div>
                    <Div>
                        <P
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Contact Number : {Details.contactNumber}
                        </P>
                    </Div>
                    <Div>
                        <P
                            style={{
                                width: '50%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Country : {Details.Country}
                        </P>

                        <P
                            style={{
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Province : {Details.Province}
                        </P>

                        <P
                            style={{
                                width: '50%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            City : {Details.City}
                        </P>
                    </Div>
                    <Div>
                        <P
                            style={{
                                width: '30%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Classification : {Details.classification}
                        </P>
                        <P
                            style={{
                                width: '70%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Category: {Details.category}
                        </P>
                    </Div>
                    <Div>
                        <P
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            CNIC Number: {Details.CNICnumber}
                        </P>
                    </Div>
                    <Div>
                        <P
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            NTN Number: {Details.NTNnumber}
                        </P>
                    </Div>
                    <Div>
                        <P
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            STR Nnumber: {Details.STRNnumber}
                        </P>
                    </Div>
                    <Div>
                        <P
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Work Experience: {Details.workExperience}
                        </P>
                    </Div>
                    <Div style={{ borderBottomWidth: '1px' }}>
                        <P
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Tech ProfAbility: {Details.tech_profAbility}
                        </P>
                    </Div>
                </div>
                {/* EDU */}
                <div
                    style={{
                        width: '100%',
                        backgroundColor: '#7f6000',
                        paddingTop: 5,
                        paddingBottom: 5,
                        marginTop: 15,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderStyle: 'solid',
                    }}
                >
                    <P
                        style={{
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#fff',
                            paddingLeft: 30,
                            textDecoration: 'none',
                        }}
                    >
                        PART - II: SERVICES
                    </P>
                </div>
                {/* EDU */}
                <div
                    style={{
                        borderColor: 'black',
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'solid',
                    }}
                >
                    <Div>
                        <P
                            style={{
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Services
                        </P>
                    </Div>
                    {/*  */}
                    {Details.EducationArray?.map((product, index) => (
                        <Div key={index}>
                            <P
                                style={{
                                    width: '100%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                product.board
                            </P>
                        </Div>
                    ))}
                </div>
                <br />
                <div
                    style={{
                        borderColor: 'black',
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'solid',
                    }}
                >
                    <br />
                    <div
                        style={{
                            color: 'blue',
                            fontSize: '18px',
                            textDecoration: 'underline',
                        }}
                    >
                        <a
                            href={`http://121.52.155.34:5000/uploads/VEN_CNICImage/${userCNIC}.png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                CNIC{' '}
                            </P>
                        </a>
                    </div>
                    <div
                        style={{
                            color: 'blue',
                            fontSize: '18px',
                            textDecoration: 'underline',
                        }}
                    >
                        <a
                            href={`http://121.52.155.34:5000/uploads/VEN_NTNImage/${userCNIC}.png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                NTN{' '}
                            </P>
                        </a>
                    </div>
                    <div
                        style={{
                            color: 'blue',
                            fontSize: '18px',
                            textDecoration: 'underline',
                        }}
                    >
                        <a
                            href={`http://121.52.155.34:5000/uploads/VEN_STRNImage/${userCNIC}.png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                STRN{' '}
                            </P>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vendor_Details
