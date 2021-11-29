import { Avatar, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { CardActions, Stack } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { Button } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'

const Indicatorlist = () => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card" style={{ backgroundColor: "#eff4f8" }} >
                <div className="card-body">
                    <div className="row p-0"  >
                        {/* first content starts*/}
                        <div className="col-md-3 col-sm-12" >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea >
                                    <CardMedia>
                                        <Stack
                                            direction="row"
                                            spacing={3}
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{ paddingTop: 4, backgroundColor: "#2f5c89", paddingBottom: 4 }} >
                                            <Avatar
                                                alt="Remy Sharp"
                                                // src={ProfilePic}
                                                sx={{ width: 150, height: 150, opacity: 10, border: 2, borderColor: "white" }}
                                            />
                                        </Stack>
                                    </CardMedia>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                        <div className="col-md-9 col-sm-12">
                            <div className="card"  >
                                <div className="card-header bg-dark pb-0 border border-dark text-white ">
                                    <h5>District</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(Indicatorlist)

