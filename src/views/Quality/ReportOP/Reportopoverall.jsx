import { LinearProgress, Typography } from '@mui/material'
import React, { Fragment, Suspense } from 'react'
// import DropDownList from './DropDownList'
import { rows } from './Monthdata'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const Reportopoverall = ({ monthdetl, sumdetl }) => {
    console.log(monthdetl)
    // console.log(sumdetl)



    return (
        <Fragment>
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
                                    {/* <Suspense fallback={<LinearProgress />} > */}
                                    {
                                        monthdetl.map((name) => {
                                            return <tr key={name.dep_name}  >
                                                <Suspense fallback={<LinearProgress />} >
                                                    <td width="100" style={{ backgroundColor: '#dbe8dc' }}>{name.dep_name}</td>
                                                    <td width="100">{name.Jan_opdwttime}</td>
                                                    <td width="100">{name.Jan_opdtotpt}</td>
                                                    <td width="100">{name.Jan_avg_opdwtime}</td>
                                                    <td width="100">{name.Feb_opdwttime}</td>
                                                    <td width="100">{name.Feb_opdtotpt}</td>
                                                    <td width="100">{name.Feb_avg_opdwtime}</td>
                                                    <td width="100">{name.Mar_opdwttime}</td>
                                                    <td width="100">{name.Mar_opdtotpt}</td>
                                                    <td width="100">{name.Mar_avg_opdwtime}</td>
                                                    <td width="100">{name.Aprl_opdwttime}</td>
                                                    <td width="100">{name.Aprl_opdtotpt}</td>
                                                    <td width="100">{name.Aprl_avg_opdwtime}</td>
                                                    <td width="100">{name.May_opdwttime}</td>
                                                    <td width="100">{name.May_opdtotpt}</td>
                                                    <td width="100">{name.May_avg_opdwtime}</td>
                                                    <td width="100">{name.Jun_opdwttime}</td>
                                                    <td width="100">{name.Jun_opdtotpt}</td>
                                                    <td width="100">{name.Jun_avg_opdwtime}</td>
                                                    <td width="100">{name.July_opdwttime}</td>
                                                    <td width="100">{name.July_opdtotpt}</td>
                                                    <td width="100">{name.July_avg_opdwtime}</td>
                                                    <td width="100">{name.Aug_opdwttime}</td>
                                                    <td width="100">{name.Aug_opdtotpt}</td>
                                                    <td width="100">{name.Aug_avg_opdwtime}</td>
                                                    <td width="100">{name.Sept_opdwttime}</td>
                                                    <td width="100">{name.Sept_opdtotpt}</td>
                                                    <td width="100">{name.Sept_avg_opdwtime}</td>
                                                    <td width="100">{name.Oct_opdwttime}</td>
                                                    <td width="100">{name.Oct_opdtotpt}</td>
                                                    <td width="100">{name.Oct_avg_opdwtime}</td>
                                                    <td width="100">{name.Nov_opdwttime}</td>
                                                    <td width="100">{name.Nov_opdtotpt}</td>
                                                    <td width="100">{name.Nov_avg_opdwtime}</td>
                                                    <td width="100">{name.Dec_opdwttime}</td>
                                                    <td width="100">{name.Dec_opdtotpt}</td>
                                                    <td width="100">{name.Dec_avg_opdwtime}</td>
                                                </Suspense>
                                            </tr>
                                        })
                                    }
                                    {/* {
                                        monthdetl.map((name) => {
                                            return <tr key={name.dep_name}  >
                                            </tr>
                                        })

                                    } */}

                                    {/* <tr>
                                        <td width="100">Total Waiting
                                        </td>
                                        <td width="100">fhgf</td>
                                        <td width="100">dfg</td>
                                        <td width="100">fdg</td>
                                        <td width="100">gdf</td>
                                        <td width="100">gdf</td>
                                        <td width="100">fhgf</td>
                                        <td width="100">errew</td>
                                        <td width="100">fdg</td>
                                        <td width="100">gdf</td>
                                        <td width="100">gdf</td>
                                        <td width="100">fhgf</td>
                                        <td width="100">dfg</td>
                                        <td width="100">fdg</td>
                                        <td width="100">gdf</td>
                                        <td width="100">gdf</td>
                                        <td width="100">fhgf</td>
                                        <td width="100">dfg</td>
                                        <td width="100">fdg</td>
                                        <td width="100">gdf</td>
                                        <td width="100">gdf</td>
                                        <td width="100">fhgf</td>
                                        <td width="100">dfg</td>
                                        <td width="100">fdg</td>
                                        <td width="100">gdf</td>
                                        <td width="100">gdf</td>
                                        <td width="100">fhgf</td>
                                        <td width="100">dfg</td>
                                        <td width="100">fdg</td>
                                        <td width="100">gdf</td>
                                        <td width="100">gdf</td>
                                        <td width="100">fhgf</td>
                                        <td width="100">dfg</td>
                                        <td width="100">fdg</td>
                                        <td width="100">gdf</td>
                                        <td width="100">gdf</td>
                                        <td width="100">gdf</td>
                                    </tr> */}
                                    {/* </Suspense> */}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className='p-8'
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

export default Reportopoverall
