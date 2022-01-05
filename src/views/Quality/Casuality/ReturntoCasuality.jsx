import { Card } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useParams, useHistory } from 'react-router'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import DoctornameSelect from 'src/views/CommonCode/DoctornameSelect'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'

const ReturntoCasuality = () => {
    const { id } = useParams()
    const history = useHistory();
    const toback = () => {
        history.push(`/Home/CasualitypatientList`)
    }

    const [enable, setenable] = useState(false)
    const [value, setvalue] = useState(0)
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card-body">
                <div className="row"  >
                    <div className="col-md-12  col-sm-12">

                        <Card className="card-body">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-md-6 pl-0">
                                            <DoctornameSelect
                                                // distrue={distrue}
                                                style={{
                                                    minHeight: 10,
                                                    maxHeight: 27,
                                                    paddingTop: 0,
                                                    paddingBottom: 4,
                                                }}
                                            />
                                        </div>
                                        {/* <div className="col-md-6 pt-2"> */}
                                        <div className="col-md-3">
                                            <label htmlFor="test" className="form-label">
                                                Return to Icu Date/Time
                                            </label>
                                        </div>
                                        <div className="col-md-3">
                                            <TextInput
                                                fullwidth
                                                id="test"
                                                type="datetime-local"
                                            // changeTextValue={(e) => updateFormData(e)}
                                            // classname="form-control form-control-sm"
                                            // value={datetime}
                                            // name="datetime"
                                            // disabled={enable}
                                            />
                                        </div>
                                    </div>
                                    {/* </div> */}
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-6 pt-2">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Present Complaints"
                                            // value={prsntcomplaint}
                                            // name="prsntcomplaint"
                                            // changeTextValue={(e) => updateFormData(e)}
                                            // disabled={enable}
                                            />
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-6 pt-2">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Previous Complaints"
                                            // value={prevcomplaint}
                                            // name="prevcomplaint"
                                            // changeTextValue={(e) => updateFormData(e)}
                                            // disabled={enable}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 pt-2 pl-1">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Remarkz"
                                            // value={remark}
                                            // name="remark"
                                            // changeTextValue={(e) => updateFormData(e)}
                                            // disabled={enable}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                            </div>
                        </Card>
                        <div className="card-footer"
                        // style={{
                        //   backgroundColor: '#b6b8c3',
                        // }}
                        >
                            <div className="col-md-12">
                                <FooterClosebtn
                                // edit={editreturn}
                                />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div >
        </Fragment>
    )
}
export default ReturntoCasuality
