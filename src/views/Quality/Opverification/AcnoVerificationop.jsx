import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { ImSearch } from "react-icons/im";
import TextInput from 'src/views/Component/TextInput'
import { Button, IconButton } from '@mui/material';
import moment from 'moment'
import AcnotableVerify from './AcnotableVerify';


//Table


const AcnoVerificationop = ({ update }) => {

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

    const searchall = async () => {
        setSearch(true)
    };

    return (
        <Fragment>
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Verification Ward Wise</h5>
                </div>
                <div className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3"></div>
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
                            <div className="col-md-1"></div>
                            <div className="col-md-3  col-sm-12">

                                <IconButton onClick={searchall}>
                                    < ImSearch size={22} />
                                </IconButton>
                                {/* <Button className="col-md-3 col-sm-12" color="secondary" align="center"
                                onClick={submitdataacno}
                            >
                                Approved </Button> */}
                            </div>
                            {/* <div className="col-md-1">
                                <Button className="col-md-3 col-sm-12" color="secondary" align="center"
                                    onClick={submitdataacno}
                                >
                                    Approved </Button>
                            </div> */}
                            <div className="col-md-5">
                                {/* {toaster === true ? <Pendingindictor /> : null} */}
                                {/* {toaster === true ? <Mandatoryindicator /> : null} */}
                            </div>
                            <div className="col-md-5">
                            </div>
                            <div>
                                { }
                                {search === true ? <AcnotableVerify frdate={moment(monthwise).format("MM")} Setmonthval={Setmonthval} /> : null}

                            </div>




                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    )
}

export default AcnoVerificationop