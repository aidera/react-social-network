import React from 'react'
import cn from 'classnames'
import s from './Modal.module.sass'
import PreloaderSmall from "../PreloaderSmall/PreloaderSmall"
import Overlay from "../Overlay/Overlay"
import show from "../../../utils/animations/show"
import hide from "../../../utils/animations/hide"


/* Modal windows that can be without buttons, with 1 resolve/reject button or 2 buttons */
/* Made with class component because of show-animation in beginning and loading state inside
(when state in func have changed component rerenders and begin show-animation again) */


type OwnPropsType = {
    text?: string | null
    buttonSuccessText?: string
    buttonRejectText?: string
    callbackResolve?: (() => void) | undefined
    callbackReject?: (() => void) | undefined
    callbackCancel?: (() => void) | undefined
    setIsOpen: (status: boolean) => void
    isOpen: boolean
}

type PropsType = OwnPropsType

type StateType = {
    text: string | null
    buttonSuccessText: string
    buttonRejectText: string | null
    callbackResolve: (() => void) | undefined
    callbackReject: (() => void) | undefined
    callbackCancel: (() => void) | undefined
    modal: HTMLElement | null
    isLoading: boolean

}




class Modal extends React.PureComponent<PropsType, StateType>{

    constructor(props: PropsType) {
        super(props)
        this.state = {
            text: this.props.text || 'Are you sure?',
            buttonSuccessText: this.props.buttonSuccessText || 'Ok',
            buttonRejectText: this.props.buttonRejectText || '',

            callbackResolve: this.props.callbackResolve,
            callbackReject: this.props.callbackReject,
            callbackCancel: this.props.callbackReject,

            modal: null,
            isLoading: false
        }
    }

    modalRef = React.createRef<HTMLDivElement>()

    componentDidMount() {
        const htmlElements = document.getElementsByClassName(s.modalContainer) as HTMLCollectionOf<HTMLElement>

        this.setState({
            modal: htmlElements[0]
        }, () => {
            if(this.state.modal !== null){
                show(this.state.modal)
            }
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(prevProps !== this.props){
            this.updateState()
        }
    }


    updateState = () =>{
        this.setState({
            text: this.props.text || 'Are you sure?',
            buttonSuccessText: this.props.buttonSuccessText || 'Ok',
            buttonRejectText: this.props.buttonRejectText || '',

            callbackResolve: this.props.callbackResolve,
            callbackReject: this.props.callbackReject,
            callbackCancel: this.props.callbackReject,
        })
    }


    cancelModal = () => {
        this.setState({
            isLoading: true
        }, async () => {
            if(this.props.callbackCancel){
                await this.props.callbackCancel()
            }
            if(this.state.modal !== null){
                hide(this.state.modal, this._closeModalCallback)
            }
        })
    }

    resolveModal = async () => {
        this.setState({
            isLoading: true
        })
        if(this.state.callbackResolve){
            await this.state.callbackResolve()
        }
        if(this.state.modal !== null){
            hide(this.state.modal, this._closeModalCallback)
        }
    }

    rejectModal = async () => {
        this.setState({
            isLoading: true
        })
        if(this.state.callbackReject){
            await this.state.callbackReject()
        }
        if(this.state.modal !== null){
            hide(this.state.modal, this._closeModalCallback)
        }
    }

    _closeModalCallback = () => {
        this.props.setIsOpen(false)

        let newState = this.state.modal
        if(newState !== null){
            newState.style.display = 'none'
        }

    }





    render(){
        return (
            <div ref={this.modalRef} className={s.modalContainer}>

                <Overlay onClick={this.cancelModal} />
                <div className={s.modal}>
                    <span>{this.state.text}</span>
                    <div className={s.buttons}>

                        {this.state.isLoading &&
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
        )
    }

}



export default Modal