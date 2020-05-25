import React from 'react';
import cn from 'classnames';
import s from './Modal.module.sass';
import PreloaderSmall from "../PreloaderSmall/PreloaderSmall";
import Overlay from "../Overlay/Overlay";
import show from "../../../utils/animations/show";
import hide from "../../../utils/animations/hide";


/* Modal windows that can be without buttons, with 1 resolve/reject button or 2 buttons */
/* Made with class component because of show-animation in beginning and loading state inside
(when state in func have changed component rerenders and begin show-animation again) */

class Modal extends React.PureComponent{

    state = {
        text: this.props.text || 'Are you sure?',
        buttonSuccessText: this.props.buttonSuccessText || 'Ok',
        buttonRejectText: this.props.buttonRejectText || '',

        callbackResolve: this.props.callbackResolve || null,
        callbackReject: this.props.callbackReject || null,
        callbackCancel: this.props.callbackCancel || null,

        modal: null,
        isLoading: false,
    }


    componentDidMount() {
        this.setState({
            modal: document.getElementsByClassName(s.modalContainer)[0]
        }, () => {
            show(this.state.modal);
        });
    }




    cancelModal = () => {
        this.setState({
            isLoading: true
        }, async () => {
            if(this.props.callbackCancel){
                await this.props.callbackCancel();
            }
            hide(this.state.modal, this._closeModalCallback);
        });
    }

    resolveModal = async () => {
        this.setState({
            isLoading: true
        });
        if(this.state.callbackResolve){
            await this.state.callbackResolve()
        }
        hide(this.state.modal, this._closeModalCallback);
    }

    rejectModal = async () => {
        this.setState({
            isLoading: true
        });
        if(this.state.callbackReject){
            await this.state.callbackReject()
        }
        hide(this.state.modal, this._closeModalCallback);
    }

    _closeModalCallback = () => {
        this.props.setIsOpen(false)

        let newState = this.state.modal;
        newState.style.display = 'none';
    }





    render(){
        return (
            <div className={s.modalContainer}>
                <Overlay onClick={this.cancelModal} />
                <div className={s.modal}>
                    <span>{this.state.text}</span>
                    <div className={s.buttons}>

                        {!!this.state.isLoading &&
                            <PreloaderSmall />
                        }

                        {!!this.state.buttonSuccessText && !this.state.isLoading &&
                            <div onClick={this.resolveModal} className={cn('button', 'button-success')}>{this.state.buttonSuccessText}</div>
                        }

                        {!!this.state.buttonRejectText && !this.state.isLoading &&
                            <div onClick={this.rejectModal} className={cn('button', 'button-normal')}>{this.state.buttonRejectText}</div>
                        }

                    </div>
                </div>
            </div>
        );
    }

}



export default Modal;