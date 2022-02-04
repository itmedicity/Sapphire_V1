import React, { Fragment, useEffect, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import OutletSelect from 'src/views/CommonCode/OutletSelect'
import { ImSearch } from "react-icons/im";
import { IconButton } from '@mui/material';
import moment from 'moment'
import Qualityverifitable from './Qualityverifitable';

const Qualityverifcation = () => {

    const [search, setSearch] = useState(false)


    const searchall = () => {
        setSearch(true)
    };
    return (
        <Fragment>
            <div className="card">

                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Quality Verification</h5>
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
                                // changeTextValue={(e) => updateFormData(e)}
                                // value={monthwise}
                                // name="monthwise"
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
                                {search === true ? <Qualityverifitable /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Qualityverifcation
