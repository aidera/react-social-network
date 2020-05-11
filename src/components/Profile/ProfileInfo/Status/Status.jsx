import React, {useEffect, useState} from 'react';
import s from './Status.module.sass'

const Status = React.memo(({status, updateUserStatus, ...props}) => {


    let [editMode, setEditMode] = useState(false);
    let [localStatus, setLocalStatus] = useState(status);


    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        updateUserStatus(localStatus)
    }

    const onStatusChange = (e) => {
        setLocalStatus(e.currentTarget.value);
    }

    useEffect(() => {
        setLocalStatus(status)
    }, [status])




    return (
        <div>
            {!editMode &&
            <div onDoubleClick={activateEditMode} className={s.statusBlock}>
                {status || '------'}
            </div>
            }
            {editMode &&
            <div className={s.statusBlock}>
                <input
                    onChange={onStatusChange}
                    autoFocus={true}
                    onBlur={deactivateEditMode}
                    type="text"
                    value={localStatus}
                />
            </div>
            }
        </div>
    )


})

export default Status;