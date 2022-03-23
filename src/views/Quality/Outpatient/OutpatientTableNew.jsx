import { Typography } from '@mui/material'
import React, { Fragment } from 'react'

const OutpatientTableNew = () => {
    return (
        <Fragment>
            <div className="card" >
                <div className="card-header py-0"
                //  style={CARD_HEADER_COLOR}
                >
                    {/* <div className="d-flex justify-content-between" >
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Out Patient List
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0 text-end" >
                                <IconButton aria-label="add" style={{ padding: "0rem" }} >
                                    <AlarmAddOutlinedIcon color="inherit" />
                                </IconButton>
                            </Typography>
                        </div>
                    </div> */}
                </div>
                <div className="card-header py-0"
                // style={CARD_SUB_HEADER_COLOR}
                >
                    <div className="d-flex justify-content-between" >

                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Patient#
                            </Typography>
                        </div>
                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Patient Name
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0">
                                Doctor Name
                            </Typography>
                        </div>
                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0 text-center" >
                                Visited Date
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0 text-center" >
                                Doctors OpVisited Date
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0 text-center" >
                                Consult Start Time
                            </Typography>
                        </div>
                        <div className="col-md-2">
                            <Typography variant="body2" gutterBottom className="my-0" >
                                Consult End time
                            </Typography>
                        </div>
                        <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0 text-center" >
                                Action
                            </Typography>
                        </div>
                        {/* <div className="col-md-1">
                            <Typography variant="body2" gutterBottom className="my-0 text-center" >
                                Edit
                            </Typography>
                        </div> */}


                    </div>
                </div>
                {/* <div className="previousAmentWindow">
                    <ul className="list-group list-group-flush" > */}
                {/* {children} */}
                {/* </ul>
                </div> */}

                <div className="card-footer py-0"
                // style={CARD_SUB_HEADER_COLOR}
                >
                </div>

            </div>


        </Fragment>
    )
}

export default OutpatientTableNew
