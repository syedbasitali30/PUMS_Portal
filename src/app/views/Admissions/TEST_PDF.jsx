import React, { useState } from 'react'
import { PDFDocument, Page } from 'pdf-lib'

const DynamicPDF = () => {
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')

    const handleSubmit = async () => {
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const existingPdfBytes = await fetch(url).then((res) =>
            res.arrayBuffer()
        )
        var bytes = new Uint8Array(existingPdfBytes)
        const pdfDoc = await PDFDocument.load(bytes)
        const firstPage = pdfDoc.getPages()[0]

        // Dynamically insert data into the PDF
        // const nameField = firstPage.getTextByText('Name: ')
        // setText(name)

        // const companyField = firstPage.getTextByText('Company: ')
        // setText(company)

        // Generate and download the updated PDF
        const pdfBytes = await pdfDoc.saveAsBuffer()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const downloadLink = document.createElement('a')
        downloadLink.href = URL.createObjectURL(blob)
        downloadLink.download = 'dynamic_pdf.pdf'
        downloadLink.click()
    }

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <input
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
            />
            <button onClick={handleSubmit}>Generate PDF</button>
        </div>
    )
}

export default DynamicPDF
