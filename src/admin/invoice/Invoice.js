import React, { useEffect, useState } from 'react';
import InvoiceSection from './InvoiceSection';
import './Invoice.css'
import axios from 'axios';

export default function Home() {
    const [invoicez, setinvoicez] = useState([])
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/pm/allinvoices`, { withCredentials: true })
            setinvoicez(data);
        };
        fecthData();
    }, [])

    return (
        <>
            {invoicez.map((invoice) => (
                <div key={invoice._id}>
                    <InvoiceSection status={invoice.status} _id={invoice._id} name={invoice.name} address={invoice.address} city={invoice.city} country={invoice.country}
                        date={invoice.date} useremail={invoice.userEmail} products={invoice.products} total={invoice.total} IGN={false}
                    />
                </div>
            ))}
        </>
    );
}

