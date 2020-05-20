import React from 'react';
import cn from 'classnames';
import s from './Modal.module.sass';
import anime from 'animejs';
import PreloaderSmall from "../PreloaderSmall/PreloaderSmall";


/* Modal windows that can be without buttons, with 1 resolve/reject button or 2 buttons */
/* Made with class component because of show-animation in beginning and loading state inside */

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
            this.showModal()
        });
    }


    /* Helpers */
    showModal = () => {
        anime({
            targets: this.state.modal,
            keyframes: [
                {opacity: 0},
                {opacity: 1}
            ],
            duration: 300,
            easing: 'linear',
            loop: false,
        });
    }

    closeModal = () => {
        anime({
            targets: this.state.modal,
            keyframes: [
                {opacity: 1},
                {opacity: 0}
            ],
            duration: 300,
            easing: 'linear',
            loop: false,
            complete: () => {
                this.props.setIsOpen(false)

                let newState = this.state.modal;
                newState.style.display = 'none';
            }
        });
    }




    /* Actions */
    cancelModal = () => {
        this.setState({
            isLoading: true
        }, async () => {
            if(this.props.callbackCancel){
                await this.props.callbackCancel();
            }
            this.closeModal();
        });
    }

    resolveModal = async () => {
        this.setState({
            isLoading: true
        });
        if(this.state.callbackResolve){
            await this.state.callbackResolve()
        }
        this.closeModal();
    }


    rejectModal = async () => {
        this.setState({
            isLoading: true
        });
        if(this.state.callbackReject){
            await this.state.callbackReject()
        }
        this.closeModal();
    }





    render(){
        return (
            <div className={s.modalContainer}>
                <div onClick={this.cancelModal} className={s.overlay} />
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