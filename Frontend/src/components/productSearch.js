import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AppContext } from './contexts';

export const ProductSearch = () => {
    const { state } = useContext(AppContext)

    let query = useQuery();
    const productName = query.get("name")
    const minPrice = 0
    const maxPrice = 0

    // const [searchQueryURL, setSearchQueryURL] = useState({
    //     name: '',
    //     minPrice: 0,
    //     maxPrice: 0,
    //     categories: [],
    //     build: (searchQueryURL) => {
    //         var searchURL = '/search?'
    //         console.log(searchQueryURL.name)
    //         if (searchQueryURL.name.length > 0)
    //             searchURL += `name:'${searchQueryURL.name}'`
    //         if (searchQueryURL.minPrice > 0)
    //             searchURL += ` AND minPrice:${searchQueryURL.minPrice}`
    //         if (searchQueryURL.maxPrice > 0)
    //             searchURL += ` AND maxPrice:${searchQueryURL.maxPrice}`
    //         return searchURL
    //     }
    // })

    const buildQueryURL = () => {
        var queryURL = '?search=';
        if (productName?.length > 0) {
            queryURL += `name:'*${productName}*'`

            if (Number.isInteger(minPrice) && minPrice > 0)
                queryURL += ` AND price>${minPrice}`

            if (Number.isInteger(maxPrice) && maxPrice > 0)
                queryURL += ` AND price<${maxPrice}`
        }

        else if (Number.isInteger(minPrice) && minPrice > 0) {
            queryURL += `price>${minPrice}`
            if (Number.isInteger(maxPrice) && maxPrice > 0)
                queryURL += ` AND price<${maxPrice}`
        }

        else if (Number.isInteger(maxPrice) && maxPrice > 0)
            queryURL += `price<${maxPrice}`

        return queryURL

    }

    useEffect(() => {
        const queryURL = buildQueryURL();
        console.log(`/products${queryURL}`)
        fetch(`/products${queryURL}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state?.token
            }

        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                try
                const d = JSON.parse(r)
                console.log(r)
            })
        }, function (error) {
            console.log(error.message)
        })
    }, [state?.token, query])

    return (
        <div>ProductSearch {productName}</div>
    )
}



function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}