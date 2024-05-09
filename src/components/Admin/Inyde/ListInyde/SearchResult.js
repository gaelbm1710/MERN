import React from 'react'
import "./SearchResult.scss"


export function SearchResult({ result }) {
    return (
        <div className='search-result'>
            <p>Folio: {result.folio}</p>
        </div>
    )
}
