import React, { Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { ToastContainer } from 'react-toastify'
import { useHistory, useParams } from 'react-router'
import { Button, Card } from '@mui/material'
import Bedutilizatinwardcard from './Bedutilizatinwardcard'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const Bedutilizatinward = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }
  const [toggle, setToggle] = useState(1)
  const [mornindta, setmornindta] = useState({
    inpt_slno: 6,
    user_slno: userslno(),
    bow_flag: 'M',
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: '',
  })
  //default state
  const mrngdefaultstate = {
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: ''
  }
  //destrutring object


  const [eveningdata, seteveningdata] = useState({
    inpt_slno: id,
    user_slno: userslno(),
    bow_flag: 'E',
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: '',
  })
  const evengdefaultstate = {
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: ''
  }
  //destrutring object

  const [nightdata, setnightdata] = useState({
    inpt_slno: id,
    user_slno: userslno(),
    bow_flag: 'N',
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: '',
  })
  const nightdefaultstate = {
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: ''
  }

  const postDatamorning = {
    inpt_slno: 6,
    user_slno: userslno(),
    bow_flag: 'M',
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    nursePatientratio: '',
  }
  const postDataevenging = {
    eveningdata
  }
  const postDatanight = {
    nightdata
  }
  const submitFormData = async (e) => {
    e.preventDefault()
    if (toggle === 1) {
      console.log(mornindta)
      const result = await axioslogin.post('/bedoccupancyWard', postDatamorning)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        setmornindta(mrngdefaultstate)
      } else if (success === 2) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
      }
    }
    else if (toggle === 2) {
      const result = await axioslogin.post('/bedoccupancyWard', postDataevenging)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        seteveningdata(evengdefaultstate)
      } else if (success === 2) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
      }
    }
    else {
      const result = await axioslogin.post('/bedoccupancyWard', postDatanight)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        setnightdata(nightdefaultstate)
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
      <form className={classes.root} onSubmit={submitFormData}>
        <Card className="card-body">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4 pt-1 ">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(1)
                  }}
                >
                  Morning
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(2)
                  }}
                >
                  Evening
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(3)
                  }}
                >
                  Night
                </Button>
              </div>
              <div className="col-md-8 pt-1 ">
                {toggle === 1 ? <Bedutilizatinwardcard morningdata={setmornindta} flagsln={'M'} id={6} /> : null}
                {toggle === 2 ? <Bedutilizatinwardcard morningdata={seteveningdata} flagsln={'E'} id={id} /> : null}
                {toggle === 3 ? <Bedutilizatinwardcard morningdata={setnightdata} flagsln={'N'} id={id} /> : null}

              </div>
            </div>
          </div>
          <div
            className="card-footer text-muted"
            style={{
              backgroundColor: '#b6b8c3',
            }}
          >
            <FooterClosebtn redirect={RedirectToProfilePage} />
          </div>

        </Card>
      </form>
    </Fragment>
  )
}

export default Bedutilizatinward
