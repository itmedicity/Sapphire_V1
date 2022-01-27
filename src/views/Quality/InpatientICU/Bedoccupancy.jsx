import React, { Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { ToastContainer } from 'react-toastify'
import { useHistory, useParams } from 'react-router'
import { Button, Card } from '@mui/material'
import Bedoccupancycard from './Bedoccupancycard'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { userslno } from 'src/views/Constant/Constant'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'

const Bedoccupancy = () => {
  const { id } = useParams()
  const classes = useStyles()
  const [toggle, setToggle] = useState(1)
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }
  const [mornindta, setmornindta] = useState({
    inpt_slno: 6,
    user_slno: userslno(),
    bow_flag: 'M',
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    NoofventilatedNPRatio: '',
    NoofnonventilatedNPRatio: ''
  })
  //default state
  const mrngdefaultstate = {
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    NoofventilatedNPRatio: '',
    NoofnonventilatedNPRatio: '',
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
    NoofventilatedNPRatio: '',
    NoofnonventilatedNPRatio: ''
  })
  const evengdefaultstate = {
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    NoofventilatedNPRatio: '',
    NoofnonventilatedNPRatio: '',
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
    NoofventilatedNPRatio: '',
    NoofnonventilatedNPRatio: ''
  })
  const nightdefaultstate = {
    availableBedNumber: '',
    numberofbedOccupied: '',
    noofNurses: '',
    noofPatient: '',
    NoofventilatedNPRatio: '',
    NoofnonventilatedNPRatio: '',
  }
  const postDatamorning = {
    mornindta
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
      const result = await axioslogin.post('/bedOccupnacyICU', postDatamorning)
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
      const result = await axioslogin.post('/bedOccupnacyICU', postDataevenging)
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
      const result = await axioslogin.post('/bedOccupnacyICU', postDatanight)
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
        <div className="card col-md-12" style={{ backgroundColor: '#e8eaf6' }}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <PatientCard id={id} />
              </div>
              <div className="col-md-9  col-sm-12">
                <div className="card">
                  <div
                    className="card-header  text-black "
                    style={{
                      backgroundColor: '#b6b8c3',
                    }}
                  >
                    <h5>Bed Utilization in ICU</h5>
                  </div>
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
                          {toggle === 1 ? <Bedoccupancycard morningdata={setmornindta} flagsln={'M'} id={id} /> : null}
                          {toggle === 2 ? <Bedoccupancycard morningdata={setmornindta} flagsln={'E'} id={id} /> : null}
                          {toggle === 3 ? <Bedoccupancycard morningdata={setmornindta} flagsln={'N'} id={id} /> : null}
                        </div>
                      </div>
                    </div>
                  </Card>
                  <div
                    className="card-footer text-muted"
                    style={{
                      backgroundColor: '#b6b8c3',
                    }}
                  >
                    <FooterClosebtn redirect={RedirectToProfilePage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default Bedoccupancy
