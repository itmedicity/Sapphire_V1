import { Avatar, Card, IconButton, Stack, Tooltip } from '@mui/material'
import React, { Fragment, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { GrMoon } from "react-icons/gr";
import Bedutilizatinwardcard from './Bedutilizatinwardcard';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { userslno } from 'src/views/Constant/Constant';
import { useParams } from 'react-router-dom';
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn';

const BedutilizationWardNew = () => {
    const { id } = useParams()
    const [toggle, setToggle] = useState(0)
    const [icondata, setIcondata] = useState({
        night: 0,
        day: 0,
        evening: 0
    })
    const { night, day, evening } = icondata
    const [enable, Setenable] = useState(false)
    const [value, setValue] = useState(0)
    const [bowflag, setbowflag] = useState('')
    const [setdta, setfunc] = useState({
        inpt_slno: id,
        user_slno: userslno(),
        bow_flag: bowflag,
        availableBedNumber: '',
        numberofbedOccupied: '',
        noofNurses: '',
        noofPatient: '',

    })
    const {
        availableBedNumber,
        numberofbedOccupied,
        noofNurses,
        noofPatient,

    } = setdta
    // const dietdefaultsate = {
    //     availableBedNumber: '',
    //     numberofbedOccupied: '',
    //     noofNurses: '',
    //     noofPatient: '',

    // }
    const postBedutilizationWard = {
        bow_availbed: setdta.availableBedNumber,
        bow_noofbedoccup: setdta.numberofbedOccupied,
        bow_noofnurse: setdta.noofNurses,
        bow_noofpatient: setdta.noofPatient,
        inpt_slno: setdta.inpt_slno,
        user_slno: setdta.user_slno,
        bow_flag: bowflag
    }
    const postDataEdit = {
        bow_availbed: availableBedNumber,
        bow_noofbedoccup: numberofbedOccupied,
        bow_noofnurse: noofNurses,
        bow_noofpatient: noofPatient,
        inpt_slno: value,
        user_slno: userslno(),
        bow_flag: bowflag
    }

    const submitformData = async (e) => {
        e.preventDefault()
        if (value === 0) {
            if (toggle === 1) {
                const result = await axioslogin.post('/bedoccupancyWard', postBedutilizationWard)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    // setfunc(dietdefaultsate)
                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else if (toggle === 2) {
                const result = await axioslogin.post('/bedoccupancyWard', postBedutilizationWard)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    // seteveningdata(evengdefaultstate)
                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else {
                const result = await axioslogin.post('/bedoccupancyWard', postBedutilizationWard)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    // setnightdata(nightdefaultstate)
                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
        }
        else {
            const result = await axioslogin.patch('/bedoccupancyWard', postDataEdit)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                // setdistrue(true)
            } else if (success === 1) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        }
    }
    useEffect(() => {
        const bedutilization = async () => {
            const postdata = {
                bowflag: bowflag,
                id: id
            }
            const result = await axioslogin.post('bedoccupancyWard/getdata', postdata)
            const { success, data } = result.data
            if (success === 1) {
                Setenable(true)
                const { inpt_slno, bow_availbed, bow_flag, bow_noofbedoccup, bow_noofnurse, bow_noofpatient } = data[0]
                // data.map((val) => {
                const frmData = {
                    id: inpt_slno,
                    availableBedNumber: bow_availbed,
                    numberofbedOccupied: bow_noofbedoccup,
                    noofNurses: bow_noofnurse,
                    noofPatient: bow_noofpatient,

                }
                // const morining = 1
                setfunc(frmData)
                // Setenable(true)
                setToggle(bow_flag === 'M' ? 1 : bow_flag === 'E' ? 2 : 3)
            }
            else if (success === 0) {
                const frmData = {
                    inpt_slno: id,
                    user_slno: userslno(),
                    availableBedNumber: "",
                    numberofbedOccupied: "",
                    noofNurses: "",
                    noofPatient: "",

                }
                // Setenable(false)
                setValue(0)
                setfunc(frmData)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        if (bowflag === 'M') {
            bedutilization()
        }
        else if (bowflag === 'E') {
            bedutilization()
        }
        else if (bowflag === 'N') {
            bedutilization()
        }

    }, [id, bowflag])

    const editdischarge = () => {
        Setenable(false)
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <form
                onSubmit={submitformData}
            >
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4 pt-1 ">
                                <Stack direction="row" spacing={4}>
                                    <Avatar sx={day === 1 ? { bgcolor: '#f7c17e' } : null} >
                                        <Tooltip title="Morning" placement="top">
                                            <IconButton onClick={() => {
                                                setToggle(1)
                                                setbowflag('M')
                                                setIcondata({
                                                    night: 0,
                                                    day: 1,
                                                    evening: 0
                                                })

                                            }}
                                            >
                                                <BsFillSunriseFill size={25} />
                                            </IconButton>
                                        </Tooltip>
                                    </Avatar>

                                    <Avatar sx={evening === 1 ? { bgcolor: ' #f1540f' } : null}  >
                                        <Tooltip title="Evening" placement="top">
                                            <IconButton onClick={() => {
                                                setToggle(2)
                                                setbowflag('E')
                                                setIcondata({
                                                    night: 0,
                                                    day: 0,
                                                    evening: 1
                                                })
                                            }}  >
                                                <BsFillSunsetFill size={25} />
                                            </IconButton>
                                        </Tooltip>
                                    </Avatar>

                                    <Avatar sx={night === 1 ? { bgcolor: '#808080' } : null} >
                                        <Tooltip title="Night" placement="top">
                                            <IconButton onClick={() => {
                                                setToggle(3)
                                                setbowflag('N')
                                                setIcondata({
                                                    night: 1,
                                                    day: 0,
                                                    evening: 0
                                                })
                                            }}  >
                                                <GrMoon size={25} />
                                            </IconButton>
                                        </Tooltip>
                                    </Avatar>

                                </Stack>
                            </div>
                            <div className="col-md-8">
                                {toggle === 1 ? <Bedutilizatinwardcard setfunc={setfunc} setdta={setdta} id={id} disabled={enable} /> : null}
                                {toggle === 2 ? <Bedutilizatinwardcard setfunc={setfunc} setdta={setdta} id={id} disabled={enable} /> : null}
                                {toggle === 3 ? <Bedutilizatinwardcard setfunc={setfunc} id={id} setdta={setdta} disabled={enable} /> : null}
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="card-footer"
                // style={{
                //   backgroundColor: '#b6b8c3',
                // }}
                >
                    <div className="col-md-12">
                        <FooterClosebtn edit={editdischarge} />
                    </div>
                </div>
            </form>

        </Fragment>
    )
}

export default BedutilizationWardNew
