import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
    return (
        <div>
            {/* Payroll Master */}
            <div className="card"  >

                {/* Payroll Master User Rights Start Here */}

                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h5 >Payroll Master</h5>
                </div>
                <div className="card-body">
                    <div className="row" >
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <Link to="/Home/InpatientEditnew" className="list-group-item pt-1 pb-1">Indicator New</Link>
                                <Link to="/Home/InitialAssesmentNurseNew" className="list-group-item pt-1 pb-1">Initial Assessment Nurse New</Link>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* User Management Start Here */}

                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h5 >User Management</h5>
                </div>

                <div className="card-body">
                    <div className="row" >

                    </div>
                </div>

                {/* Another User rights Start Here */}

            </div>

        </div>
    )
}

export default Settings
