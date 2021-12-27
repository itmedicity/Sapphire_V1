import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { ToastContainer } from 'react-toastify'
import { useHistory, useParams } from 'react-router'
import { Button, Card } from '@mui/material'
import Dietititaincard from './Dietititaincard'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { FaBaby } from 'react-icons/fa';
import { MdPregnantWoman } from "react-icons/md";
import { FcBusinesswoman } from "react-icons/fc";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { GrRestroomWomen } from "react-icons/gr";
import { MdOutlinePregnantWoman } from "react-icons/md";

// import { FcPortraitMode } from 'react-icons/fc';

const Dietitian = () => {
  const { id } = useParams()
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }
  const [enable, Setenable] = useState(false)
  const [value, setValue] = useState(0)
  const [toggle, setToggle] = useState(0)
  const [color, setColor] = useState({

  })
  const [setdta, setfunc] = useState({
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
    remarks: ''
  })
  const [diestflag, setdietflag] = useState('')
  const [dietvalmain, setdietvaluemain] = useState({
    inpt_slno: id,
    user_slno: userslno(),
    bow_flag: diestflag,
    dietian: '',
    remarks: ''
  })
  const dietdefaultsate = {
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
    remarks: '',
    dietian: '',
    remarks: ''
  }

  const postdietpeadtric = {
    diet_ysno: dietvalmain.dietian,
    diet_remark: dietvalmain.remarks,
    diet_errordesc: setdta.errordesc,
    diet_prsnresponsible: setdta.personresponsible,
    diet_actntkn: setdta.actiontaken,
    inpt_slno: dietvalmain.inpt_slno,
    user_slno: dietvalmain.user_slno,
    diet_pao_flag: diestflag

  }

  const postdietpeadtricEdit = {
    diet_ysno: dietvalmain.dietian,
    diet_remark: dietvalmain.remarks,
    diet_errordesc: setdta.errordesc,
    diet_prsnresponsible: setdta.personresponsible,
    diet_actntkn: setdta.actiontaken,
    inpt_slno: dietvalmain.inpt_slno,
    user_slno: dietvalmain.user_slno,
    diet_pao_flag: diestflag
  }

  const submitformData = async (e) => {
    e.preventDefault()
    if (value === 0) {

      if (toggle === 1) {
        const result = await axioslogin.post('/dietian', postdietpeadtric)
        const { success, message } = result.data
        if (success === 1) {
          succesNofity(message)
          // setfunc(postdietpeadtric)
        } else if (success === 2) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }
      else if (toggle === 2) {
        const result = await axioslogin.post('/dietian', postdietpeadtric)
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
        const result = await axioslogin.post('/dietian', postdietpeadtric)
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
      const result = await axioslogin.patch('/dietian', postdietpeadtricEdit)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        Setenable(true)
      } else if (success === 2) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
      }
    }
  }

  useEffect(() => {
    const dietitian = async () => {
      const result = await axioslogin.get(`dietian/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        Setenable(true)
        const { diet_ysno, diet_remark, diet_errordesc, diet_prsnresponsible, diet_actntkn, inpt_slno, diet_pao_flag } = data[0]
        const frmData = {
          errordesc: diet_errordesc,
          personresponsible: diet_prsnresponsible,
          actiontaken: diet_actntkn
        }
        const frmdata1 = {
          dietian: diet_ysno,
          remarks: diet_remark
        }
        if (diet_pao_flag === "P") {
          const peadiatric = 2

          setToggle(2)
          setdietvaluemain(diet_ysno)
          if (diet_ysno === 1) {
            setfunc(frmdata1)
          } else {
            setfunc(frmData)
          }
          // setfunc(frmdata1)
          // setValue(inpt_slno)
        } else if (diet_pao_flag === "A") {
          const Adults = 2
          setToggle(Adults)
          setdietvaluemain(diet_ysno)
          if (diet_ysno === 1) {
            setfunc(frmdata1)
          } else {
            setfunc(frmData)
          }
        } else {
          const obstritcs = 3
          setToggle(obstritcs)
          setdietvaluemain(diet_ysno)
          if (diet_ysno === 1) {
            setfunc(frmdata1)
          } else {
            setfunc(frmData)
          }
        }


      }
      else if (success === 0) {
        Setenable(false)
        setValue(0)
      }
      else {
        warningNofity("Error Occured!!!Please Contact EDP")
      }
    }
    dietitian()
  }, [id])
  const editbloodcompnt = () => {
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
              <div className="col-md-3 pt-1 ">
                <div className="row">
                  <Stack direction="row" spacing={2}>
                    <Avatar >
                      <Tooltip title="Peadiatrics" placement="top">
                        <IconButton onClick={() => {
                          setToggle(1)
                          setdietflag('P')
                        }}  >
                          <FaBaby size={35} />
                        </IconButton>
                      </Tooltip>
                    </Avatar>

                    <Avatar>
                      <Tooltip title="Adults" placement="top">
                        <IconButton onClick={() => {
                          setToggle(2)
                          setdietflag('A')
                        }}>
                          <GrRestroomWomen
                            size={35} />

                        </IconButton>
                      </Tooltip>
                    </Avatar>

                    <Avatar>
                      <Tooltip title="Obsteritcs" placement="top">
                        <IconButton onClick={() => {
                          setToggle(3)
                          setdietflag('O')
                        }}>
                          < MdOutlinePregnantWoman size={35} />
                          {/* <MdPregnantWoman  */}
                        </IconButton>
                      </Tooltip>
                    </Avatar>
                  </Stack>
                </div>
              </div>
              <div className="col-md-9">
                {toggle === 1 ? <Dietititaincard setfunc={setfunc} handover={setdta} setdietvaluemain={setdietvaluemain} id={id} togglee={toggle} /> : null}
                {toggle === 2 ? <Dietititaincard setfunc={setfunc} handover={setdta} setdietvaluemain={setdietvaluemain} id={id} togglee={toggle} /> : null}
                {toggle === 3 ? <Dietititaincard setfunc={setfunc} handover={setdta} setdietvaluemain={setdietvaluemain} id={id} togglee={toggle} /> : null}
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
            <FooterClosebtn
              edit={editbloodcompnt} />
          </div>
        </div>
      </form>
    </Fragment >
  )
}

export default Dietitian
