import React, { Fragment } from 'react'
import { Chip, IconButton } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { MdOutlineAddTask } from 'react-icons/md'
// BiEditAlt

const FooterClosebtn = (props) => {
  const { edit } = props
  return (
    <Fragment>
      <div className="col-md-12 col-sm-4 d-flex flex-row justify-content-md-end">
        <div style={{ marginRight: "0.5rem" }}>
          <Chip
            icon={
              <IconButton type="submit" >
                <MdOutlineAddTask className="text-info p-0" size={22} />
              </IconButton>
            }
            label="Save"
          // disabled={props.disable}
          // clickable={true}
          />


          <Chip
            icon={
              <IconButton className="p-1" >
                <ModeEditIcon className="text-info" size={22} />
              </IconButton>
            }
            label="Edit"
            onClick={edit}
            // value={value}
            clickable={true}
          />
        </div>
      </div>


    </Fragment>
  )
}

export default FooterClosebtn

