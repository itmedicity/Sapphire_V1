import React, { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { Card, Typography } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { useStyles } from "src/views/CommonCode/MaterialStyle"
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const Opbenchmark = () => {
    const history = useHistory()
    const [year, setYear] = useState(null);
    const classes = useStyles()


    const setHolidayYear = (val) => {
        setYear(val)
    }
    const updateFormData = async (e) => {
        const value = e.target.value
        setbenchmarkset({ ...benchmarkset, [e.target.name]: value })
    }


    //to settings
    const [benchmarkset, setbenchmarkset] = useState({
        holidayyear: '',
        calendar_leave: '',
    })

    const { holidayyear,
        calendar_leave
    } = benchmarkset
    const holiday_year = moment(year).format('YYYY')

    const postData = {
        benhmark_year: holiday_year,
        benhmark_vlue: calendar_leave
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post(`reportop/insert`, postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
        } else if (success === 0) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <form className={classes.root} onSubmit={submitFormData}>
                <div className="card">
                    <div className="card-header bg-dark pb-0 border border-dark text-white">
                        <h5>OP Benchmark </h5>
                    </div>
                    <Card className="card-body">
                        <div className="row">
                            {/* <form className={classes.root} onSubmit={submitFormData}> */}
                            <div className='col-md-1'>  </div>
                            <div className="col-md-3 pt-1">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['year']}
                                        label="Year"
                                        name="year"
                                        value={year}
                                        onChange={(e) => {
                                            setHolidayYear(e)
                                        }}
                                        renderInput={(params) => <TextField {...params}
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                        />}
                                    />
                                </LocalizationProvider>

                            </div>
                            <div className="col-md-3 pt-1">
                                <TextField
                                    label="BenchMark Per Year"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    name="calendar_leave"
                                    value={calendar_leave}
                                    onChange={(e) => updateFormData(e)}
                                />
                            </div>

                            <div className="col-md-2 ">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    type="Submit"
                                    className="ml-2"
                                >
                                    Save
                                </Button>
                            </div>
                            <div className="col-md-2 ">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    className="ml-2"
                                // onClick={toSettings}
                                >
                                    Close
                                </Button>
                            </div>
                            {/* </form> */}
                        </div>
                    </Card>
                </div>
            </form>
        </Fragment>
    )
}

export default Opbenchmark