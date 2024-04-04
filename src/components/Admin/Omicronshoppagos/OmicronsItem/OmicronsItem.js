import React from 'react'
import {} from "semantic-ui-react"

export function OmicronsItem(props) {
    const {reportekeyla, onReload} = props

  return (
    <div>
        <span>{reportekeyla.cardcode}</span>
    </div>
  )
}
