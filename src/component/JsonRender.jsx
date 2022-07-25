import React from 'react'
import data from '../../forms/101/1.json';

const JsonRender = () => {

    const { "static": theadData, "dynamic": tbodyData } = data;

    return (
        <div>
            <table>
                {theadData.map(elem => {
                        
                })}
            </table>
        </div>
    )
}

export default JsonRender