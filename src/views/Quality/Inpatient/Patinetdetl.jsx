import React, { Fragment } from 'react'
import './Patientdetl.css'

const Patinetdetl = () => {
    return (
        <Fragment>
            <div className="cards-set">
                <div className="card">
                    <div className="heading" />
                    <div className="content"><p>This is a text</p></div>
                </div>
                <div className="card2">
                    <div className="heading" style={{ backgroundColor: 'rgb(159 169 185)' }}><h1>Hello</h1></div>
                    <div className="content"><p>This is a text</p></div>
                </div>
                <div className="card">
                    <div className="heading" style={{ backgroundColor: '#c7c7c7' }} />
                    <div className="content"><p>This is a text</p></div>
                </div>
            </div>
        </Fragment>
    )
}

export default Patinetdetl
