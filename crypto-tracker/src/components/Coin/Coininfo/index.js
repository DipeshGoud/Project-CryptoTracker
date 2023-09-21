import React, { useState } from 'react'
import './styles.css'

function Coininfo({ heading, desc }) {

    const shortDesc = desc.substring(0, 300) + "<span class='read-more'>Read More...</span>";
    const longDesc = desc + "<span class='read-more'>Read Less...</span>";

    const [showLongDesc, setShowLongDesc] = useState(false);

    return (
        <div className='dark-grey-wrapper-2'>
            <h2 className='coin-info-heading'>{heading}</h2>
            {desc.length > 300 ?
                <p
                    className="coin-info-desc"
                    dangerouslySetInnerHTML={{ __html: !showLongDesc ? shortDesc : longDesc }}
                    onClick={() => setShowLongDesc(!showLongDesc)}
                /> :
                <p className="coin-info-desc"
                    dangerouslySetInnerHTML={{ __html: !showLongDesc ? shortDesc : longDesc }}
                />
            }
        </div>
    )
}

export default Coininfo;
