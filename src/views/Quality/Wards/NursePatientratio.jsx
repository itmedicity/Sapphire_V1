import React, { Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { ToastContainer } from 'react-toastify'
import { useHistory, useParams } from 'react-router'
import { Button, Card } from '@mui/material'
import Nurseratiocard from './Nurseratiocard'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'

const NursePatientratio = () => {
  // using useparam get id to get details of patient
  const { id } = useParams()
  const [toggle, setToggle] = useState(0)
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }

  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
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
                  <h5>Nurse Patient Ratio</h5>
                </div>
                <Card className="card-body">
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
                    <div className="col-md-8">
                      {toggle === 1 ? <Nurseratiocard /> : null}
                      {toggle === 2 ? <Nurseratiocard /> : null}
                      {toggle === 3 ? <Nurseratiocard /> : null}
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
    </Fragment>
  )
}

export default NursePatientratio
