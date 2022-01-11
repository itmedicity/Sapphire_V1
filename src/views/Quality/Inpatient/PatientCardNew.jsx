import { Avatar, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState, memo } from 'react'
import { useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'

const PatientCardNew = () => {
  const { id } = useParams()
  const [data, setdata] = useState({
    pt_name: '',
    pt_no: '',
    ipd_date: '',
    doc_name: '',
    bdc_no: '',
    ptc_sex: '',
    nsc_desc: '',
    inpt_flag: '',
  })
  const {
    pt_name,
    pt_no,
    ipd_date,
    doc_name,
    spc_desc,
    nsc_desc,
    bdc_no,
    rcc_desc,
    ptc_sex,

  } = data

  useEffect(() => {
    const getPatientdetl = async () => {
      const result = await axioslogin.get(`/inpatientlist/getslno/${id}`)
      const { data } = result.data
      const {
        pt_no,
        ptc_ptname,
        ipd_date,
        doc_name,
        spc_desc,
        nsc_desc,
        bdc_no,
        rcc_desc,
        ptc_sex,
        inpt_flag,
      } = data[0]

      const formdata = {
        pt_name: ptc_ptname,
        pt_no: pt_no,
        ipd_date: ipd_date,
        doc_name: doc_name,
        spc_desc: spc_desc,
        nsc_desc: nsc_desc,
        bdc_no: bdc_no,
        rcc_desc: rcc_desc,
        ptc_sex: ptc_sex,
        inpt_flag: inpt_flag,
      }
      setdata(formdata)
    }
    getPatientdetl()
  }, [id])

  return (
    <Fragment>
      <Card sx={{ height: 775, borderRadius: 8, boxShadow: 10 }}>
        <CardActionArea>
          <CardMedia>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              alignItems="center"
              sx={{ paddingTop: 4, paddingBottom: 4 }} >
              <Avatar
                alt="Remy Sharp"
                // src={ProfilePic}
                sx={{ width: 150, height: 150, opacity: 10, border: 2, borderColor: "white" }}
              />
            </Stack>
          </CardMedia>
          <CardContent className="d-flex flex-column justify-content-center  align-items-left" >
            <Typography gutterBottom variant="h5" component="div">
              Patient  Information
            </Typography>
            <Typography variant="button" display="block" gutterBottom>

              <label style={{ fontWeight: 'bold', fontSize: '19px', alignContent: 'center' }}>
                {pt_no}
              </label>
              <br />
              <label style={{ fontWeight: 'bold', fontSize: '15px' }}>{pt_name}</label> <label>({ptc_sex})</label>
              <br />
              <label style={{ fontWeight: 'bold' }}>Dr.{doc_name}</label>
              <br />
              <label style={{ fontWeight: 'bold' }}>{spc_desc}</label>
              <br />
              <label style={{ fontWeight: 'bold' }}>{ipd_date}</label>
              <br />
              <label style={{ fontWeight: 'bold' }}>{nsc_desc}</label>
              <br />
              <label style={{ fontWeight: 'bold' }}>{rcc_desc}</label>
              <label style={{ fontWeight: 'bold' }}>{bdc_no}</label>
              {/* <label>({inpt_flag})</label> */}
              <br />
            </Typography>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fragment>
  )
}

export default memo(PatientCardNew)



