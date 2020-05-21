import React from 'react';
import s from './Overlay.module.sass';

const Overlay = React.memo(({onClick, ...props}) => {
    return <div onClick={onClick} className={s.overlay} />
})

export default Overlay;