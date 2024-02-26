import React, {useEffect, useState} from 'react'
import {size, map} from "lodash";
import { Loader, Pagination} from 'semantic-ui-react';
import {Post} from "../../../../api"
import {PostItem} from "../PostItem"
import "./ListPost.scss";

const postController = new Post();

export function ListPost(props) {
    const {reload, onReload} = props;
    const [posts, setPosts] = useState(false);
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState()
    useEffect(() => {
      (async () =>{
        try {
            const response = await postController.getPost(page,10);
            setPosts(response.docs);
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
    }, [page, reload]);

    const changePage=(_,data)=>{
        setPage(data.activePage)
    };

    if(!posts) return <Loader active inline="centered" />
    if(size(posts) === 0) return "No hay ningún Enlace";
    
  return (
    <div className='list-posts'>
        {map(posts, (post)=>(
            <PostItem key={post._id} post={post} onReload={onReload}/>
        ))}
        <div className='list-posts__pagination'>
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
