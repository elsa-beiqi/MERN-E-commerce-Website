import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RefundSection from './RefundSection';

export default function Refund() {
    const [refunds, setrefunds] = useState([])
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/pm/allunapprovedrefunds`, { withCredentials: true })
            setrefunds(data);
            console.log(data)
        };
        fecthData();
    }, []);
    return (
        <>
            {refunds.map((refund) => (
                <div key={refund.invoiceID}>
                    <RefundSection approved={refund.approved} invoiceID={refund.invoiceID} PriceatPurchase={refund.PriceatPurchase} email={refund.email} onlineImageLink={refund.productID.onlineImageLink}
                        productDiscount={refund.productID.productDiscount} productPrice={refund.productID.productPrice} quantity={refund.quantity} productName={refund.productID.productName}
                        productSize={refund.productID.productSize}
                    />
                </div>
            ))}
        </>
    );
}
