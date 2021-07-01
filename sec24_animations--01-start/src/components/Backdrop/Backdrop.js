import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    const cssClasess = ['Backdrop', props.show ? 'BackdropOpen' : 'BackdropClosed'];
    
    return <div className={cssClasess.join(' ')}></div>
};

export default backdrop;