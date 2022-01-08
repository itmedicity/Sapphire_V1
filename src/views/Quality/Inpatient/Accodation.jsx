import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { green, red } from '@mui/material/colors';
import { MdPublishedWithChanges } from "react-icons/md";

const Accodation = ({ children, style, flagNurse, nameheading }) => {

    return (
        <Fragment>
            <Accordion>
                <AccordionSummary
                    style={style}
                    expandIcon={<MdPublishedWithChanges size={25} style={flagNurse === 'Y' ? { color: green[500] } : { color: red[500] }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    align="center"
                >
                    <Typography display="block" fontSize={18}> {nameheading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component={'span'} variant={'body2'}>
                        {children}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    )
}

export default Accodation
