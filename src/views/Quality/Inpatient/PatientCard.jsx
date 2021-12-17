import React, { Fragment, useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { Card, CardActionArea, Stack } from '@mui/material'
import { CardContent, CardMedia } from '@material-ui/core'
import Avatar from '@mui/material/Avatar'

const PatientCard = (id) => {
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
    inpt_flag,
  } = data

  useEffect(() => {
    const getPatientdetl = async () => {
      const slno = id.id
      const result = await axioslogin.get(`/inpatientlist/getslno/${slno}`)
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
      <Card sx={{ maxWidth: 200, maxHeight: 800 }}>
        <CardActionArea>
          <CardMedia>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              alignItems="center"
              sx={{
                paddingTop: 4,
                backgroundColor: '#cfd8dc',
                paddingBottom: 8,
              }}
            >
              <Avatar
                alt="Remy Sharp"
                // src={ProfilePic}
                sx={{ width: 150, height: 150, opacity: 10, border: 2, borderColor: 'white' }}
              />
            </Stack>
          </CardMedia>

          <CardContent>
            <label style={{ fontWeight: 'bold', fontSize: '19px', alignContent: 'center' }}>
              {pt_no}
            </label>
            <br />
            <label style={{ fontWeight: 'bold' }}>{pt_name}</label> <label>({ptc_sex})</label>
            <br />
            <label style={{ fontWeight: 'bold' }}>Dr.{doc_name}</label>
            <br />
            <label style={{ fontWeight: 'bold' }}>Dr.{spc_desc}</label>
            <br />
            <label style={{ fontWeight: 'bold' }}>{ipd_date}</label>
            <br />
            <label style={{ fontWeight: 'bold' }}>{nsc_desc}</label>
            <br />
            <label style={{ fontWeight: 'bold' }}>{rcc_desc}</label>
            <label style={{ fontWeight: 'bold' }}>{bdc_no}</label>
            <label>({inpt_flag})</label>
            <br />
          </CardContent>
        </CardActionArea>
      </Card>
    </Fragment>
  )
}

export default memo(PatientCard)
