import React from 'react'
import DriveComponent from '../components/driveComponent'
import withLazyLoader from '@/components/withLazyLoader'
import DriveData from '@/components/driveData'

function Drive() {
  return (
    <div className="drive-holder">
      
    <DriveComponent />
    <div className="data-css">
    <DriveData />
    </div>

    </div>
  )
}

export default withLazyLoader(Drive);