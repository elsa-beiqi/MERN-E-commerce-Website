import React from 'react';
import './BestSeller.css';
import { Link } from 'react-router-dom';

function BestSeller({
    img,
    alt,
    name,
    price,
    id,
    discount,
    productD,
}) {
    return (
        <>
            <div className='col-bs'>
                <div className='home__bs-img-wrapper'>
                    <Link to={`Product/${id}`}>
                        <img src={img} alt={alt} className='home__bs-img' />
                    </Link>
                </div>
                <div className='home__bs-text-wrapper'>
                    <p className={'home__bs-subtitle'}>
                        {name.substring(0, 23)}
                    </p>

                    {(discount) ?
                        <>
                            <div className="togezer">
                                <p className={'home__bs-subtitle op'}>
                                    ${price}
                                </p>
                                <span className="discount">{discount}%</span>
                            </div>
                            <p className={'home__bs-subtitle '}>
                                ${price}
                            </p>
                        </>
                        :
                        <p className={'home__bs-subtitle'}>
                            ${price}
                        </p>}

                </div>
            </div>
        </>
    );
}

export default BestSeller;