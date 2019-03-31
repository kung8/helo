import React from 'react';

const body={display:'flex',flexDirection:'column',alignItems:'center'}

export default function Loader({children,isLoaded}){
    return(
        <div style={body}>
            {isLoaded?children:<div className="loader"></div>}
        </div>
    )
}