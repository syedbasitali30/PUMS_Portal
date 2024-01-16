import { styled } from '@mui/material'
import moment from 'moment'
import ImageBase64 from './ImageBase64_'
import Barcode from 'react-barcode'
import ip from '../DB/IP_Address'

const RegistrationChallan = ({ className, Voucher, Program, infoData }) => {
    const arr = [
        { name: 'Bank Copy' },
        { name: 'Bank Copy by Student' },
        { name: 'Student Copy' },
        { name: 'University Copy' },
    ]
    return (
        <div id="pdf" className={className}>
            <table className="print" width="100%" height="100%">
                <tbody>
                    <tr id="middle">
                        {arr.map((item, index) => (
                            <td key={index} width="25%" height="100%">
                                <table
                                    className="panel panel-primary"
                                    width="95%"
                                >
                                    <tbody>
                                        <tr>
                                            <td
                                                className="text-center"
                                                style={{
                                                    textAlign: 'center',
                                                    paddingTop: 10,
                                                }}
                                            >
                                                <img
                                                    width="100"
                                                    className="img-responsive"
                                                    src={ImageBase64.IMAGE_UNI}
                                                    alt="BNBWU Logo"
                                                    crossOrigin="anonymous"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                className="text-center"
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <strong>{item.name}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="text-center margin-bottom-6">
                                                    <strong>
                                                        ADMISSION TEST FEE
                                                        VOUCHER Fall 2022-2023
                                                    </strong>
                                                </h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    border: 0,
                                                                }}
                                                            >
                                                                <strong>
                                                                    Form#
                                                                </strong>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: 0,
                                                                }}
                                                            >
                                                                {Voucher.FormID}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: 0,
                                                                    fontSize:
                                                                        '12px',
                                                                }}
                                                            >
                                                                <strong>
                                                                    Issue Date
                                                                </strong>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: 0,
                                                                }}
                                                            >
                                                                {moment().format(
                                                                    'DD-MM-YYYY'
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    width: '30%',
                                                                }}
                                                            >
                                                                <strong>
                                                                    Name
                                                                </strong>
                                                            </th>
                                                            <td
                                                                style={{
                                                                    textTransform:
                                                                        'uppercase',
                                                                }}
                                                            >
                                                                {' '}
                                                                {Voucher.S_name}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    width: '30%',
                                                                }}
                                                            >
                                                                <strong>
                                                                    Father's
                                                                    Name
                                                                </strong>
                                                            </th>
                                                            <td
                                                                style={{
                                                                    textTransform:
                                                                        'uppercase',
                                                                }}
                                                            >
                                                                {Voucher.F_Name}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    width: '30%',
                                                                }}
                                                            >
                                                                <strong>
                                                                    CNIC/B-Form
                                                                    #
                                                                </strong>
                                                            </th>
                                                            <td
                                                                style={{
                                                                    textTransform:
                                                                        'uppercase',
                                                                }}
                                                            >
                                                                {Voucher.CNIC}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="text-center">
                                                    <img
                                                        width="40"
                                                        height="35"
                                                        src={
                                                            ImageBase64.IMAGE_BANK
                                                        }
                                                    />
                                                </div>
                                                <h5 className="text-center margin-bottom-6">
                                                    <strong>
                                                        ABL A/C-0010098089020032
                                                    </strong>
                                                    <br />
                                                    The PUMS University
                                                    Collection Account
                                                </h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                <strong>
                                                                    Program
                                                                </strong>
                                                            </th>
                                                            <td>
                                                                {Program.slice(
                                                                    0,
                                                                    1
                                                                ).map(
                                                                    (value) => {
                                                                        return value.PROGRAM_TITLE
                                                                    }
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Admission Fee
                                                            </th>
                                                            <td> Rs. 1,200</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p
                                                    className="margin-bottom-10"
                                                    style={{
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    <strong>
                                                        Due Date / Validity
                                                        Date:{' '}
                                                    </strong>
                                                    {infoData.CHALLAN_END_DATE}
                                                </p>
                                                <p
                                                    className="margin-bottom-10"
                                                    // style={{ marginLeft: 12 }}
                                                >
                                                    <strong>
                                                        PAYMENT TERMS
                                                    </strong>
                                                </p>
                                                <ul className="size-11">
                                                    <li>
                                                        Mode of Payment :- Local
                                                        Pay Order / Allied Bank
                                                        CC
                                                    </li>
                                                    <li>
                                                        Cheques are unacceptable
                                                    </li>
                                                    <li>
                                                        Pay Order / Allied Bank
                                                        CC is acceptable till
                                                        due date
                                                    </li>
                                                    <li>
                                                        No challan is acceptable
                                                        after due date
                                                    </li>
                                                    <li>
                                                        Pay Order should be in
                                                        favour of The PUMS
                                                        University Collection
                                                        Account.
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const Form = styled(RegistrationChallan)`
    .print {
        @media print {
            @page {
                size: landscape;
            }
        }
    }

    .margin-bottom-6 {
        margin-bottom: 6px !important;
    }

    .text-center {
        text-align: center;
    }

    .table-bordered {
        border: 1px solid #ddd;
    }

    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 10px;
    }

    .table > tbody > tr > td,
    .table > tbody > tr > th,
    .table > tfoot > tr > td,
    .table > tfoot > tr > th,
    .table > thead > tr > td,
    .table > thead > tr > th {
        padding: 4px;
        line-height: 1.42857143;
        vertical-align: top;
        border-top: 1px solid #ddd;
        white-space: nowrap;
    }

    .table tr > th {
        background: #f4f4f4;
    }

    th {
        text-align: left;
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }

    .margin-bottom-10 {
        margin-bottom: 10px !important;
    }

    p {
        margin: 0 0 10px;
    }

    div.row > div img.img-responsive {
        width: 100%;
    }

    img.img-responsive {
        display: inline-block;
    }

    .thumbnail a > img,
    .thumbnail > img {
        display: block;
        max-width: 100%;
        height: auto;
    }

    audio,
    canvas,
    img,
    video {
        vertical-align: middle;
    }

    img {
        border: 0;
        vertical-align: top;
    }

    .padding-3 {
        padding: 3px !important;
    }

    .size-11 {
        font-size: 11px !important;
        line-height: 15px !important;
    }

    .alert {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    .text-center {
        text-align: center;
    }

    body {
        color: #333;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 10.5px;
        line-height: 1.5;
    }

    b,
    strong {
        font-weight: 700;
    }

    #middle .panel-primary,
    #middle1 .panel-primary {
        border-color: #cccccc !important;
    }

    pre,
    .alert,
    .panel,
    .navbar-toggle,
    .btn {
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }

    .panel {
        margin-bottom: 30px;
        margin-left: 10px;
    }

    .panel-primary {
        border-color: #337ab7;
    }

    .panel {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    }

    .table-bordered {
        border: 1px solid #ddd;
    }

    .table {
        width: 100%;
        max-width: 100%;
    }

    .table-bordered > tbody > tr > td,
    .table-bordered > tbody > tr > th,
    .table-bordered > tfoot > tr > td,
    .table-bordered > tfoot > tr > th,
    .table-bordered > thead > tr > td,
    .table-bordered > thead > tr > th {
        border: 1px solid #ddd;
    }
`

const Admit_Card = ({ className, Voucher, infoData, userData, Program }) => {
    return (
        <div className={className}>
            <div className="Form">
                <table width="100%" height="100%">
                    <tr id="middle">
                        <td width="100%" height="100%">
                            <table className="panel panel-primary" width="100%">
                                <tr>
                                    <td>
                                        <table
                                            className="table table-bordered"
                                            style={{
                                                border: 0,
                                                borderStyle: 'solid',
                                                borderColor: 'white',
                                            }}
                                        >
                                            <tbody>
                                                <tr>
                                                    <td
                                                        className="text-center"
                                                        style={{
                                                            textAlign: 'left',
                                                            paddingTop: 10,
                                                            border: 0,
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                    >
                                                        <img
                                                            style={{
                                                                paddingTop: 5,
                                                            }}
                                                            width="105px"
                                                            height="110px"
                                                            src="https://raw.githubusercontent.com/syedbasitali30/Aror_Backend/main/university-logo-transparent.png"
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: 'center',
                                                            paddingTop: 30,
                                                            fontSize: 15,
                                                            fontWeight: 700,
                                                            border: 0,
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                    >
                                                        <h4
                                                            style={{
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            Peoples University
                                                            of Medical & Health
                                                            Science for Women
                                                        </h4>
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    '#7f6000',
                                                                color: 'white',
                                                                padding:
                                                                    '10px 30px',
                                                                display:
                                                                    'inline-block',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            ADMISSION TEST ADMIT
                                                            CARD Fall 2022-2023
                                                        </span>
                                                    </td>
                                                    <td
                                                        className="text-center"
                                                        style={{
                                                            textAlign: 'right',
                                                            paddingTop: 10,
                                                            border: 0,
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                    >
                                                        {/* <img
                                                            src="http://admissions.bnbwu.edu.pk/assets/images/avatar2.jpg"
                                                            width="130"
                                                            height="130"
                                                        /> */}
                                                        <img
                                                            style={{
                                                                height: 100,
                                                                width: 100,
                                                                marginTop: 5,
                                                            }}
                                                            src={
                                                                ip.admission +
                                                                `uploads/Profile/${userData.CNIC}.jpg`
                                                            }
                                                            alt="Profile"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr></tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table className="table">
                                            {/* <br /> */}
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{
                                                            border: 0,
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                    >
                                                        <strong
                                                            style={{
                                                                paddingRight: 5,
                                                            }}
                                                        >
                                                            Admit Card No:
                                                        </strong>
                                                        {Voucher.FormID}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <strong>Name</strong>
                                                    </th>
                                                    <td
                                                        style={{
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {Voucher.S_name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Father's Name
                                                        </strong>
                                                    </th>
                                                    <td
                                                        style={{
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {Voucher.F_Name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <strong>
                                                            CNIC No. as on
                                                            B.Form
                                                        </strong>
                                                    </th>
                                                    <td>{Voucher.CNIC}</td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <strong>Program</strong>
                                                    </th>
                                                    <td>
                                                        {Program.slice(
                                                            0,
                                                            1
                                                        ).map((value) => {
                                                            return value.PROGRAM_TITLE
                                                        })}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Domicile
                                                        </strong>
                                                    </th>
                                                    <td
                                                        style={{
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {Voucher.Domicile}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p className="margin-bottom-10">
                                            <strong>TEST SCHEDULE</strong>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '18%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Day and Date
                                                        </strong>
                                                    </th>
                                                    <td
                                                        style={{
                                                            width: '20%',
                                                        }}
                                                    >
                                                        {
                                                            infoData.ADMIT_CARD_TEST_DATE
                                                        }
                                                    </td>
                                                    <th>
                                                        <strong>
                                                            Reporting Time
                                                        </strong>
                                                    </th>
                                                    <td>
                                                        {
                                                            infoData.REPORTING_TIME
                                                        }
                                                    </td>
                                                    <th>
                                                        <strong>
                                                            Test Start Time
                                                        </strong>
                                                    </th>
                                                    <td>
                                                        {infoData.TEST_TIME}
                                                    </td>
                                                    <th>
                                                        <strong>
                                                            Test Duration
                                                        </strong>
                                                    </th>
                                                    <td>
                                                        {infoData.DURATION}{' '}
                                                        Hours
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table
                                            className="table table-bordered"
                                            style={{ marginTop: -1 }}
                                        >
                                            <tbody>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '18%',
                                                        }}
                                                    >
                                                        Test center location
                                                    </th>
                                                    <td>
                                                        Peoples University of
                                                        Medical & Health Science
                                                        for Women
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="margin-bottom-10">
                                            <strong>
                                                INSTRUCTIONS FOR ENTRY TEST
                                                CANDIDATES
                                            </strong>
                                        </p>
                                        <ul className="size-11">
                                            <li>
                                                Please bring
                                                <strong
                                                    style={{
                                                        paddingLeft: 5,
                                                        paddingRight: 5,
                                                    }}
                                                >
                                                    print out
                                                </strong>
                                                of Admit Card, Original
                                                CNIC/B.Form.
                                            </li>
                                            <li>
                                                Without above mentioned
                                                documents no candidate shall be
                                                allowed to sit in entry test.
                                            </li>
                                            <li>
                                                No Candidate shall be allowed to
                                                sit in Entry test after 15
                                                minutes of start of test.
                                            </li>

                                            <li>
                                                Mobile phones, Programmable /
                                                Scientific Calculators, digital
                                                watches or any other electronic
                                                gadgets or devices are strictly
                                                prohibited.
                                            </li>
                                            <li>
                                                Bring black ball point, Pencil /
                                                Eraser and sanitizer in clear
                                                pouch along with water bottle.
                                            </li>
                                            <li>
                                                The University may not have
                                                sufficient facility to keep your
                                                personal belongings.
                                            </li>
                                            <li>
                                                No candidate without mask shall
                                                be allowed to enter test venue.
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p>
                                            <strong>DISCLAIMER</strong>
                                        </p>
                                        <ul className="size-11">
                                            <li>
                                                Forgury / Misreporting of any
                                                data on the form submitted to
                                                University may cause in the
                                                denial and disqualification from
                                                interview and admission at the
                                                PUMS University. There shall be
                                                no refund of any sort in such
                                                case.
                                            </li>
                                        </ul>
                                        <Barcode
                                            displayValue={false}
                                            height={40}
                                            value={Voucher.FormID}
                                            marginTop={-10}
                                        />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

const Form_Card = styled(Admit_Card)`
    .margin-bottom-6 {
        margin-bottom: 6px !important;
    }
    .text-center {
        text-align: center;
    }
    .table-bordered {
        border: 1px solid #ddd;
    }
    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 0px;
    }
    .table > tbody > tr > td,
    .table > tbody > tr > th,
    .table > tfoot > tr > td,
    .table > tfoot > tr > th,
    .table > thead > tr > td,
    .table > thead > tr > th {
        padding: 4px;
        line-height: 1.42857143;
        vertical-align: top;
        border-top: 1px solid #ddd;
        white-space: nowrap;
    }
    .table tr > th {
        background: #f4f4f4;
    }
    th {
        text-align: left;
    }
    table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    .margin-bottom-10 {
        margin-bottom: 10px !important;
        margin-top: 15px;
        margin-left: 4px;
    }
    p {
        margin: 0 0 10px;
    }
    div.row > div img.img-responsive {
        width: 100%;
    }
    img.img-responsive {
        display: inline-block;
    }
    .thumbnail a > img,
    .thumbnail > img {
        display: block;
        max-width: 100%;
        height: auto;
    }
    audio,
    canvas,
    img,
    video {
        vertical-align: middle;
    }
    img {
        border: 0;
        vertical-align: top;
    }
    .padding-3 {
        padding: 3px !important;
    }
    .size-11 {
        font-size: 13px !important;
        line-height: 20px !important;
    }
    .alert {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .text-center {
        text-align: center;
    }
    body {
        color: black;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 14px;
        line-height: 1.5;
    }
    b,
    strong {
        font-weight: bold;
        font-size: 14px;
    }

    pre,
    .alert,
    .panel,
    .navbar-toggle,
    .btn {
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
    .panel {
        margin-bottom: 30px;
    }
    .panel-primary {
        border-color: #337ab7;
    }
    .panel {
        background-color: #fff;
        border: 1px solid transparent;
    }
    .table-bordered {
        border: 1px solid #ddd;
    }
    .table {
        width: 100%;
        max-width: 100%;
    }
    .table-bordered > tbody > tr > td,
    .table-bordered > tbody > tr > th,
    .table-bordered > tfoot > tr > td,
    .table-bordered > tfoot > tr > th,
    .table-bordered > thead > tr > td,
    .table-bordered > thead > tr > th {
        border: 1px solid #ddd;
    }
    .Form {
        padding-top: 0px;
        padding-left: 40px;
        padding-bottom: 0px;
        padding-right: 40px;
        @media print {
            @page {
                size: landscape;
            }
        }
    }
`

const OfferLetterView = ({
    className,
    LetterInfo,
    ProgramFaculty,
    infoData,
}) => {
    console.log(LetterInfo, 'OfferLetterView')
    return (
        <div className={className}>
            <div className="Form">
                <table width="100%" height="100%">
                    <tr id="middle">
                        <td width="100%" height="100%">
                            <table className="panel panel-primary" width="100%">
                                <tr>
                                    <td>
                                        <table
                                            className="table table-bordered"
                                            style={{
                                                border: 0,
                                                // backgroundColor: 'red',
                                                borderStyle: 'solid',
                                                borderColor: 'white',
                                            }}
                                        >
                                            <tbody>
                                                <tr>
                                                    <td
                                                        className="text-center"
                                                        style={{
                                                            textAlign: 'left',
                                                            paddingTop: 10,
                                                            border: 0,
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                    >
                                                        <img
                                                            style={{
                                                                paddingTop: 5,
                                                            }}
                                                            width="105px"
                                                            height="110px"
                                                            src="https://raw.githubusercontent.com/syedbasitali30/Aror_Backend/main/university-logo-transparent.png"
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: 'center',
                                                            paddingTop: 30,
                                                            fontSize: 15,
                                                            fontWeight: 700,
                                                            border: 0,
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                    >
                                                        <h4
                                                            style={{
                                                                marginBottom: 20,
                                                                marginTop: -5,
                                                            }}
                                                        >
                                                            Peoples University
                                                            of Medical & Health
                                                            Science for Women
                                                        </h4>
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    '#7f6000',
                                                                color: 'white',
                                                                padding:
                                                                    '10px 30px',
                                                                display:
                                                                    'inline-block',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            ADMISSIONS OFFER
                                                            LETTER Fall
                                                            2022-2023
                                                        </span>
                                                    </td>
                                                    <td
                                                        className="text-center"
                                                        style={{
                                                            textAlign: 'right',
                                                            paddingTop: 10,
                                                            border: 0,
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                    >
                                                        <img
                                                            style={{
                                                                height: 100,
                                                                width: 100,
                                                                marginTop: 5,
                                                            }}
                                                            src={`https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png?20091205084734`}
                                                            alt="Profile"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr></tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <hr />
                                <hr style={{ marginTop: -2 }} />
                                <tr>
                                    <td>
                                        <table
                                            className="table"
                                            style={
                                                {
                                                    // textAlign: 'end',
                                                }
                                            }
                                        >
                                            {/* <br /> */}
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{
                                                            border: 0,
                                                            borderStyle:
                                                                'solid',
                                                        }}
                                                    >
                                                        <strong
                                                            style={{
                                                                paddingRight: 5,
                                                            }}
                                                        >
                                                            Form No:{' '}
                                                            {LetterInfo.FormID}
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '10%',
                                                        }}
                                                    >
                                                        <strong>Name:</strong>
                                                    </th>
                                                    <td
                                                        style={{
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {LetterInfo.S_name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '10%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Father's Name:
                                                        </strong>
                                                    </th>
                                                    <td
                                                        style={{
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {LetterInfo.F_Name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '10%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Address:
                                                        </strong>
                                                    </th>
                                                    <td>
                                                        {LetterInfo.C_Address}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '10%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Mobile Number:
                                                        </strong>
                                                    </th>
                                                    <td>
                                                        {' '}
                                                        {LetterInfo.S_Contact}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p className="margin-bottom-10">
                                            <div
                                                style={{
                                                    flexDirection: 'row',
                                                    display: 'flex',
                                                }}
                                            >
                                                <strong
                                                    style={{
                                                        paddingTop: 2,
                                                    }}
                                                >
                                                    SUBJECT:
                                                </strong>
                                                <div
                                                    style={{
                                                        marginLeft: 20,
                                                    }}
                                                >
                                                    <strong>
                                                        <u
                                                            style={{
                                                                textTransform:
                                                                    'uppercase',
                                                            }}
                                                        >
                                                            PROVISIONAL
                                                            ADMISSION TO{' '}
                                                            {
                                                                LetterInfo.ProgramTitle
                                                            }{' '}
                                                            FALL 2022 PROGRAM @
                                                            Peoples University
                                                            of Medical & Health
                                                            Science for Women
                                                        </u>
                                                    </strong>
                                                </div>
                                            </div>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="margin-bottom-10">
                                            <strong>Dear Student,</strong>
                                            <div>
                                                <br />
                                                <td>
                                                    Congratualtions, we are
                                                    pleased to inform you that
                                                    you are hereby offered
                                                    provisional admission to the
                                                    PUMS University of Art,
                                                    Architecture, Design and
                                                    Heritage Sindh for the
                                                    Following study program:
                                                </td>
                                            </div>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '15%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Program of study:
                                                        </strong>
                                                    </th>
                                                    <td>
                                                        {
                                                            LetterInfo.ProgramTitle
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '15%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Department:
                                                        </strong>
                                                    </th>
                                                    <td>{ProgramFaculty}</td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '15%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Mode of Admission:
                                                        </strong>
                                                    </th>
                                                    <td>Regular</td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style={{
                                                            width: '15%',
                                                        }}
                                                    >
                                                        <strong>
                                                            Start of Program:
                                                        </strong>
                                                    </th>
                                                    <td>
                                                        {
                                                            infoData.CLASS_DATE_START
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className="margin-bottom-10">
                                            <strong>
                                                You are required to
                                                submit/furnish following
                                                documents
                                            </strong>
                                        </p>
                                        <ul className="size-11">
                                            <li>
                                                Submit original paid fee challan
                                                in Admission office on or before{' '}
                                                <b style={{ fontSize: 12 }}>
                                                    {
                                                        infoData.OFFER_CHALLAN_END_DATE
                                                    }{' '}
                                                    COD
                                                </b>
                                            </li>
                                            <li>
                                                Submit duly attested copies of
                                                all Academics Documents,
                                                CNIC/B-form, Domicile & PRC.
                                            </li>
                                            <li>
                                                Submit Original{' '}
                                                <b> HSC MarkSheet.</b>
                                            </li>

                                            <li>
                                                Submit duly filled
                                                <b> Registration form.</b>
                                            </li>
                                            <li>
                                                Submit duly filled
                                                <b> Enrollment form.</b>
                                            </li>
                                            <li>
                                                Submit duly filled{' '}
                                                <b> ID Card Performa.</b>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p>
                                            <strong>Note:</strong>
                                        </p>

                                        <p style={{ marginTop: -5 }}>
                                            Registration Form, Enrollment Form,
                                            ID Card Performa and Fee Challan can
                                            be downloaded from Admission portal
                                        </p>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p>
                                            <strong>
                                                We are looking forward to your
                                                acceptance of this offer.
                                            </strong>
                                        </p>
                                        <br />
                                        <br />
                                        <p>
                                            <strong>
                                                Admission Office
                                                <br />
                                                Peoples University of Medical &
                                                Health Science for Women
                                            </strong>
                                        </p>
                                        <hr />
                                        <hr style={{ marginTop: -2 }} />
                                        {/* <div
                                            style={{
                                                display: 'flex',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <td style={{ fontSize: 14 }}>
                                                Email:
                                                admissions.aror@gmail.com |
                                                Tel: 021-837487682
                                            </td>
                                        </div> */}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

const OfferLetter_Print = styled(OfferLetterView)`
    .margin-bottom-6 {
        margin-bottom: 6px !important;
    }
    hr.new4 {
        border: 1px solid red;
    }
    .text-center {
        text-align: center;
    }
    .table-bordered {
        border: 0px solid;
    }
    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 0px;
    }
    .table > tbody > tr > td,
    .table > tbody > tr > th,
    .table > tfoot > tr > td,
    .table > tfoot > tr > th,
    .table > thead > tr > td,
    .table > thead > tr > th {
        padding: 4px;
        line-height: 1.42857143;
        vertical-align: top;
        border-top: 1px solid #ddd;
        white-space: nowrap;
    }
    .table tr > th {
        background: #fff;
    }
    th {
        text-align: left;
    }
    table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    .margin-bottom-10 {
        margin-bottom: 10px !important;
        margin-top: 15px;
        margin-left: 4px;
    }
    p {
        margin: 0 0 10px;
    }
    div.row > div img.img-responsive {
        width: 100%;
    }
    img.img-responsive {
        display: inline-block;
    }
    .thumbnail a > img,
    .thumbnail > img {
        display: block;
        max-width: 100%;
        height: auto;
    }
    audio,
    canvas,
    img,
    video {
        vertical-align: middle;
    }
    img {
        border: 0;
        vertical-align: top;
    }
    .padding-3 {
        padding: 3px !important;
    }
    .size-11 {
        font-size: 13px !important;
        line-height: 20px !important;
    }
    .alert {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .text-center {
        text-align: center;
    }
    body {
        color: black;
        font-family: 'Open Sans', Arial, Times New Roman, Serif;
        font-size: 14px;
        line-height: 1.5;
    }
    b,
    strong {
        font-weight: bold;
        font-size: 14px;
    }

    pre,
    .alert,
    .panel,
    .navbar-toggle,
    .btn {
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
    .panel {
        margin-bottom: 30px;
    }
    .panel-primary {
        border-color: #337ab7;
    }
    .panel {
        background-color: #fff;
        border: 1px solid transparent;
    }
    .table-bordered {
        border: 0px solid;
    }
    .table {
        width: 100%;
        max-width: 100%;
    }
    .table-bordered > tbody > tr > td,
    .table-bordered > tbody > tr > th,
    .table-bordered > tfoot > tr > td,
    .table-bordered > tfoot > tr > th,
    .table-bordered > thead > tr > td,
    .table-bordered > thead > tr > th {
        border: 1px solid #fff;
    }
    .Form {
        padding-top: 0px;
        padding-left: 40px;
        padding-bottom: 0px;
        padding-right: 40px;
        @media print {
            @page {
                size: portrait;
            }
        }
    }
`

const ChallanPrint = ({ className, LetterInfo, infoData, ProgramFee }) => {
    const arr = [
        { name: 'Bank Copy' },
        { name: 'University Copy By Bank' },
        { name: 'Student Copy' },
        { name: 'University Copy' },
    ]
    return (
        <div id="pdf" className={className}>
            <table className="print" width="100%" height="100%">
                <tbody>
                    <tr id="middle">
                        {arr.map((item, index) => (
                            <td key={index} width="25%" height="100%">
                                <table
                                    className="panel panel-primary"
                                    width="95%"
                                >
                                    <tbody>
                                        <tr>
                                            <td
                                                className="text-center"
                                                style={{
                                                    textAlign: 'center',
                                                    paddingTop: 10,
                                                }}
                                            >
                                                <img
                                                    width="100"
                                                    className="img-responsive"
                                                    src={ImageBase64.IMAGE_UNI}
                                                    alt="BNBWU Logo"
                                                    crossOrigin="anonymous"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                className="text-center"
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <strong>{item.name}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h6 className="text-center margin-bottom-6">
                                                    <strong className="text-center margin-bottom-6">
                                                        ADMISSION FEE VOUCHER
                                                        Fall 2022-2023
                                                    </strong>
                                                </h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    border: 0,
                                                                }}
                                                            >
                                                                <strong>
                                                                    Form#
                                                                </strong>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: 0,
                                                                }}
                                                            >
                                                                {
                                                                    LetterInfo.FormID
                                                                }
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: 0,
                                                                    fontSize:
                                                                        '12px',
                                                                }}
                                                            >
                                                                <strong>
                                                                    Issue Date
                                                                </strong>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    border: 0,
                                                                }}
                                                            >
                                                                {moment().format(
                                                                    'DD-MM-YYYY'
                                                                )}
                                                                {/* {moment().format(
                                                                    'DD-MM-YYYY'
                                                                )} */}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    width: '30%',
                                                                }}
                                                            >
                                                                <strong>
                                                                    Name
                                                                </strong>
                                                            </th>
                                                            <td
                                                                style={{
                                                                    textTransform:
                                                                        'uppercase',
                                                                }}
                                                            >
                                                                {
                                                                    LetterInfo.S_name
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    width: '30%',
                                                                }}
                                                            >
                                                                <strong>
                                                                    Father's
                                                                    Name
                                                                </strong>
                                                            </th>
                                                            <td
                                                                style={{
                                                                    textTransform:
                                                                        'uppercase',
                                                                }}
                                                            >
                                                                {
                                                                    LetterInfo.F_Name
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    width: '30%',
                                                                }}
                                                            >
                                                                <strong>
                                                                    Program
                                                                </strong>
                                                            </th>
                                                            <td
                                                                style={{
                                                                    textTransform:
                                                                        'uppercase',
                                                                }}
                                                            >
                                                                {
                                                                    LetterInfo.ProgramTitle
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="text-center">
                                                    <img
                                                        width="40"
                                                        height="35"
                                                        src={
                                                            ImageBase64.IMAGE_BANK
                                                        }
                                                    />
                                                </div>
                                                <h6 className="text-center margin-bottom-6">
                                                    <strong>
                                                        ABL A/C-0010098089020032
                                                    </strong>
                                                    <br />
                                                    The PUMS University
                                                    Collection Account
                                                </h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th>Tution Fee</th>
                                                            <td>
                                                                {
                                                                    ProgramFee.Tution_Fee
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Admission
                                                                Processing Fee
                                                                One Time
                                                            </th>
                                                            <td>
                                                                {
                                                                    ProgramFee.Admission_Fee
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Annual
                                                                Registration Fee
                                                            </th>
                                                            <td>
                                                                {
                                                                    ProgramFee.Annual_Fee
                                                                }
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <th>
                                                                Security(Refundable)
                                                            </th>
                                                            <td>
                                                                {
                                                                    ProgramFee.Security
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Student Club Fee
                                                            </th>
                                                            <td>
                                                                {
                                                                    ProgramFee.Student_Club_Fee
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Transport Fee
                                                            </th>
                                                            <td>
                                                                {
                                                                    ProgramFee.Transport_Fee
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>TOTAL</th>
                                                            <td>
                                                                {
                                                                    ProgramFee.TOTAL
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p
                                                    className="margin-bottom-10"
                                                    style={{
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    <strong>
                                                        Due Date / Validity
                                                        Date:{' '}
                                                    </strong>
                                                    {
                                                        infoData.OFFER_CHALLAN_END_DATE
                                                    }
                                                </p>
                                                <p
                                                    className="margin-bottom-10"
                                                    // style={{ marginLeft: 12 }}
                                                >
                                                    <strong>
                                                        PAYMENT TERMS
                                                    </strong>
                                                </p>
                                                <ul className="size-11">
                                                    <li>
                                                        Cheques are unacceptable
                                                    </li>
                                                    <li>
                                                        After Challan Expiry
                                                        please contact Finance
                                                        Department for new
                                                        challan
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const Challan = styled(ChallanPrint)`
    .print {
        @media print {
            @page {
                size: landscape;
            }
        }
    }

    .margin-bottom-6 {
        margin-bottom: 6px !important;
    }

    .text-center {
        text-align: center;
    }

    .table-bordered {
        border: 1px solid #ddd;
    }

    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 10px;
    }

    .table > tbody > tr > td,
    .table > tbody > tr > th,
    .table > tfoot > tr > td,
    .table > tfoot > tr > th,
    .table > thead > tr > td,
    .table > thead > tr > th {
        padding: 4px;
        line-height: 1.42857143;
        vertical-align: top;
        border-top: 1px solid #ddd;
        white-space: nowrap;
    }

    .table tr > th {
        background: #f4f4f4;
    }

    th {
        text-align: left;
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }

    .margin-bottom-10 {
        margin-bottom: 10px !important;
    }

    p {
        margin: 0 0 10px;
    }

    div.row > div img.img-responsive {
        width: 100%;
    }

    img.img-responsive {
        display: inline-block;
    }

    .thumbnail a > img,
    .thumbnail > img {
        display: block;
        max-width: 100%;
        height: auto;
    }

    audio,
    canvas,
    img,
    video {
        vertical-align: middle;
    }

    img {
        border: 0;
        vertical-align: top;
    }

    .padding-3 {
        padding: 3px !important;
    }

    .size-11 {
        font-size: 11px !important;
        line-height: 15px !important;
    }

    .alert {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    .text-center {
        text-align: center;
    }

    body {
        color: #333;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        font-size: 10.5px;
        line-height: 1.5;
    }

    b,
    strong {
        font-weight: 700;
        font-size: 14px;
    }
    h6 {
        font-size: 10px;
        font-weight: 700;
        padding-top: 10px;
    }

    #middle .panel-primary,
    #middle1 .panel-primary {
        border-color: #cccccc !important;
    }

    pre,
    .alert,
    .panel,
    .navbar-toggle,
    .btn {
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }

    .panel {
        margin-bottom: 30px;
        margin-left: 10px;
    }

    .panel-primary {
        border-color: #337ab7;
    }

    .panel {
        margin-bottom: 20px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    }

    .table-bordered {
        border: 1px solid #ddd;
    }

    .table {
        width: 100%;
        max-width: 100%;
    }

    .table-bordered > tbody > tr > td,
    .table-bordered > tbody > tr > th,
    .table-bordered > tfoot > tr > td,
    .table-bordered > tfoot > tr > th,
    .table-bordered > thead > tr > td,
    .table-bordered > thead > tr > th {
        border: 1px solid #ddd;
        font-size: 12px;
    }
`

export default { Form, Form_Card, OfferLetter_Print, Challan }
