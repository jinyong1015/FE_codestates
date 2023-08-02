import { useEffect, useState } from "react";
import{ useNavigate, useParams } from "react-router-dom";
import useFetch from "../util/useFetch";

export const useScroll = (e) => {

  return window.scrollTo(0, 0)
}

  const BlogDetails = () => {

    const { id } = useParams();
    const [isLike, setIsLike] = useState(true);
    const { blogs: blog, isPending, error } = useFetch(`http://localhost:3001/blogs/${id}`);
    const navigate = useNavigate();
    useScroll()
  

  /* 현재는 개별 블로그 내용으로 진입해도 내용이 보이지 않습니다. */
  /* useParams와 id를 이용하여 개별 블로그의 내용이 보일 수 있게 해봅시다. */


  const handleDeleteClick = () => {
    /* delete 버튼을 누르면 다시 home으로 리다이렉트 되어야 합니다. */
    /* useNavigate()를 이용하여 로직을 작성해주세요. */
    fetch(`http://localhost:3001/blogs/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(() => {
        navigate('/')
        window.location.reload()
      })
      .catch(err => console.log(err))


    console.log('delete!');
  }

  const handleLikeClick = () => {
    /* 하트를 누르면 home에서 새로고침을 했을 때 숫자가 올라가야 합니다. */
    /* isLike와 blog.likes를 이용하여 handleLikeClick의 로직을 작성해주세요. */
    setIsLike(!isLike);
    let likeUpdate = blog.likes

    isLike === false ? (likeUpdate > 0 ? likeUpdate = blog.likes - 1 : likeUpdate = blog.likes)
      : likeUpdate = blog.likes + 1

    const putData = {
      'id': blog.id,
      "title": blog.title,
      "body": blog.body,
      "author": blog.author,
      "likes": likeUpdate,
    }
    console.log(likeUpdate)
    fetch(`http://localhost:3001/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(putData),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(() => {
        navigate(`/blogs/${blog.id}`)

      })
      .catch(err => console.log(err))
    console.log('like!');
  }

  const counstLike = () => {
    console.log(isLike)
  }
  return (
    <div className="blog-details" >
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleLikeClick}>
            {/* isLike에 의해 조건부 렌더링으로 빨간 하트(❤️)와 하얀 하트(🤍)가 번갈아 보여야 합니다. */}
            {!isLike ? '❤️' : '🤍'}
          </button>
          <button onClick={handleDeleteClick}>delete</button>
          <button onClick={counstLike}></button>
        </article>
      )}
    </div>
  );
}

export default BlogDetails; 