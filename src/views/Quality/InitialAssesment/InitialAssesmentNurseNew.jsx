import { Card } from '@mui/material'
import React, { Fragment } from 'react'
import TextInput from 'src/views/Component/TextInput'


const InitialAssesmentNurseNew = () => {
  return (
    <Fragment>
      <div className="card">
        <Card className="card-body">
          <div className="row">
            <div className="col-md-3  pb-1">
              <label htmlFor="test" className="form-label">
                Arrived Time
              </label>
              <TextInput
                id="test"
                type="datetime-local"
                classname="form-control form-control-sm"
                Placeholder="Arrived Time"
              />
            </div>
            <div className="col-md-3  pb-1">
              <label htmlFor="test" className="form-label">
                Initial Assessment start
              </label>
              <TextInput
                id="test"
                type="datetime-local"
                classname="form-control form-control-sm"
                Placeholder="Initial Assessment start"
              />
            </div>
            <div className="col-md-3  pb-1">
              <label htmlFor="test" className="form-label">
                Initial Assessment End
              </label>
              <TextInput
                id="test"
                type="year"
                classname="form-control form-control-sm"
                Placeholder="Initial Assessment End"
              />
            </div>
            <div className="col-md-3  pb-1">
              <label htmlFor="test" className="form-label">
                Remark
              </label>
              <TextInput classname="form-control form-control-sm" Placeholder="Remark" />
            </div>
          </div>
        </Card>
      </div>
    </Fragment>
  )
}

export default InitialAssesmentNurseNew
