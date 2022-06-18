import React from 'react'
import { useLocation } from 'react-router-dom';

export const ProductSearch = () => {

    let query = useQuery();


    return (
        <div>ProductSearch  {query.get("query")}</div>
    )
}



function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}