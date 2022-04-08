import React from "react"

export const SearchBox = ({onChange, value}) => {

    return (
        <>
        <input type='text' onChange={onChange} value={value} ></input>
        </>
    )
}
