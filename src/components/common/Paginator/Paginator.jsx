import React from "react";
import s from './Paginator.module.sass'
import {NavLink} from "react-router-dom";



const Paginator = React.memo(({pageLink, totalElementsCount, onPageLimit, currentPage, ...props}) => {



    let pageButtonCreate = (pageId) => {
        return (
            <NavLink
                    key={pageId}
                    to={`${pageLink}?page=${pageId}&limit=${onPageLimit}`}
                    className={currentPage === pageId ? s.selected : ''}
            >{pageId}</NavLink>
        )
    }

    let nextButtonCreate = (pageId) => {
        return (
            <NavLink
                key={'next page'}
                to={`${pageLink}?page=${pageId}&limit=${onPageLimit}`}
                className={s.nextButton}
            >Next</NavLink>
        )
    }
    let prevButtonCreate = (pageId) => {
        return (
            <NavLink
                key={'prev page'}
                to={`${pageLink}?page=${pageId}&limit=${onPageLimit}`}
                className={s.prevButton}
            >Prev</NavLink>
        )
    }

    let pageDelimiterCreate = (pageId) => {
        return (
            <span key={pageId}>...</span>
        )
    }




    let pagesCount = Math.ceil(totalElementsCount/onPageLimit)
    let pages = [];




    if(pagesCount > 1){

        // First pages mode with 'Next page'
        if(currentPage <= 3 ){
            if(currentPage !== 1) {
                pages.push(prevButtonCreate(currentPage - 1));
            }
            for(let i = 1; i < 6; i++){
                pages.push(pageButtonCreate(i));
            }
            pages.push(pageDelimiterCreate('delimeter'));
            pages.push(pageButtonCreate(pagesCount));
            pages.push(nextButtonCreate(currentPage+1));

        // Middle pages mode with 'Next page' and 'Prev page'
        }else if(currentPage > 3 && currentPage <= pagesCount-3){

            pages.push(prevButtonCreate(currentPage-1));
            pages.push(pageButtonCreate(1));
            pages.push(pageDelimiterCreate('delimeter-1'));
            pages.push(pageButtonCreate(currentPage-1));
            pages.push(pageButtonCreate(currentPage));
            pages.push(pageButtonCreate(currentPage+1));
            pages.push(pageDelimiterCreate('delimeter-2'));
            pages.push(pageButtonCreate(pagesCount));
            pages.push(nextButtonCreate(currentPage+1));

        // Last pages mode with 'Prev page'
        }else if(currentPage >= pagesCount-2 && currentPage <= pagesCount){

            pages.push(prevButtonCreate(currentPage-1));
            pages.push(pageButtonCreate(1));
            pages.push(pageDelimiterCreate('delimeter'));
            for(let i = pagesCount-4; i <= pagesCount; i++){
                pages.push(pageButtonCreate(i));
            }
            if(currentPage !== pagesCount){
                pages.push(nextButtonCreate(currentPage+1));
            }


        }

    }


    return (
        <div className={s.pagination}>
            {pages}
        </div>
    )
})

export default Paginator;