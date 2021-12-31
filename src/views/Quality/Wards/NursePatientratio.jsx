import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { ToastContainer } from 'react-toastify'
import { useHistory, useParams } from 'react-router'
import { Button, Card } from '@mui/material'
import Nurseratiocard from './Nurseratiocard'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { GrMoon } from "react-icons/gr";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const NursePatientratio = () => {
  // using useparam get id to get details of patient
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

  // const [distrue, setdistrue] = useState(false)
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }
  const [diestflag, setdietflag] = useState('')
  const [setdta, setfunc] = useState({
    inpt_slno: id,
    user_slno: userslno(),
    bow_flag: diestflag,
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: ''
  })
  const {
    noofNurses,
    noofPatient,
    nursePatientratio
  } = setdta
  const dietdefaultsate = {
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: ''
  }

  const postnursepatientratio = {
    npr_noofnurse: setdta.noofNurses,
    npr_noofpatient: setdta.noofPatient,
    npr_ratio: setdta.nursePatientratio,
    inpt_slno: setdta.inpt_slno,
    user_slno: setdta.user_slno,
    nr_shift_flag: diestflag
  }

  const postDataEdit = {
    npr_noofnurse: noofNurses,
    npr_noofpatient: noofPatient,
    npr_ratio: nursePatientratio,
    inpt_slno: value,
    user_slno: userslno(),
    nr_shift_flag: diestflag

  }

  const submitformData = async (e) => {
    e.preventDefault()
    if (value === 0) {
      if (toggle === 1) {
        const result = await axioslogin.post('/nursepatientRatio', postnursepatientratio)
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
        const result = await axioslogin.post('/nursepatientRatio', postnursepatientratio)
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
        const result = await axioslogin.post('/nursepatientRatio', postnursepatientratio)
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
      const result = await axioslogin.patch('/nursepatientRatio', postDataEdit)
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
    const incidence = async () => {
      const postdata = {
        diestflag: diestflag,
        id: id
      }
      const result = await axioslogin.post('nursepatientRatio/getdata', postdata)
      const { success, data } = result.data
      if (success === 1) {
        Setenable(true)
        data.map((val) => {
          const frmData = {
            inpt_slno: id,
            user_slno: userslno(),
            noofNurses: val.npr_ratio,
            noofPatient: val.npr_noofpatient,
            nursePatientratio: val.npr_noofnurse,
          }
          const morining = 1
          setfunc(frmData)
          // Setenable(true)
          setToggle(val.nr_shift_flag === 'M' ? 1 : val.nr_shift_flag === 'E' ? 2 : 3)
        })
      }
      else if (success === 0) {
        const frmData = {
          inpt_slno: id,
          user_slno: userslno(),
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
    if (diestflag === 'M') {
      incidence()
    }
    else if (diestflag === 'E') {
      incidence()
    }
    else if (diestflag === 'N') {
      incidence()
    }

  }, [id, diestflag])

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
                        setdietflag('M')
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
                        setdietflag('E')
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
                        setdietflag('N')
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
                {toggle === 1 ? <Nurseratiocard setfunc={setfunc} setdta={setdta} id={id} disabled={enable} /> : null}
                {toggle === 2 ? <Nurseratiocard setfunc={setfunc} setdta={setdta} id={id} disabled={enable} /> : null}
                {toggle === 3 ? <Nurseratiocard setfunc={setfunc} id={id} setdta={setdta} disabled={enable} /> : null}
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

export default NursePatientratio
