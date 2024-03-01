import React from 'react'
import "./HomeMyCoursesWork.scss"
import {Container, Icon} from "semantic-ui-react"
import { map } from 'lodash'
import {itemsData} from "./HomeMyCoursesWork.data";

export function HomeMyCoursesWork() {
  return (
    <Container className='how-my-courses-work'>
        <h2>¿Que es esto?</h2>
        <div className='how-my-courses-work__items'>
            {map(itemsData, (item, index) =>(
                <div key={index}>
                    <div>
                        <Icon name={item.icon} />
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </Container>
  )
}
