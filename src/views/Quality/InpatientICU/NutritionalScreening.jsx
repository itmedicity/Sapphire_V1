import React, { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useParams } from 'react-router'
import PatientCard from '../Inpatient/PatientCard'
import {  Select,  FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import Commonfoot from 'src/views/CommonCode/Commonfoot'
import TextInput from 'src/views/Component/TextInput'

const NutritionalScreening = () => {
    const { id } = useParams()
  const [nutritionalScreeningdata, setnutritionalScreeningdata] = useState(
      {
        nutritionalScreening:'0',
    })

  const { nutritionalScreening } = nutritionalScreeningdata

    const [toggle, setToggle] = useState(false)

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card col-md-12" style={{ backgroundColor: "#e8eaf6" }} >
                <div className="card-body">
                    <div className="row"  >
                        <div className="col-md-3 col-sm-12" >
                            <PatientCard id={id} />
                        </div>
                        <div className="col-md-9  col-sm-12">
                            <div className="card"  >
                                <div className="card-header  text-black " style={{
                                    backgroundColor: "#b6b8c3"
                                }}>
                                    <h5>
                                        Nutritional Screening </h5>
                                </div>
                                <Card className="card-body">
                                    <div className="row">
                                        <div className="col-md-2 pt-2">
                                            <FormControl
                                                margin="dense"
                                                className="mt-1"
                                            >
                                                <Select
                                                    labelId="test-select-label"
                                                    name="nutritionalScreening"
                                                    value={nutritionalScreening}
                                                    size="small"
                                                    id="demo-simple-select"
                                                    onChange={(e) => { setToggle(e.target.value) }}
                                                    fullWidth
                                                    variant="outlined"
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                                >
                                                    <MenuItem value='0'>Selected Option</MenuItem>
                                                    <MenuItem value='1'>Done</MenuItem>
                                                    <MenuItem value='2'>Not Done</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-10 pt-2">
                                            {toggle === '2' ? <Actiontaken /> :  <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Remarks"
                                            />
                                            }
                                           
                                        </div>
                                    </div>
                                </Card>
                                <Commonfoot id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NutritionalScreening
