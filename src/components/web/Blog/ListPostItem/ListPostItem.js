import React from 'react'
import "./ListPostItem.scss"
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { ENV } from '../../../../utils'
import { DateTime } from 'luxon'

export function ListPostItem(props) {
  const {post} = props
  const date = new Date(post.created_at);
  return (
    <Link className='list-post-item' to={`/blog/${post.path}`}>
      <Image src={`${ENV.BASE_PATH}/${post.miniature}`} />
      <h2>{post.title}</h2>
      <span>
        {DateTime.fromISO(date.toISOString()).setLocale("es").toFormat("dd '/' LLLL '/' yyyy ")}
      </span>
    </Link>
  )
}
