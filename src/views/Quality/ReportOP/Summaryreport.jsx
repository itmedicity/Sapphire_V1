


import { LinearProgress, Typography } from '@mui/material'
import React, { Fragment, useEffect, Suspense } from 'react'
import { rows } from './Monthdetl'
import { axioslogin } from 'src/views/Axios/Axios'
import { useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const Summaryreport = ({ monthdetl, mnthavgdetl, sumdetl, arraydata }) => {
    arraydata.map((val) => {
        console.log(val)
    })


    const d1 = arraydata.map((val) => {
        const dataone = {
            benhmark_vlue: val.Mar_opdwttime / val.Mar_opdtotpt
        }
    })


    console.log(arraydata)
    const [bench, setbench] = useState(0)

    useEffect(() => {
        const getbenchmarkdetl = async () => {
            const result = await axioslogin.get(`reportop/getdetls/`)
            console.log(result)
            const { data,
                message,
                success } = result.data;
            if (success === 3) {
                const { benhmark_vlue
                } = data[0]
                const frmdata = {
                    benhmark_vlue: benhmark_vlue,
                }
                setbench(frmdata)
            }
        }
        getbenchmarkdetl()

    }, [])
    return (
        < Fragment >
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className='table-responsive table-responsive-md' >
                            <table className="table table-sm table-bordered planTable " id="patientdetl" >
                                <thead>
                                    <tr>
                                        {
                                            rows.map((val) => {
                                                return <th width="100" className='text-center' style={{ backgroundColor: '#dbe8dc', fontWeight: "bold" }}
                                                    key={val.data}
                                                // style={val.sunday === '0' ? { color: "#cb5966", backgroundColor: "#a6b2b5" } : null}
                                                >
                                                    <Typography variant="subtitle2">
                                                        {val.data}
                                                    </Typography>
                                                </th>
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <Suspense fallback={<LinearProgress />} >
                                        {
                                            arraydata.map((name) => {
                                                return <tr key={name.Jan_opdwttime}  >
                                                    <Suspense fallback={<LinearProgress />} >
                                                        <td width="100" style={{ backgroundColor: '#dbe8dc' }}>OPD Waiting Time for service and patients Consultation</td>
                                                        <td>Sum(Patient time for conultation/Procedure
                                                            patient reporting time in opd/Diagnostics</td>
                                                        <td width="100">{name.Jan_opdwttime}</td>
                                                        <td width="100">{name.Feb_opdwttime}</td>
                                                        <td width="100">{name.Mar_opdwttime}</td>
                                                        <td width="100">{name.Aprl_opdwttime}</td>
                                                        <td width="100">{name.May_opdwttime}</td>
                                                        <td width="100">{name.Jun_opdwttime}</td>
                                                        <td width="100">{name.July_opdwttime}</td>
                                                        <td width="100">{name.Aug_opdwttime}</td>
                                                        <td width="100">{name.Sept_opdwttime}</td>
                                                        <td width="100">{name.Oct_opdwttime}</td>
                                                        <td width="100">{name.Nov_opdwttime}</td>
                                                        <td width="100">{name.Dec_opdwttime}</td>
                                                    </Suspense>
                                                </tr>
                                            })

                                        }

                                    </Suspense>
                                    <Suspense fallback={<LinearProgress />} >
                                        {
                                            arraydata.map((name) => {
                                                return <tr key={name.Jan_opdtotpt}  >
                                                    <Suspense fallback={<LinearProgress />} >
                                                        <td width="100" style={{ backgroundColor: '#dbe8dc' }}></td>
                                                        <td>Number of patients reported in OPD/Diagnostics</td>
                                                        <td width="100">{name.Jan_opdtotpt}</td>
                                                        <td width="100">{name.Feb_opdtotpt}</td>
                                                        <td width="100">{name.Mar_opdtotpt}</td>
                                                        <td width="100">{name.Aprl_opdtotpt}</td>
                                                        <td width="100">{name.May_opdtotpt}</td>
                                                        <td width="100">{name.Jun_opdtotpt}</td>
                                                        <td width="100">{name.July_opdtotpt}</td>
                                                        <td width="100">{name.Aug_opdtotpt}</td>
                                                        <td width="100">{name.Sept_opdtotpt}</td>
                                                        <td width="100">{name.Oct_opdtotpt}</td>
                                                        <td width="100">{name.Nov_opdtotpt}</td>
                                                        <td width="100">{name.Dec_opdtotpt}</td>
                                                    </Suspense>
                                                </tr>
                                            })

                                        }

                                    </Suspense>

                                    <Suspense fallback={<LinearProgress />} >
                                        {
                                            arraydata.map((val) => {
                                                const detil1 = (parseFloat(val.Jan_opdwttime) / parseFloat(val.Jan_opdtotpt == 0 ? 1 : val.Jan_opdtotpt)).toFixed(4)
                                                const detil2 = (parseFloat(val.Feb_opdwttime) / parseFloat(val.Feb_opdtotpt == 0 ? 1 : val.Feb_opdtotpt)).toFixed(4)
                                                const detil3 = (parseFloat(val.Mar_opdwttime) / parseFloat(val.Mar_opdtotpt == 0 ? 1 : val.Mar_opdtotpt)).toFixed(4)
                                                const detil4 = (parseFloat(val.Aprl_opdwttime) / parseFloat(val.Aprl_opdtotpt == 0 ? 1 : val.Aprl_opdtotpt)).toFixed(4)
                                                const detil5 = (parseFloat(val.May_opdwttime) / parseFloat(val.May_opdtotpt == 0 ? 1 : val.May_opdtotpt)).toFixed(4)
                                                const detil6 = (parseFloat(val.Jun_opdwttime) / parseFloat(val.Jun_opdtotpt == 0 ? 1 : val.Jun_opdtotpt)).toFixed(4)
                                                const detil7 = (parseFloat(val.July_opdwttime) / parseFloat(val.July_opdtotpt == 0 ? 1 : val.July_opdtotpt)).toFixed(4)
                                                const detil8 = (parseFloat(val.Aug_opdwttime) / parseFloat(val.Aug_opdtotpt == 0 ? 1 : val.Aug_opdtotpt)).toFixed(4)
                                                const detil9 = (parseFloat(val.Sept_opdwttime) / parseFloat(val.Sept_opdtotpt == 0 ? 1 : val.Sept_opdtotpt)).toFixed(4)
                                                const detil10 = (parseFloat(val.Oct_opdwttime) / parseFloat(val.Oct_opdtotpt == 0 ? 1 : val.Oct_opdtotpt)).toFixed(4)
                                                const detil11 = (parseFloat(val.Nov_opdwttime) / parseFloat(val.Nov_opdtotpt == 0 ? 1 : val.Nov_opdtotpt)).toFixed(4)
                                                const detil12 = (parseFloat(val.Dec_opdwttime) / parseFloat(val.Dec_opdtotpt == 0 ? 1 : val.Dec_opdtotpt)).toFixed(4)



                                                // console.log(detil1)
                                                // console.log(detil2)
                                                // console.log(detil3)
                                                // console.log(detil4)

                                                return <tr key={val.Jan_opdwttime}  >
                                                    <Suspense fallback={<LinearProgress />} >
                                                        <td width="100" style={{ backgroundColor: '#dbe8dc' }}></td>
                                                        <td>Result </td>
                                                        <td width="100">{detil1}</td>
                                                        <td width="100">{detil2}</td>
                                                        <td width="100">{detil3}</td>
                                                        <td width="100">{detil4}</td>
                                                        <td width="100">{detil5}</td>
                                                        <td width="100">{detil6}</td>
                                                        <td width="100">{detil7}</td>
                                                        <td width="100">{detil8}</td>
                                                        <td width="100">{detil9}</td>
                                                        <td width="100">{detil10}</td>
                                                        <td width="100">{detil11}</td>
                                                        <td width="100">{detil12}</td>
                                                    </Suspense>
                                                </tr>


                                            })


                                        }

                                    </Suspense>

                                    <Suspense fallback={<LinearProgress />} >
                                        {
                                            <tr>
                                                <Suspense fallback={<LinearProgress />} >
                                                    <td width="100" style={{ backgroundColor: '#dbe8dc' }}></td>
                                                    <td>BenchMark</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                    <td width="100">{bench.benhmark_vlue}</td>
                                                </Suspense>
                                            </tr>
                                        }

                                    </Suspense>

                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div
                            >
                                <ReactHTMLTableToExcel
                                    className="btn btn-info"
                                    table="patientdetl"
                                    filename="ReportExcel"
                                    sheet="Sheet"
                                    buttonText="Export excel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default Summaryreport



