import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import { Card, Typography } from '@mui/material'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import TextInput from 'src/views/Component/TextInput'
import moment from 'moment'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tableIcons } from 'src/views/Constant/MaterialIcon';


const Reintubation = () => {
    // const [value, setValue] = useState(new Date());
    // const [enable, setenable] = useState(false)
    const { id } = useParams()
    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };

    const [tabledata, setTabledata] = useState([{
        slno: '',
        incudate: '',
        exudate: ''
    }])

    const [reintubate, setReintubate] = useState({
        intubatedrate: '',
        extubatedrate: '0000:00:00 00:00:00'
    })

    // /    //defaultb state
    //     const defaultstate = {
    //         intubatedrate: '',
    //         extubatedrate: "0000:00:00 00:00:00",
    //     }

    const {
        intubatedrate,
        extubatedrate
    } = reintubate

    const updateFormData = async (e) => {
        const value = e.target.value
        setReintubate({ ...reintubate, [e.target.name]: value })
    }

    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        intubated_date: intubatedrate,
        extubated_date: extubatedrate,
    }

    const submitFormData = async (e) => {
        e.preventDefault()
        // console.log(postData)
        const result = await axioslogin.post('/reIntubationrate', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            // setenable(true)
        } else if (success === 2) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }



    const [redatevalue, setreDatevalue] = useState(false)

    const [exdatevalue, setexDatevalue] = useState(false)

    useEffect(() => {
        const reintubaterate = async () => {
            const result = await axioslogin.get(`/reIntubationrate/${id}`)
            // console.log("minu")
            // console.log(result)
            const { success, data } = result.data
            if (success === 1) {
                const { intubated_date,
                    extubated_date,
                    ip_reintubation_slno,
                } = data[0]

                const formtable = [{
                    slno: ip_reintubation_slno,
                    incudate: intubated_date,
                    exudate: extubated_date
                }]

                setTabledata(formtable)
                const datetime = moment(intubated_date).format("YYYY-MM-DD[T]HH:mm:ss")
                const datetimess = extubated_date
                // console.log(datetimess)
                const frmdata1 = {
                    intubatedrate: datetime
                }

                const frmdata2 = {
                    extubated_date: datetimess
                }
                // console.log(formtable)
                setReintubate(frmdata1)
                setexDatevalue(frmdata2)
                if (datetime === null) {
                    setreDatevalue(false)
                }
                else {
                    setreDatevalue(true)
                    setexDatevalue(false)
                }

                // if (datetime === null) {
                //     // setreDatevalue(false)
                //     setReintubate(frmdata)
                // } else if (datetime != null) {
                //     // setreDatevalue(true)
                // }
            }
            else if (success === 2) {
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        reintubaterate()


    }, [id])
    const editreturn = () => {
        // setenable(false)
        // setdistrue(false)
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <form onSubmit={submitFormData}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-4  pb-1">
                                <Typography fontSize={16} noWrap={true} >Intubated Date</Typography>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Arrived Time"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={intubatedrate}
                                    name="intubatedrate"
                                    disabled={redatevalue}
                                />
                            </div>
                            <div className="col-md-4  pb-1">
                                <Typography fontSize={16} noWrap={true} >Extubated Date</Typography>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Initial Assessment start"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={extubatedrate}
                                    name="extubatedrate"
                                    disabled={exdatevalue}
                                />
                            </div>
                        </div>
                        <div className="card">

                            <div className="col-md-12">

                                <TableContainer sx={{ maxHeight: 150 }}>
                                    <Table size="small"
                                        icons={tableIcons}
                                        stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow >
                                                <TableCell align="center">Sl No</TableCell>
                                                <TableCell align="center">Start Date</TableCell>
                                                <TableCell align="center">End Date</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {
                                                tabledata.map((val) => {

                                                    return (< TableRow
                                                        key={val.slno}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableRow>
                                                            <TableCell component="th" scope="row" align="center" >
                                                                {val.slno}
                                                            </TableCell>
                                                            <TableCell align="center">{val.incudate}</TableCell>
                                                            <TableCell align="center">{val.exudate}</TableCell>
                                                        </TableRow>

                                                        {/* <TableCell align="center">
                                                            <MdDelete size={20} />
                                                 </TableCell> */}
                                                    </TableRow>)
                                                }

                                                )

                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-8">
                                <Reintubatetable />
                            </div>
                        </div> */}
                        {/* <div className="col-md-2"></div>
                            <div className="col-md-4  pb-1">
                                <Typography fontSize={16} noWrap={true} >Reintubated Date</Typography>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Initial Assessment End"
                                //     changeTextValue={(e) => updateFormData(e)}
                                //     value={reintubatedrate}
                                //     name="reintubatedrate"
                                //     disabled={enable}
                                />
                            </div>
                            <div className="col-md-4  pb-1">
                                <Typography fontSize={16} noWrap={true} >Reextubated Date</Typography>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                // changeTextValue={(e) => updateFormData(e)}
                                // value={reextubated_date}
                                // name="reextubated_date"
                                // disabled={enable}
                                />
                            </div>
                            <div className="col-md-2"></div> */}
                        {/* </div> */}
                        {/* <div className="row">

                            <div className="col-md-2"></div>
                            <div className="col-md-8  pb-1">
                                <Typography fontSize={16} noWrap={true} >Remarks</Typography>
                                <TextInput classname="form-control form-control-sm" Placeholder="Remark"
                                // changeTextValue={(e) => updateFormData(e)}
                                // value={remarkns}
                                // name="remarkns"
                                // disabled={enable}
                                />
                                <div className="col-md-2"></div>
                            </div>
                        </div> */}
                    </div>
                </Card>
                <div className="card-footer">
                    <div className="col-md-12">
                        <FooterClosebtn
                            edit={editreturn}
                        />
                    </div>
                </div>

            </form>
        </Fragment >
    )
}
export default Reintubation



