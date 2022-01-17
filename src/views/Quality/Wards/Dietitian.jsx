import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import { Card } from '@mui/material'
import Dietititaincard from './Dietititaincard'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { FaBaby } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { GrRestroomWomen } from "react-icons/gr";
import { MdOutlinePregnantWoman } from "react-icons/md";
import Modelcommon from 'src/views/CommonCode/Modelcommon'
// import { FcPortraitMode } from 'react-icons/fc';

const Dietitian = () => {

  const { id } = useParams()// to get id 
  const [userid, setuserid] = useState({
    us_code: ''
  })
  // to identify the colur
  const [dietdata, setDietdata] = useState({
    peadiatric: 0,
    Adults: 0,
    obstritcs: 0
  })
  // for enable and disable
  const [distrue, setdistrue] = useState(false)
  // const [enable, Setenable] = useState(false)
  // to set the flag which is selected pediatric,adult,obstrics
  const [diestflag, setdietflag] = useState(0)
  // to set remarkdata
  const [remarkdata, setremarkdata] = useState({
    remarks: ''
  })
  // destucture remarkdata
  const { remarks } = remarkdata
  // to set action taken data
  const [actiontakendata, setactiontakendata] = useState({
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
    remarks: ''
  })
  // done not done process
  const [donotdone, setdonenotdone] = useState(0)
  // destructure action taken 
  const { errordesc,
    personresponsible,
    actiontaken } = actiontakendata

  const postdietpeadtric = {
    diet_ysno: donotdone,
    diet_remark: remarks,
    diet_errordesc: errordesc,
    diet_prsnresponsible: personresponsible,
    diet_actntkn: actiontaken,
    inpt_slno: id,
    user_slno: userslno(),
    diet_pao_flag: diestflag,
    user_code_save: userid,

  }

  //for edit


  const postdietpeadtricEdit = {
    diet_ysno: donotdone,
    diet_remark: remarks,
    diet_errordesc: errordesc,
    diet_prsnresponsible: personresponsible,
    diet_actntkn: actiontaken,
    inpt_slno: id,
    user_slno: userslno(),
    diet_pao_flag: diestflag,
    user_code_save: userid,
  }

  //  for submission 
  const submitFormData = async (e) => {
    e.preventDefault()

    const result = await axioslogin.get(`/common/user/${userid}`)
    const { success, data, message } = result.data
    if (success === 1) {
      const { us_code } = data[0]
      const frmdataa = {
        us_code: us_code
      }
      setuserid(frmdataa)
      // if save 
      if (value === 0) {

        // pediatric
        if (diestflag === '1') {
          const result = await axioslogin.post('/dietian', postdietpeadtric)
          const { success, message } = result.data
          if (success === 1) {
            succesNofity(message)
            setdistrue(true)
            // setfunc(postdietpeadtric)
          } else if (success === 2) {
            warningNofity(message)
          } else {
            errorNofity('Error Occured!!!Please Contact EDP')
          }
        }
        // adult
        else if (diestflag === '2') {
          const result = await axioslogin.post('/dietian', postdietpeadtric)
          const { success, message } = result.data
          if (success === 1) {
            succesNofity(message)
            setdistrue(true)
            // seteveningdata(evengdefaultstate)
          } else if (success === 2) {
            warningNofity(message)
          } else {
            errorNofity('Error Occured!!!Please Contact EDP')
          }
        }
        // obstricts
        else if (diestflag === '3') {
          const result = await axioslogin.post('/dietian', postdietpeadtric)
          const { success, message } = result.data
          if (success === 1) {
            succesNofity(message)
            setdistrue(true)
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
          setdistrue(true)
        } else if (success === 2) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }
    }
    else if (success === 0) {
      warningNofity(message)
    }
    else {
      errorNofity('Error Occured!!! Please Contact EDP')
    }
  }


  // usefect get previous data
  useEffect(() => {
    const dietitian = async () => {

      const result = await axioslogin.get(`dietian/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        const { diet_ysno, diet_remark, diet_errordesc, diet_prsnresponsible, diet_actntkn, diet_pao_flag } = data[0]
        setdietflag(diet_pao_flag)
        setDietdata({
          peadiatric: diet_pao_flag === '1' ? 1 : 0,
          Adults: diet_pao_flag === '2' ? 1 : 0,
          obstritcs: diet_pao_flag === '3' ? 1 : 0,
        })
        const frmData = {
          errordesc: diet_errordesc,
          personresponsible: diet_prsnresponsible,
          actiontaken: diet_actntkn
        }
        const frmdata1 = {

          remarks: diet_remark
        }
        setdonenotdone(diet_ysno)

        if (diet_ysno === '1') {
          setremarkdata(frmdata1)
          setdistrue(true)
        } else {
          setactiontakendata(frmData)
          setdistrue(true)
        }
      }
      else if (success === 0) {
        setdistrue(false)
        setValue(0)
      }
      else {
        warningNofity("Error Occured!!!Please Contact EDP")
      }
    }
    dietitian()
  }, [id])

  const [value, setValue] = useState(0)
  const { peadiatric, Adults, obstritcs } = dietdata
  // const dietdefaultsate = {
  //   errordesc: '',
  //   personresponsible: '',
  //   actiontaken: '',
  //   remarks: '',
  //   dietian: ''
  // }


  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault()
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  };
  const editdietian = () => {
    setdistrue(false)
  }

  return (
    <Fragment>
      <SessionCheck />
      <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} />
      <ToastContainer />
      <form
        onSubmit={handleClickOpen}
      >
        <Card className="card-body">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3 pt-1 ">
                <div className="row">
                  <Stack direction="row" spacing={4}>
                    <Avatar sx={peadiatric === 1 ? { bgcolor: '#f7c17e' } : null} >
                      <Tooltip title="Peadiatrics" placement="top">
                        <IconButton onClick={() => {

                          setdietflag('1')// set flag
                          setDietdata({
                            peadiatric: 1,
                            Adults: 0,
                            obstritcs: 0
                          })// for colur change
                        }}  >
                          <FaBaby size={25} />
                        </IconButton>
                      </Tooltip>
                    </Avatar>

                    <Avatar sx={Adults === 1 ? { bgcolor: '#f7c17e' } : null}>
                      <Tooltip title="Adults" placement="top">
                        <IconButton onClick={() => {

                          setdietflag('2')// set flag
                          setDietdata({
                            peadiatric: 0,
                            Adults: 1,
                            obstritcs: 0
                          })// for colur change
                        }}>
                          <GrRestroomWomen
                            size={25} />

                        </IconButton>
                      </Tooltip>
                    </Avatar>

                    <Avatar sx={obstritcs === 1 ? { bgcolor: '#f7c17e' } : null}>
                      <Tooltip title="Obsteritcs" placement="top">
                        <IconButton onClick={() => {

                          setdietflag('3')// set flag
                          setDietdata({
                            peadiatric: 0,
                            Adults: 0,
                            obstritcs: 1
                          })// for colur change
                        }}>
                          < MdOutlinePregnantWoman size={25} />
                          {/* <MdPregnantWoman  */}
                        </IconButton>
                      </Tooltip>
                    </Avatar>
                  </Stack>
                </div>
              </div>
              <div className="col-md-9">
                {diestflag === '1' ? <Dietititaincard setremarkdata={setremarkdata} setactiontakendata={setactiontakendata} actiontakendata={actiontakendata} setdonenotdonemain={setdonenotdone} remarkdata={remarkdata} donotdonemain={donotdone} distrue={distrue} /> : null}
                {diestflag === '2' ? <Dietititaincard setremarkdata={setremarkdata} setactiontakendata={setactiontakendata} actiontakendata={actiontakendata} setdonenotdonemain={setdonenotdone} remarkdata={remarkdata} donotdonemain={donotdone} distrue={distrue} /> : null}
                {diestflag === '3' ? <Dietititaincard setremarkdata={setremarkdata} setactiontakendata={setactiontakendata} actiontakendata={actiontakendata} setdonenotdonemain={setdonenotdone} remarkdata={remarkdata} donotdonemain={donotdone} distrue={distrue} /> : null}
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
              edit={editdietian} />
          </div>
        </div>
      </form>
    </Fragment >
  )
}

export default Dietitian
