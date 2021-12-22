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


const Dietitian = () => {
  const { id } = useParams()
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }
  const [enable, Setenable] = useState(false)
  const [value, setValue] = useState(0)
  const [toggle, setToggle] = useState(0)
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
          // setfunc(dietdefaultsate)
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
      const result = await axioslogin.patch('/dietian/edit', postdietpeadtricEdit)
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
        const { diet_ysno, diet_remark, diet_errordesc, diet_prsnresponsible, diet_actntkn, inpt_slno } = data[0]
        // setdietvalue(bldmst_slno)
        // updateOption(reactn_occ)
        const frmData = {
          errordesc: diet_errordesc,
          personresponsible: diet_prsnresponsible,
          actiontaken: diet_actntkn
        }
        const frmdata1 = {
          dietian: diet_ysno,
          remarks: diet_remark
        }
        setdietvaluemain(frmData)
        setfunc(frmdata1)
        setValue(inpt_slno)
        // setToggle(frmData)
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
              <div className="col-md-4 pt-1 ">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(1)
                    setdietflag('P')
                  }}
                >
                  Paediatrics
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(2)
                    setdietflag('A')
                  }}
                >
                  Adults
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(3)
                    setdietflag('O')
                  }}
                >
                  Obsterics
                </Button>
              </div>

              <div className="col-md-8">
                {toggle === 1 ? <Dietititaincard setfunc={setfunc} handover={setdta} setdietvaluemain={setdietvaluemain} id={id} /> : null}
                {toggle === 2 ? <Dietititaincard setfunc={setfunc} handover={setdta} setdietvaluemain={setdietvaluemain} id={id} /> : null}
                {toggle === 3 ? <Dietititaincard setfunc={setfunc} handover={setdta} setdietvaluemain={setdietvaluemain} id={id} /> : null}
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
    </Fragment>
  )
}

export default Dietitian
