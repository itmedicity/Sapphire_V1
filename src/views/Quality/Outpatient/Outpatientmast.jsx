import React, { Fragment } from 'react'
import OutPatientTableList from './OutPatientTableList';

const Outpatientmast = () => {
    return (
        <Fragment>
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Patient List</h5>
                </div>
                <div className="col-md-12">
                    <OutPatientTableList />
                </div>
            </div>
        </Fragment>

    )
}
export default Outpatientmast



