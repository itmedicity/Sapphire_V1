import { Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, Divider, Typography } from '@mui/material'
import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router';
import PatientCardNew from '../Inpatient/PatientCardNew'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import IntialAssessmentCasuality from './IntialAssessmentCasuality';
import ReturntoCasuality from './ReturntoCasuality';
import { MdPublishedWithChanges } from "react-icons/md";
import { green, pink, red } from '@mui/material/colors';
import { axioslogin } from 'src/views/Axios/Axios';

const CasualityEdit = () => {
  const { id } = useParams()
  const [flagsetvalue, setFlagvalue] = useState({
    casulflag: ''
  })

  //  destructure

  const {
    casulflag
  } = flagsetvalue



  useEffect(() => {
    ///complete or Pending
    const flagdetails = async () => {
      const result = await axioslogin.get(`/common/getcasflag/casflgdetl/${id}`)
      console.log(result)
      const { success, data } = result.data
      const {
        casualityian_flag,
        inpt_slno
      } = data[0]

      var setdata = {
        casulflag: casualityian_flag,
        inptslno: inpt_slno

      }

      setFlagvalue(setdata)
    }
    flagdetails()
  }, [setFlagvalue])

  return (
    <Fragment>
      <div className="card "
        style={
          {
            borderRadius: 20,
            top: '10%',
            bottom: '10%',
          }
        }
      >
        <CardHeader
          titleTypographyProps={{
            variant: 'button',
          }}
          title="Quality Indicators"
          sx={{
            textAlign: "left",
            paddingY: 1
          }}
        />
        <Divider variant="middle" />
        <div className="card-body align-items-around"
          style={
            {
              backgroundColor: '#EEF4F7',
              height: '50%'
            }
          } >
          <div className="row g-1 ">
            <div className="col-md-3 col-sm-12 d-flex justify-content-around ">
              <PatientCardNew />
            </div>
            <div className="col-md-9 justify-content-around">
              <div className="col-md-11 col-lg-12">
                <Card sx={{ borderRadius: 8, boxShadow: 10 }}>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#ffebee'
                      }}
                      expandIcon={<MdPublishedWithChanges size={25} style={casulflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      align="center"
                    >
                      <Typography display="block" fontSize={18}>  Initial Assessment Nurse </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <IntialAssessmentCasuality />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#fce4ec'
                      }}
                      expandIcon={<MdPublishedWithChanges size={25} />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography fontSize={18} display="block"> Return To Emergency</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <ReturntoCasuality />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CasualityEdit
