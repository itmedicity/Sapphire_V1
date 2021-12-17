import React, { Fragment } from 'react'
import { Chip, IconButton } from '@mui/material'
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import { MdOutlineAddTask } from 'react-icons/md'

const FooterClosebtn = () => {
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
        </div>

      </div>
    </Fragment>
  )
}

export default FooterClosebtn

