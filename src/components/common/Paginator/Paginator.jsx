import React from "react";
import s from './Paginator.module.sass'



const Paginator = React.memo(({currentPage, pagesCount, onPageChange, ...props}) => {


    let pageButtonCreate = (p) => {
        return <span
                    onClick={ (e) => { onPageChange(p) } }
                    key={p}
                    className={currentPage === p ? s.selected : ''}
                >{p}</span>
    }


    let pages = [];
    let maxPages = 8;


    if(pagesCount > 1){
        if(currentPage <= maxPages-3 ){
            for(let i = 1; i < maxPages; i++){
                pages.push(pageButtonCreate(i));
            }
            pages.push('...');
            pages.push(pageButtonCreate(pagesCount));
        }else if(currentPage > maxPages-3 && currentPage <= pagesCount-3){
            pages.push(pageButtonCreate(1));
            pages.push('...');
            pages.push(pageButtonCreate(currentPage-1));
            pages.push(pageButtonCreate(currentPage));
            pages.push(pageButtonCreate(currentPage+1));
            pages.push('...');
            pages.push(pageButtonCreate(pagesCount));
        }else if(currentPage >= pagesCount-2 && currentPage <= pagesCount){
            pages.push(pageButtonCreate(1));
            pages.push('...');
            for(let i = pagesCount-maxPages+2; i <= pagesCount; i++){
                pages.push(pageButtonCreate(i));
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