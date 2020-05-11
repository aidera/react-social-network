import React from 'react';
import s from './Status.module.sass'

class Status extends React.Component {


    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {

        return (
            <div>
                {!this.state.editMode &&
                <div onDoubleClick={this.activateEditMode} className={s.statusBlock}>
                    {this.state.status || '------'}
                </div>
                }
                {this.state.editMode &&
                <div className={s.statusBlock}>
                    <input
                        onChange={this.onStatusChange}
                        autoFocus={true}
                        onBlur={this.deactivateEditMode}
                        type="text"
                        value={this.state.status}
                    />
                </div>
                }
            </div>
        )
    }

}

export default Status;