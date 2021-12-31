import { Avatar, Card, IconButton, Stack, Tooltip } from '@mui/material'
import React, { Fragment, useState, useEffect } from 'react'
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { GrMoon } from "react-icons/gr";
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { userslno } from 'src/views/Constant/Constant';
import { useParams } from 'react-router-dom';
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn';
import BedUtilizationIcuCard from './BedUtilizationIcuCard';

const BedUtilizationIcu = () => {
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
    const [bedicuflag, setbedicuflag] = useState('')
    const [setdta, setfunc] = useState({
        inpt_slno: id,
        user_slno: userslno(),
        bedoccup_shiftflag: bedicuflag,
        availableBedNumber: '',
        numberofbedOccupied: '',
        noofventilatedpatient: '',
        noofnurse: '',
        noofnonventipat: '',
        noofnonventinurse: ''
    })
    const {
        availableBedNumber,
        numberofbedOccupied,
        noofventilatedpatient,
        noofnurse,
        noofnonventipat,
        noofnonventinurse
    } = setdta

    const bedutilizationicudefaultsate = {
        availableBedNumber: '',
        numberofbedOccupied: '',
        noofventilatedpatient: '',
        noofnurse: '',
        noofnonventipat: '',
        noofnonventinurse: ''
    }

    const postBedutilizationIcu = {
        boicu_avlbed: setdta.availableBedNumber,
        boicu_occupbed: setdta.numberofbedOccupied,
        vent_noofpatient: setdta.noofventilatedpatient,
        vent_noofnurse: setdta.noofnurse,
        nonvent_noofptnt: setdta.noofnonventipat,
        nonvent_noofnurse: setdta.noofnonventinurse,
        inpt_slno: setdta.inpt_slno,
        user_slno: setdta.user_slno,
        bedoccup_shiftflag: bedicuflag
    }

    const postDataEdit = {
        boicu_avlbed: availableBedNumber,
        boicu_occupbed: numberofbedOccupied,
        vent_noofpatient: noofventilatedpatient,
        vent_noofnurse: noofnurse,
        nonvent_noofptnt: noofnonventipat,
        nonvent_noofnurse: noofnonventinurse,
        inpt_slno: value,
        user_slno: userslno(),
        bedoccup_shiftflag: bedicuflag
    }

    const submitformData = async (e) => {
        e.preventDefault()
        if (value === 0) {
            if (toggle === 1) {
                const result = await axioslogin.post('/bedOccupnacyICU', postBedutilizationIcu)
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

                const result = await axioslogin.post('/bedOccupnacyICU', postBedutilizationIcu)
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
                const result = await axioslogin.post('/bedOccupnacyICU', postBedutilizationIcu)
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
            const result = await axioslogin.patch('/bedOccupnacyICU', postDataEdit)
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
                bedicuflag: bedicuflag,
                id: id
            }
            const result = await axioslogin.post('bedOccupnacyICU/getdata', postdata)
            const { success, data } = result.data

            if (success === 1) {
                Setenable(true)
                const { inpt_slno, bedoccup_shiftflag, boicu_avlbed, boicu_occupbed, nonvent_noofnurse, nonvent_noofptnt,
                    vent_noofnurse, vent_noofpatient } = data[0]
                //  data.map((val) => {
                const frmData = {
                    id: inpt_slno,
                    user_slno: userslno(),
                    availableBedNumber: boicu_avlbed,
                    numberofbedOccupied: boicu_occupbed,
                    noofventilatedpatient: vent_noofpatient,
                    noofnurse: vent_noofnurse,
                    noofnonventipat: nonvent_noofptnt,
                    noofnonventinurse: nonvent_noofnurse
                }
                const morining = 1
                setfunc(frmData)
                // Setenable(true)
                setToggle(bedoccup_shiftflag === 'M' ? 1 : bedoccup_shiftflag === 'E' ? 2 : 3)
                // })
            }
            else if (success === 0) {
                const frmData = {
                    inpt_slno: id,
                    user_slno: userslno(),
                    availableBedNumber: "",
                    numberofbedOccupied: "",
                    noofNurses: "",
                    noofPatient: "",
                    nursePatientratio: "",
                }
                // Setenable(false)
                setValue(0)
                setfunc(frmData)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        if (bedicuflag === 'M') {

            bedutilization()
        }
        else if (bedicuflag === 'E') {
            bedutilization()
        }
        else if (bedicuflag === 'N') {
            bedutilization()
        }

    }, [id, bedicuflag])

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
                                                setbedicuflag('M')
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
                                                setbedicuflag('E')
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
                                                setbedicuflag('N')
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
                                {toggle === 1 ? <BedUtilizationIcuCard setfunc={setfunc} setdta={setdta} id={id} disabled={enable} /> : null}
                                {toggle === 2 ? <BedUtilizationIcuCard setfunc={setfunc} setdta={setdta} id={id} disabled={enable} /> : null}
                                {toggle === 3 ? <BedUtilizationIcuCard setfunc={setfunc} id={id} setdta={setdta} disabled={enable} /> : null}
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

export default BedUtilizationIcu
