import React from "react"
import s from './Paginator.module.sass'
import {NavLink} from "react-router-dom"


type PropsType = {
    pageLink: string
    totalElementsCount: number
    onPageLimit: number
    currentPage: number
}


const Paginator: React.FC<PropsType> = React.memo(({pageLink, totalElementsCount, onPageLimit, currentPage}) => {

    const buttonsCount = Math.ceil(totalElementsCount/onPageLimit)
    
    const modeSwitcher = () => {
        if(buttonsCount > 1){
            if(currentPage <= 3 ){
                return activePageBeginningMode()
            }else if(currentPage > 3 && currentPage <= buttonsCount-3){
                return activePageMiddleMode()
            }else if(currentPage >= buttonsCount-2 && currentPage <= buttonsCount){
                return activePageEndMode()
            }
        }
    }

    const activePageBeginningMode = () => {
        let buttons = []
        for(let i = 1; i < 6; i++){
            buttons.push(pageButtonCreate(i))
        }
        return (
            <>
                {currentPage !== 1 &&
                    prevButtonCreate(currentPage - 1)
                }
                {buttons}
                {pageDelimiterCreate('delimeter')}
                {pageButtonCreate(buttonsCount)}
                {nextButtonCreate(currentPage + 1)}
            </>
        )
    }

    const activePageMiddleMode = () => {
        return (
            <>
                {prevButtonCreate(currentPage-1)}
                {pageButtonCreate(1)}
                {pageDelimiterCreate('delimeter-1')}
                {pageButtonCreate(currentPage-1)}
                {pageButtonCreate(currentPage)}
                {pageButtonCreate(currentPage+1)}
                {pageDelimiterCreate('delimeter-2')}
                {pageButtonCreate(buttonsCount)}
                {nextButtonCreate(currentPage+1)}
            </>
        )
    }

    const activePageEndMode = () => {
        let buttons = []
        for(let i = buttonsCount-4; i <= buttonsCount; i++){
            buttons.push(pageButtonCreate(i))
        }
        return (
            <>
                {prevButtonCreate(currentPage-1)}
                {pageButtonCreate(1)}
                {pageDelimiterCreate('delimeter')}
                {buttons}
                {currentPage !== buttonsCount &&
                    nextButtonCreate(currentPage+1)
                }
            </>
        )
    }

    const pageButtonCreate = (pageId: number) => {
        return (
            <NavLink
                key={pageId}
                to={`${pageLink}?page=${pageId}&limit=${onPageLimit}`}
                className={currentPage === pageId ? s.selected : ''}
            >{pageId}</NavLink>
        )
    }

    const nextButtonCreate = (pageId: number) => {
        return (
            <NavLink
                key={'next page'}
                to={`${pageLink}?page=${pageId}&limit=${onPageLimit}`}
                className={s.nextButton}
            >Next</NavLink>
        )
    }

    const prevButtonCreate = (pageId: number) => {
        return (
            <NavLink
                key={'prev page'}
                to={`${pageLink}?page=${pageId}&limit=${onPageLimit}`}
                className={s.prevButton}
            >Prev</NavLink>
        )
    }

    const pageDelimiterCreate = (pageId: number | string) => {
        return (
            <span key={pageId}>...</span>
        )
    }



    return (
        <div className={s.pagination}>
            {modeSwitcher()}
        </div>
    )

})



export default Paginator