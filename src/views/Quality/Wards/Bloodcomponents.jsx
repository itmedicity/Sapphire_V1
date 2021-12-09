import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import BloodGroupSelect from 'src/views/CommonCode/BloodGroupSelect'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { userslno } from 'src/views/Constant/Constant'

const Bloodcomponents = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }
  // setting Intial state
  const [bloodcomponentData, setBloodcomponentData] = useState({
    noofbrdrequired: '',
    requesteddatetime: '',
    noofbagreceived: '',
    noofprdct_used: '',
    recieved_datetime: '',
    noofprdct_wasted: '',
    reactionoccured: '0',
    remarks: '',
  })
  // default state
  const defaultstate = {
    noofbrdrequired: '',
    requesteddatetime: '',
    noofbagreceived: '',
    noofprdct_used: '',
    recieved_datetime: '',
    noofprdct_wasted: '',
    reactionoccured: '0',
    remarks: '',
  }
  // destructuring object
  const {
    noofbrdrequired,
    requesteddatetime,
    noofbagreceived,
    noofprdct_used,
    recieved_datetime,
    noofprdct_wasted,
    reactionoccured,
    remarks,
  } = bloodcomponentData

  // select BloodGroupSelect
  const { selectBloodGroup, updateBloodGroup } = useContext(PayrolMasterContext)

  //getting data from the form
  const updateFormData = async (e) => {
    const value = e.target.value
    setBloodcomponentData({ ...bloodcomponentData, [e.target.name]: value })
  }

  const postData = {
    inpt_slno: id,
    user_slno: userslno(),
    bldmst_slno: selectBloodGroup,
    bagrequested: noofbrdrequired,
    bagreq_time: requesteddatetime,
    bagreceived: noofbagreceived,
    bagrec_time: recieved_datetime,
    bldprduct_used: noofprdct_used,
    bldprduct_wasted: noofprdct_wasted,
    reactn_occ: reactionoccured,
    remark: remarks,
  }

  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.post('/bloodcomponents', postData)

    const { success, message } = result.data
    if (success === 1) {
      succesNofity(message)
      setBloodcomponentData(defaultstate)
      updateBloodGroup(0)
    } else if (success === 2) {
      warningNofity(message)
    } else {
      errorNofity('Error Occured!!!Please Contact EDP')
    }
  }
  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <form className={classes.root} onSubmit={submitFormData}>
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
                  <h5>Blood Component</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-md-3 pt-2">
                          <BloodGroupSelect
                            style={{
                              minHeight: 10,
                              maxHeight: 27,
                              paddingTop: 0,
                              paddingBottom: 4,
                            }}
                          />
                        </div>
                        <div className="col-md-3 pt-2">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="No of bag Requested"
                            changeTextValue={(e) => updateFormData(e)}
                            value={noofbrdrequired}
                            name="noofbrdrequired"
                          />
                        </div>

                        <div className="col-md-3 pt-2">
                          <label htmlFor="test" className="form-label">
                            Requested Date/Time
                          </label>
                        </div>
                        <div className="col-md-3 pt-2 pl-0">
                          <TextInput
                            type="datetime-local"
                            classname="form-control form-control-sm"
                            Placeholder="Requested date/Time"
                            changeTextValue={(e) => updateFormData(e)}
                            value={requesteddatetime}
                            name="requesteddatetime"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 pt-2">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="No. of Bag Received"
                            changeTextValue={(e) => updateFormData(e)}
                            value={noofbagreceived}
                            name="noofbagreceived"
                          />
                        </div>
                        <div className="col-md-3 pt-2">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="No. Of Product Used"
                            changeTextValue={(e) => updateFormData(e)}
                            value={noofprdct_used}
                            name="noofprdct_used"
                          />
                        </div>

                        <div className="col-md-3 pt-2">
                          <label htmlFor="test" className="form-label">
                            Received Date/Time
                          </label>
                        </div>
                        <div className="col-md-3 pt-2 pl-0">
                          <TextInput
                            id="test"
                            type="datetime-local"
                            classname="form-control form-control-sm"
                            Placeholder="Requested date/Time"
                            changeTextValue={(e) => updateFormData(e)}
                            value={recieved_datetime}
                            name="recieved_datetime"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 pt-2">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="No. of Product Wasted"
                            changeTextValue={(e) => updateFormData(e)}
                            value={noofprdct_wasted}
                            name="noofprdct_wasted"
                          />
                        </div>
                        <div className="col-md-3 pt-2">
                          <FormControl fullWidth margin="dense" className="mt-1">
                            <Select
                              labelId="test-select-label"
                              size="small"
                              id="demo-simple-select"
                              onChange={(e) => updateFormData(e)}
                              value={reactionoccured}
                              name="reactionoccured"
                              fullWidth
                              variant="outlined"
                              style={{
                                minHeight: 10,
                                maxHeight: 27,
                                paddingTop: 0,
                                paddingBottom: 4,
                              }}
                            >
                              <MenuItem value="0">Reaction Occured</MenuItem>
                              <MenuItem value="1">Yes</MenuItem>
                              <MenuItem value="2">No</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-6 pt-2">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="Remarkz"
                            changeTextValue={(e) => updateFormData(e)}
                            value={remarks}
                            name="remarks"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                </div>
                <div className="card-footer  text-muted " style={{ backgroundColor: '#b6b8c3' }}>
                  <FooterClosebtn redirect={RedirectToProfilePage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}
export default Bloodcomponents
