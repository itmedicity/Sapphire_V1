import { IconButton } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
// import PageLayoutCloseOnly from '../../CommonCode/PageLayoutCloseOnly'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
// import Moment from 'moment'
// import { extendMoment } from 'moment-range';
import { addDays, eachDayOfInterval, format } from 'date-fns'
import { useState, useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
// import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
// import DutyPlanningMainCard from './DutyPlanningMainCard'
import { useHistory } from 'react-router'
import Summaryreport from './Summaryreport'

const SummaryOpreport = () => {


    const history = useHistory()
    const { selectedDept, selectDeptSection } = useContext(PayrolMasterContext)
    //use state for employee details
    const [empData, setempData] = useState([])
    //use State for Date Format
    const [dateFormat, setdateFormat] = useState([])
    const [duty, setDuty] = useState(0)

    const [disable, setdisable] = useState(true)
    const [monthdetl, setMonthdetl] = useState([])
    const [mnthavgdetl, setmnthavgdetl] = useState([])
    const [sumdetl, setsumdetl] = useState(0)

    const [arraydata, setarray] = useState([])
    console.log(arraydata)
    console.log(monthdetl)
    //use state for initial start date and end date
    const [formData, setFormData] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
    })
    //de structuring
    const { startDate, endDate } = formData
    //getting form data
    const updateDutyPlanning = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    //date validations
    const maxdate = addDays(new Date(startDate), 30)
    // const maxdatee = moment(maxdate).format('YYYY-MM-DD')





    // use effect getting the employee details of the selected department and department section
    useEffect(() => {
        //post data for getting employee details
        const getmonthlydetl = async () => {
            const result = await axioslogin.get(`reportop/`)
            const { data } = result.data
            const arry1 = []
            const d1 = data.map((val) => {
                const dataone = {
                    dep_name: val.dpc_desc,
                    Jan_opdwttime: val.createddate === 1 ? val.sumopd_wattime : 0,
                    Jan_opdtotpt: val.createddate === 1 ? val.opdpt_count : 0,
                    Jan_avg_opdwtime: val.createddate === 1 ? val.avg_opdwtime : 0,
                    Feb_opdwttime: val.createddate === 2 ? val.sumopd_wattime : 0,
                    Feb_opdtotpt: val.createddate === 2 ? val.opdpt_count : 0,
                    Feb_avg_opdwtime: val.createddate === 2 ? val.avg_opdwtime : 0,
                    Mar_opdwttime: val.createddate === 3 ? val.sumopd_wattime : 0,
                    Mar_opdtotpt: val.createddate === 3 ? val.opdpt_count : 0,
                    Mar_avg_opdwtime: val.createddate === 3 ? val.avg_opdwtime : 0,
                    Aprl_opdwttime: val.createddate === 4 ? val.sumopd_wattime : 0,
                    Aprl_opdtotpt: val.createddate === 4 ? val.opdpt_count : 0,
                    Aprl_avg_opdwtime: val.createddate === 4 ? val.avg_opdwtime : 0,
                    May_opdwttime: val.createddate === 5 ? val.sumopd_wattime : 0,
                    May_opdtotpt: val.createddate === 5 ? val.opdpt_count : 0,
                    May_avg_opdwtime: val.createddate === 5 ? val.avg_opdwtime : 0,
                    Jun_opdwttime: val.createddate === 6 ? val.sumopd_wattime : 0,
                    Jun_opdtotpt: val.createddate === 6 ? val.opdpt_count : 0,
                    Jun_avg_opdwtime: val.createddate === 6 ? val.avg_opdwtime : 0,
                    July_opdwttime: val.createddate === 7 ? val.sumopd_wattime : 0,
                    July_opdtotpt: val.createddate === 7 ? val.opdpt_count : 0,
                    July_avg_opdwtime: val.createddate === 7 ? val.avg_opdwtime : 0,
                    Aug_opdwttime: val.createddate === 8 ? val.sumopd_wattime : 0,
                    Aug_opdtotpt: val.createddate === 8 ? val.opdpt_count : 0,
                    Aug_avg_opdwtime: val.createddate === 8 ? val.avg_opdwtime : 0,
                    Sept_opdwttime: val.createddate === 9 ? val.sumopd_wattime : 0,
                    Sept_opdtotpt: val.createddate === 9 ? val.opdpt_count : 0,
                    Sept_avg_opdwtime: val.createddate === 9 ? val.avg_opdwtime : 0,
                    Oct_opdwttime: val.createddate === 10 ? val.sumopd_wattime : 0,
                    Oct_opdtotpt: val.createddate === 10 ? val.opdpt_count : 0,
                    Oct_avg_opdwtime: val.createddate === 10 ? val.avg_opdwtime : 0,
                    Nov_opdwttime: val.createddate === 11 ? val.sumopd_wattime : 0,
                    Nov_opdtotpt: val.createddate === 11 ? val.opdpt_count : 0,
                    Nov_avg_opdwtime: val.createddate === 11 ? val.avg_opdwtime : 0,
                    Dec_opdwttime: val.createddate === 12 ? val.sumopd_wattime : 0,
                    Dec_opdtotpt: val.createddate === 12 ? val.opdpt_count : 0,
                    Dec_avg_opdwtime: val.createddate === 12 ? val.avg_opdwtime : 0,
                }

                const id = arry1.find((element) => {
                    return element.dep_name !== val.dpc_desc
                })

                arry1.push(dataone)
                return dataone
            })


            var o = {};

            arry1.forEach((i) => {
                // console.log(i)
                var dep_name = i.dep_name;
                i.May_avg_opdwtime = parseFloat(i.May_avg_opdwtime)
                i.May_opdtotpt = parseFloat(i.May_opdtotpt)
                i.Aprl_avg_opdwtime = parseFloat(i.Aprl_avg_opdwtime)
                i.Aprl_opdtotpt = parseFloat(i.Aprl_opdtotpt)
                i.Aprl_opdwttime = parseFloat(i.Aprl_opdwttime)
                i.Aug_avg_opdwtime = parseFloat(i.Aug_avg_opdwtime)
                i.Aug_opdtotpt = parseFloat(i.Aug_opdtotpt)
                i.Aug_opdwttime = parseFloat(i.Aug_opdwttime)
                i.Dec_avg_opdwtime = parseFloat(i.Dec_avg_opdwtime)
                i.Dec_opdtotpt = parseFloat(i.Dec_opdtotpt)
                i.Dec_opdwttime = parseFloat(i.Dec_opdwttime)
                i.Feb_avg_opdwtime = parseFloat(i.Feb_avg_opdwtime)
                i.Feb_opdtotpt = parseFloat(i.Feb_opdtotpt)
                i.Feb_opdwttime = parseFloat(i.Feb_opdwttime)
                i.Jan_avg_opdwtime = parseFloat(i.Jan_avg_opdwtime)
                i.Jan_opdtotpt = parseFloat(i.Jan_opdtotpt)
                i.Jan_opdwttime = parseFloat(i.Jan_opdwttime)
                i.July_avg_opdwtime = parseFloat(i.July_avg_opdwtime)
                i.July_opdtotpt = parseFloat(i.July_opdtotpt)
                i.July_opdwttime = parseFloat(i.July_opdwttime)
                i.Jun_avg_opdwtime = parseFloat(i.Jun_avg_opdwtime)
                i.Jun_opdtotpt = parseFloat(i.Jun_opdtotpt)
                i.Jun_opdwttime = parseFloat(i.Jun_opdwttime)
                i.Mar_avg_opdwtime = parseFloat(i.Mar_avg_opdwtime)
                i.Mar_opdtotpt = parseFloat(i.Mar_opdtotpt)
                i.Mar_opdwttime = parseFloat(i.Mar_opdwttime)
                i.May_avg_opdwtime = parseFloat(i.May_avg_opdwtime)
                i.May_opdtotpt = parseFloat(i.May_opdtotpt)
                i.May_opdwttime = parseFloat(i.May_opdwttime)
                i.Nov_avg_opdwtime = parseFloat(i.Nov_avg_opdwtime)
                i.Nov_opdtotpt = parseFloat(i.Nov_opdtotpt)
                i.Nov_opdwttime = parseFloat(i.Nov_opdwttime)
                i.Oct_avg_opdwtime = parseFloat(i.Oct_avg_opdwtime)
                i.Oct_opdtotpt = parseFloat(i.Oct_opdtotpt)
                i.Oct_opdwttime = parseFloat(i.Oct_opdwttime)
                i.Sept_avg_opdwtime = parseFloat(i.Sept_avg_opdwtime)
                i.Sept_opdtotpt = parseFloat(i.Sept_opdtotpt)
                i.Sept_opdwttime = parseFloat(i.Sept_opdwttime)
                if (!o[dep_name]) {
                    // console.log(i)
                    return o[dep_name] = i

                }
                o[dep_name].Aprl_avg_opdwtime = o[dep_name].Aprl_avg_opdwtime + i.Aprl_avg_opdwtime
                o[dep_name].Aprl_opdtotpt = o[dep_name].Aprl_opdtotpt + i.Aprl_opdtotpt
                o[dep_name].Aprl_opdwttime = o[dep_name].Aprl_opdwttime + i.Aprl_opdwttime
                o[dep_name].Aug_avg_opdwtime = o[dep_name].Aug_avg_opdwtime + i.Aug_avg_opdwtime
                o[dep_name].Aug_opdtotpt = o[dep_name].Aug_opdtotpt + i.Aug_opdtotpt
                o[dep_name].Aug_opdwttime = o[dep_name].Aug_opdwttime + i.Aug_opdwttime
                o[dep_name].Dec_avg_opdwtime = o[dep_name].Dec_avg_opdwtime + i.Dec_avg_opdwtime
                o[dep_name].Dec_opdtotpt = o[dep_name].Dec_opdtotpt + i.Dec_opdtotpt
                o[dep_name].Dec_opdwttime = o[dep_name].Dec_opdwttime + i.Dec_opdwttime
                o[dep_name].Feb_avg_opdwtime = o[dep_name].Feb_avg_opdwtime + i.Feb_avg_opdwtime
                o[dep_name].Feb_opdtotpt = o[dep_name].Feb_opdtotpt + i.Feb_opdtotpt
                o[dep_name].Feb_opdwttime = o[dep_name].Feb_opdwttime + i.Feb_opdwttime
                o[dep_name].Jan_avg_opdwtime = o[dep_name].Jan_avg_opdwtime + i.Jan_avg_opdwtime
                o[dep_name].Jan_opdtotpt = o[dep_name].Jan_opdtotpt + i.Jan_opdtotpt
                o[dep_name].Jan_opdwttime = o[dep_name].Jan_opdwttime + i.Jan_opdwttime
                o[dep_name].July_avg_opdwtime = o[dep_name].July_avg_opdwtime + i.July_avg_opdwtime
                o[dep_name].July_opdtotpt = o[dep_name].July_opdtotpt + i.July_opdtotpt
                o[dep_name].July_opdwttime = o[dep_name].July_opdwttime + i.July_opdwttime
                o[dep_name].Jun_avg_opdwtime = o[dep_name].Jun_avg_opdwtime + i.Jun_avg_opdwtime
                o[dep_name].Jun_opdtotpt = o[dep_name].Jun_opdtotpt + i.Jun_opdtotpt
                o[dep_name].Jun_opdwttime = o[dep_name].Jun_opdwttime + i.Jun_opdwttime
                o[dep_name].Mar_avg_opdwtime = o[dep_name].Mar_avg_opdwtime + i.Mar_avg_opdwtime
                o[dep_name].Mar_opdtotpt = o[dep_name].Mar_opdtotpt + i.Mar_opdtotpt
                o[dep_name].Mar_opdwttime = o[dep_name].Mar_opdwttime + i.Mar_opdwttime
                o[dep_name].May_avg_opdwtime = o[dep_name].May_avg_opdwtime + i.May_avg_opdwtime
                o[dep_name].May_opdtotpt = o[dep_name].May_opdtotpt + i.May_opdtotpt
                o[dep_name].May_opdwttime = o[dep_name].May_opdwttime + i.May_opdwttime
                o[dep_name].Nov_avg_opdwtime = o[dep_name].Nov_avg_opdwtime + i.Nov_avg_opdwtime
                o[dep_name].Nov_opdtotpt = o[dep_name].Nov_opdtotpt + i.Nov_opdtotpt
                o[dep_name].Nov_opdwttime = o[dep_name].Nov_opdwttime + i.Nov_opdwttime
                o[dep_name].Oct_avg_opdwtime = o[dep_name].Oct_avg_opdwtime + i.Oct_avg_opdwtime
                o[dep_name].Oct_opdtotpt = o[dep_name].Oct_opdtotpt + i.Oct_opdtotpt
                o[dep_name].Oct_opdwttime = o[dep_name].Oct_opdwttime + i.Oct_opdwttime
                o[dep_name].Sept_avg_opdwtime = o[dep_name].Sept_avg_opdwtime + i.Sept_avg_opdwtime
                o[dep_name].Sept_opdtotpt = o[dep_name].Sept_opdtotpt + i.Sept_opdtotpt
                o[dep_name].Sept_opdwttime = o[dep_name].Sept_opdwttime + i.Sept_opdwttime
                return o[dep_name]
            })
            var a2 = []
            var a3 = []
            Object.keys(o).forEach((key) => {
                a2.push(o[key])
            })
            const resultt = a2.reduce(
                (a, c) => (Object.keys(c).forEach(k => (a[k] = (a[k] || 0) + c[k])), a), {}
            );

            const darasad = {
                Aprl_avg_opdwtime: resultt.Aprl_avg_opdwtime,
                Aprl_opdtotpt: resultt.Aprl_opdtotpt,
                Aprl_opdwttime: resultt.Aprl_opdwttime,
                Aug_avg_opdwtime: resultt.Aug_avg_opdwtime,
                Aug_opdtotpt: resultt.Aug_opdtotpt,
                Aug_opdwttime: resultt.Aug_opdwttime,
                Dec_avg_opdwtime: resultt.Dec_avg_opdwtime,
                Dec_opdtotpt: resultt.Dec_opdtotpt,
                Dec_opdwttime: resultt.Dec_opdwttime,
                Feb_avg_opdwtime: resultt.Feb_avg_opdwtime,
                Feb_opdtotpt: resultt.Feb_opdtotpt,
                Feb_opdwttime: resultt.Feb_opdwttime,
                Jan_avg_opdwtime: resultt.Jan_avg_opdwtime,
                Jan_opdtotpt: resultt.Jan_opdtotpt,
                Jan_opdwttime: resultt.Jan_opdwttime,
                July_avg_opdwtime: resultt.July_avg_opdwtime,
                July_opdtotpt: resultt.July_opdtotpt,
                July_opdwttime: resultt.July_opdwttime,
                Jun_avg_opdwtime: resultt.Jun_avg_opdwtime,
                Jun_opdtotpt: resultt.Jun_opdtotpt,
                Jun_opdwttime: resultt.Jun_opdwttime,
                Mar_avg_opdwtime: resultt.Mar_avg_opdwtime,
                Mar_opdtotpt: resultt.Mar_opdtotpt,
                Mar_opdwttime: resultt.Mar_opdwttime,
                May_avg_opdwtime: resultt.May_avg_opdwtime,
                May_opdtotpt: resultt.May_opdtotpt,
                May_opdwttime: resultt.May_opdwttime,
                Nov_avg_opdwtime: resultt.Nov_avg_opdwtime,
                Nov_opdtotpt: resultt.Nov_opdtotpt,
                Nov_opdwttime: resultt.Nov_opdwttime,
                Oct_avg_opdwtime: resultt.Oct_avg_opdwtime,
                Oct_opdtotpt: resultt.Oct_opdtotpt,
                Oct_opdwttime: resultt.Oct_opdwttime,
                Sept_avg_opdwtime: resultt.Sept_avg_opdwtime,
                Sept_opdtotpt: resultt.Sept_opdtotpt,
                Sept_opdwttime: resultt.Sept_opdwttime,
            }
            // console.log(darasad)
            a3.push(darasad)
            setMonthdetl(a2.concat(a3))
            setarray(a3)

        }
        getmonthlydetl()



    }, [selectedDept, selectDeptSection])




    return (
        <Fragment>
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>OPD Consolidated Report
                    </h5>
                </div>
                <div className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <Summaryreport monthdetl={monthdetl}
                                mnthavgdetl={mnthavgdetl}
                                sumdetl={sumdetl}
                                arraydata={arraydata} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SummaryOpreport