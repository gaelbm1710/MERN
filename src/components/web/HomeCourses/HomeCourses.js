import React,{useState,useEffect} from 'react';
import {Container} from "semantic-ui-react";
import { Course } from '../../../api';
import "./HomeCourses.scss"

const courseController = new Course();

export function HomeCourses() {
    const [courses, setCourses] = useState(null)
    useEffect(() => {
      (async ()=>{
        try {
            const response = await courseController.getCourses({limit:6});
            setCourses(response.docs);
            console.log(courses);
        } catch (error) {
            console.error(error)
        }
      })()
    }, [])
    
  return (
    <Container className='home-courses'>
      
    </Container>
  )
}
