
import React, { Fragment, useEffect, useState } from 'react'

import TextInput from 'src/views/Component/TextInput'

import OutletSelect from 'src/views/CommonCode/OutletSelect'
import { ImSearch } from "react-icons/im";
import { IconButton } from '@mui/material';
import { Table } from 'react-bootstrap'
import { axioslogin } from 'src/views/Axios/Axios'

import AcnopatientTable from './AcnopatientTable';
import moment from 'moment'

const Acnoverification = () => {

    const [monthval, Setmonthval] = useState({
        monthwise: ''
    })
    const {
        monthwise
    } = monthval

    // var frdate = (moment(monthwise).format("MM"));
    //getting data from the form 
    const updateFormData = async (e) => {
        const value = e.target.value
        Setmonthval({ ...monthval, [e.target.name]: value })
    }

    const [search, setSearch] = useState(false)


    const searchall = () => {
        setSearch(true)
    };

    return (
        <Fragment>
            <div className="card">

                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>ACNO Verification</h5>
                </div>
                <div className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3  pb-1">
                                {/* <Typography fontSize={16} noWrap={true} >Select Month</Typography> */}
                                <TextInput
                                    id="test"
                                    type="month"
                                    classname="form-control form-control-sm"
                                    Placeholder="Arrived Time"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={monthwise}
                                    name="monthwise"
                                // disabled={enable}
                                />
                            </div>
                            <div className="col-md-3 pb-1">
                                <OutletSelect
                                    style={{
                                        minHeight: 10,
                                        maxHeight: 27,
                                        paddingTop: 0,
                                        paddingBottom: 4,
                                    }}
                                />
                            </div>
                            <div className="col-md-1  col-sm-12">

                                <IconButton onClick={searchall}>
                                    < ImSearch size={22} />
                                </IconButton>
                            </div>
                            <div>
                                {search === true ? <AcnopatientTable frdate={moment(monthwise).format("MM")} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    )
}

export default Acnoverification
