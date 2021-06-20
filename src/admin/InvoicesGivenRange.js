import React, { useState, useEffect } from 'react';
import '../CSS/sign.css';
import Axios from "axios";
import { Input } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';
import InvoiceSection from './invoice/InvoiceSection';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

export default function InvoicesGivenRange(props) {
    const [sd, setsd] = useState(1);
    const [sm, setsm] = useState(1);
    const [sy, setsy] = useState(2020);
    const [ed, seted] = useState(1);
    const [em, setem] = useState(1);
    const [ey, setey] = useState(2020);
    const [invoicez, setinvoicez] = useState([])
    const [dataz, setdataz] = useState([])
    const [labels, setdummy] = useState([])
    const [state, setstate] = useState([])
    const [revenue, setrevenue] = useState()
    const [profit, setprofit] = useState();
    const [loss, setloss] = useState()
    const [blob, setblob] = useState({
        labels: ['Week 1', 'Week 2', 'Week 3',
            'Week 4', 'Week 5'],
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    })
    const getchart = async () => {
        await axios.post(`sm/dates/total`, { startdateday: sd, startdatemonth: sm, startdateyear: sy, enddateday: ed, enddatemonth: em, enddateyear: ey }, { withCredentials: true })
            .then((response) => {
                setrevenue(response.data.total);
                setprofit(response.data.profit);
                setloss(response.data.loss);
                setdataz(response.data)
                setdummy(Array.from(Array(response.data.length).keys()))
                console.log(response.data);
                // setdataset({ label: Array.from(Array(response.data.length).keys()) });
                setstate({
                    labels: Array.apply(null, { length: response.data.weeklyTotal.length }).map(Number.call, Number),
                    datasets: [{
                        label: 'Revenue',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: response.data.weeklyTotal
                    }],
                })
                console.log({
                    datasets: {
                        label: 'Revenue',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: response.data.weeklyTotal
                    },
                    labels: Array.apply(null, { length: response.data.weeklyTotal.length }).map(Number.call, Number)

                })
            })
            .catch((error) => {
                alert(error.response.data);
                console.log(error);
            })

    }
    const getinvoice = async () => {
        getchart();
        await axios.post(`sm/dates`, { startdateday: sd, startdatemonth: sm, startdateyear: sy, enddateday: ed, enddatemonth: em, enddateyear: ey }, { withCredentials: true })
            .then((response) => {
                setinvoicez(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
                console.log(error);
            })
    }

    return (
        <>
            <div
                className={'re-section weneedmargin'}
            >
                <div className='containerRE' >
                    <div
                        className='row invoice-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div className='col'>
                            <div className='invoice-text-wrapper'>
                                <label className='formI-label'>Start Date</label>
                                <select value={sd} className='formI-input' onChange={(e) => setsd(e.target.value)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                    <option value={16}>16</option>
                                    <option value={17}>17</option>
                                    <option value={18}>18</option>
                                    <option value={19}>19</option>
                                    <option value={20}>20</option>
                                    <option value={21}>21</option>
                                    <option value={22}>22</option>
                                    <option value={23}>23</option>
                                    <option value={24}>24</option>
                                    <option value={25}>25</option>
                                    <option value={26}>26</option>
                                    <option value={27}>27</option>
                                    <option value={28}>28</option>
                                    <option value={29}>29</option>
                                    <option value={30}>30</option>
                                </select>
                            </div>

                            <div className='invoice-text-wrapper'>
                                <label className='formI-label'>Start Month</label>
                                <select value={sm} className='formI-input' onChange={(e) => setsm(e.target.value)}>
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </select>
                            </div>
                            <div className='invoice-text-wrapper'>
                                <label className='formI-label'>Start Year</label>
                                <select value={sy} className='formI-input' onChange={(e) => setsy(e.target.value)}>
                                    <option value={2020}>2020</option>
                                    <option value={2021}>2021</option>
                                </select>
                            </div>

                        </div>
                        <div className='colIN'>
                            <div className='invoice-text-wrapper'>
                                <label className='formI-label'>End Date</label>
                                <select value={ed} className='formI-input' onChange={(e) => seted(e.target.value)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                    <option value={16}>16</option>
                                    <option value={17}>17</option>
                                    <option value={18}>18</option>
                                    <option value={19}>19</option>
                                    <option value={20}>20</option>
                                    <option value={21}>21</option>
                                    <option value={22}>22</option>
                                    <option value={23}>23</option>
                                    <option value={24}>24</option>
                                    <option value={25}>25</option>
                                    <option value={26}>26</option>
                                    <option value={27}>27</option>
                                    <option value={28}>28</option>
                                    <option value={29}>29</option>
                                    <option value={30}>30</option>
                                </select>
                            </div>

                            <div className='invoice-text-wrapper'>
                                <label className='formI-label'>End Month</label>
                                <select value={em} className='formI-input' onChange={(e) => setem(e.target.value)}>
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </select>
                            </div>
                            <div className='invoice-text-wrapper'>
                                <label className='formI-label'>End Year</label>
                                <select value={ey} className='formI-input' onChange={(e) => setey(e.target.value)}>
                                    <option value={2020}>2020</option>
                                    <option value={2021}>2021</option>
                                </select>
                            </div>
                        </div>
                        <div className='colINB'>
                            <div className='invoice-text-wrapper'>
                                <div>
                                    <Button buttonSize='btn--medium' buttonColor='blue' className='shmolspace' onClick={getinvoice}>
                                        view invoices in given range
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div >
                </div >
            </div>
            <div
                className={'re-section weneedmargin'}
            >
                <div className='containerRE'>
                    <div
                        className='row invoice-row'
                        style={{
                            display: 'flex',
                            // flexDirection: 'row'
                        }}>
                        <div className='colSMOLBB'>
                            <div>
                                {console.log(state)}
                                {console.log(blob)}
                                <Line
                                    data={state}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Average Rainfall per month',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='invoice-text-wrapper'>

                                <p className={'invoice-subtitle-date dark'} >
                                    Revenue:  {revenue}
                                </p>
                                <p className={'invoice-subtitle-date  dark'} >
                                    Profit: {profit}
                                </p>
                                <p className={'invoice-subtitle-date  dark'} >
                                    Loss: {loss}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {invoicez.map((invoice) => (
                <div key={invoice._id}>
                    <InvoiceSection status={invoice.status} _id={invoice._id} name={invoice.name} address={invoice.address} city={invoice.city} country={invoice.country}
                        date={invoice.date} useremail={invoice.userEmail} products={invoice.products} total={invoice.total} IGN={true}
                    />
                </div>
            ))}
        </>
    )
}