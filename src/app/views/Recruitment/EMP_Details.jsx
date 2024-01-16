import React, { useEffect, useState } from 'react'
import { Slide, styled } from '@mui/material'
// import 'bootstrap/dist/css/bootstrap.min.css'
import companyLogo from '../../components/MatxLogo/university-logo-transparent.png'

const EMP_Details = ({ className, DetailsData }) => {
    const Details = DetailsData[0]
    const userCNIC = Details.cnic
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
                                Form # : {Details.EmpID}
                            </P>
                        </a>
                    </div>

                    <div>
                        {/* <div><P style={{marginRight:'-20px'}}>Form # : <br />  AU-F22-00616</P></div>  */}
                        <div>
                            <img
                                style={{
                                    height: 200,
                                    width: 200,
                                }}
                                src={`http://121.52.155.34:5000/uploads/EMP_Profile/${userCNIC}.png`}
                                alt="Profile"
                            />{' '}
                        </div>{' '}
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
                        ONLINE JOB APPLICATION 2022-2023
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
                            Name : {Details.name}
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
                            Father's / Legal Guardian's Name :{'    '}
                            {Details.fname}
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
                            Date of Birth : {Details.DOB}
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
                            Cell No : {Details.contact}
                        </P>
                        <P
                            style={{
                                width: '70%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Email: {Details.F_Contact}
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
                            National Identity Card #/ B-Form #/Passport # :
                            {Details.cnic}
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
                            Gender:
                            {Details.Gender}
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
                            Blood Group: {Details.Blood_Group}
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
                            Current / Permanent Address:{' '}
                            {Details.CurrentAddress}
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
                            Mailing / Postal Address: {Details.PerAddress}
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
                        PART - II: EDUCATIONAL INFORMATION
                    </P>
                </div>
                {/* EDU */}
                <div
                    style={{
                        // marginLeft: 100,
                        // marginRight: 100,
                        // marginTop: 50,
                        borderColor: 'black',
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'solid',
                    }}
                >
                    <Div>
                        <P
                            style={{
                                width: '30%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Board
                        </P>
                        <P
                            style={{
                                width: '20%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Marks Obtained
                        </P>
                        <P
                            style={{
                                width: '15%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Total Marks
                        </P>
                        <P
                            style={{
                                width: '15%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Percentage
                        </P>
                        <P
                            style={{
                                width: '15%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            PassingYear
                        </P>
                        <P
                            style={{
                                width: '15%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            School
                        </P>
                    </Div>
                    {/*  */}
                    {Details.EducationArray?.map((product, index) => (
                        <Div key={index}>
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.board}
                            </P>
                            <P
                                style={{
                                    width: '20%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.Obtained}
                            </P>
                            <P
                                style={{
                                    width: '15%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.Total}
                            </P>
                            <P
                                style={{
                                    width: '15%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.per}
                            </P>
                            <P
                                style={{
                                    width: '15%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.year}
                            </P>
                            <P
                                style={{
                                    width: '15%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.school}
                            </P>
                        </Div>
                    ))}
                </div>
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
                        PART - III: EXPERIENCE INFORMATION
                    </P>
                    {/*  */}
                </div>
                <div
                    style={{
                        // marginLeft: 100,
                        // marginRight: 100,
                        // marginTop: 50,
                        borderColor: 'black',
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'solid',
                    }}
                >
                    <Div>
                        <P
                            style={{
                                width: '30%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Name of Post
                        </P>
                        <P
                            style={{
                                width: '15%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Basic Pay
                        </P>
                        <P
                            style={{
                                width: '25%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Organization
                        </P>
                        <P
                            style={{
                                width: '15%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Service From
                        </P>
                        <P
                            style={{
                                width: '15%',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Service To
                        </P>
                    </Div>
                    {/*  */}
                    {Details.ExpArrayData?.map((product, index) => (
                        <Div key={index}>
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.nameofpost}
                            </P>
                            <P
                                style={{
                                    width: '15%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.basicpay}
                            </P>
                            <P
                                style={{
                                    width: '25%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.organization}
                            </P>
                            <P
                                style={{
                                    width: '15%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.servicefrom}
                            </P>
                            <P
                                style={{
                                    width: '15%',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                {product.serviceto}
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
                            href={`http://121.52.155.34:5000/uploads/EMP_Profile/${userCNIC}.png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                Profile Picture{' '}
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
                            href={`http://121.52.155.34:5000/uploads/EMP_CNIC/${userCNIC}.png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                CNIC / B.Form{' '}
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
                            href={`http://121.52.155.34:5000/uploads/EMP_CV/${userCNIC}.png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                Employee CV{' '}
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
                            href={`http://121.52.155.34:5000/uploads/EMP_Domicile/${userCNIC}.png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                Domicile{' '}
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
                            href={`http://121.52.155.34:5000/uploads/EMP_PRC/${userCNIC}.png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                PRC{' '}
                            </P>
                        </a>
                    </div>

                    {/* <div
                        style={{
                            color: 'blue',
                            fontSize: '18px',
                            textDecoration: 'underline',
                        }}
                    >
                        <a
                            href={`http://121.52.155.34:5000/uploads/Challan/${userCNIC}png`}
                            target="_blank"
                        >
                            <P
                                style={{
                                    width: '30%',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}
                            >
                                Challan{' '}
                            </P>
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default EMP_Details
