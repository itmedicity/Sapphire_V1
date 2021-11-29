import React, { Fragment, memo } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory, useParams } from 'react-router';

const Commonfoot = () => {
    const { id } = useParams()
    const history = useHistory()
    const gobackfunction = () => {
        history.push(`/Home/InpatientEdit/${id}`)

    }
    return (

        <Fragment>
            <div className="card-footet  text-black" style={{ backgroundColor: "#b6b8c3" }} >
                <SaveIcon style={{ color: "#558b2f", float: "left", width: "43", height: "43", paddingLeft: "5px" }} />
                <EditIcon style={{ color: "#000000", float: "left", width: "43", height: "43", paddingLeft: "5px" }} />
                <CancelIcon style={{ color: "#d50000", float: "left", width: "43", height: "43", paddingLeft: "5px" }} onClick={() =>
                    gobackfunction()
                } />

            </div>
        </Fragment>
    )
}

export default memo(Commonfoot)
