import React from 'react'
import {useState} from "react";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
        height: 20,
        width: '60%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }

    const fillerStyles = {
        heigth: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    )
}

const data = [
    {bgcolor: "#6a1b9a", completed: 50 },
];

function Progress_bar(){
    return (
        <div className="bar">
            {data.map((item, idx) => (
                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
            ))}
        </div>
    );
}

export default ProgressBar
