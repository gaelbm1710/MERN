import React,{useState,useEffect} from 'react'
import "./Post.scss";
import { Post as PostsController } from '../../../api';
import { useParams } from 'react-router-dom';
import { Container, Loader } from 'semantic-ui-react';

const postController = new PostsController();

export function Post() {
  const [post, setPost] = useState(null);
  const {path} = useParams();
  useEffect(() => {
   (async ()=>{
    try {
      const response = await postController.getPosts(path);
      setPost(response);
    } catch (error) {
      console.error(error);
    }
   })();
  }, [path])

  if(!post) return <Loader active inline="centered"/>;

  return (
    <Container className='post'>
      <h1 className='title'>{post.title}</h1>
      <div className='content'
      dangerouslySetInnerHTML={{__html: post.content}}
      />
    </Container>
    
  );
}
