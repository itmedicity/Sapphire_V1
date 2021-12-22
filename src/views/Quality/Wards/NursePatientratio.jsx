import React, { Fragment, useState } from 'react'
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


const NursePatientratio = () => {
  // using useparam get id to get details of patient
  const { id } = useParams()
  const [toggle, setToggle] = useState(0)
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

  const dietdefaultsate = {
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: ''
  }

  const postnursepatientratio = {
    npr_noofnurse: setdta.noofNurses,
    npr_noofpatient: setdta.noofPatient,
    npr_ratio: setdta.nursePatientratio,
    npr_ratio: setdta.nursePatientratio,
    inpt_slno: setdta.inpt_slno,
    user_slno: setdta.user_slno,
    nr_shift_flag: diestflag

  }

  const submitformData = async (e) => {
    e.preventDefault()
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
                    setdietflag('M')
                  }}
                >
                  Morning
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(2)
                    setdietflag('E')
                  }}
                >
                  Evening
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(3)
                    setdietflag('N')
                  }}
                >
                  Night
                </Button>
              </div>
              <div className="col-md-8">
                {toggle === 1 ? <Nurseratiocard setfunc={setfunc} id={id} /> : null}
                {toggle === 2 ? <Nurseratiocard setfunc={setfunc} id={id} /> : null}
                {toggle === 3 ? <Nurseratiocard setfunc={setfunc} id={id} /> : null}
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
            <FooterClosebtn />
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default NursePatientratio
