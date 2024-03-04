import React, {useState, useEffect} from 'react';
import {Course} from "../../../../api";
import {size, map} from "lodash";
import { Loader, Pagination} from 'semantic-ui-react';
import {CourseItem} from "../CourseItem";
import "./ListCourses.scss";

const courseController = new Course();
export function ListCourses(props) {
    const {reload, onReload, onClose} = props;
    const [courses, setCourses] = useState(false);
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState()
    useEffect(() => {
        (async () =>{
            try {
                const response = await courseController.getCourses({page, limit: 10});
                setCourses(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.totalPages,
                });
            } catch (error) {
                console.error(error);
            }
        })()
    }, [page, reload])

    const changePage=(_,data)=>{
        setPage(data.activePage)
    }

    if(!courses) return <Loader active inline="centered" />
    if(size(courses) === 0) return "No hay ningún Enlace";
    
  return (
    <div className='list-courses'>
        {map(courses, (course)=>(
            <CourseItem key={course._id} course={course} onReload={onReload} onClose={onClose}/>
        ))}
        <div className='list-courses__pagination'>
            <Pagination
            totalPages={pagination.total}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage}
            />
        </div>
    </div>
  )
}
