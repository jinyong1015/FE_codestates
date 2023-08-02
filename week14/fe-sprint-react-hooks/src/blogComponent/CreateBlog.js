import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../util/useInput.js";
const CreateBlog = () => {
  const [title, onChangeText] = useInput('');
  const [body, onChangeBody] = useInput('');
  const [author, onChangeAuthor] = useInput('김코딩');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.type);
    /* 등록 버튼을 누르면 게시물이 등록이 되며 home으로 리다이렉트 되어야 합니다. */
    /* 작성한 내용과 useNavigate를 이용하여 handleSubmit의 로직을 작성해보세요. */
    const data = { title, body, author, likes: 0 }
    fetch('http://localhost:3001/blogs/', {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource', {
            method: "DELETE"
          });
        }
        return res.json();
      })
      .then(() => {
        navigate('/')
        window.location.reload();
      })
      .catch(err => {
        console.error("Error", err);
      })
  }
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          type="text"
          required
          value={title}
          onChange={onChangeText}
          placeholder="제목을 입력해주세요."
        />
        <label>내용</label>
        <textarea
          required
          value={body}
          onChange={onChangeBody}
          placeholder="내용을 입력해주세요."
        ></textarea>
        <label>작성자</label>
        <select
          value={author}
          onChange={onChangeAuthor}
        >
          <option value="김코딩">김코딩</option>
          <option value="박해커">박해커</option>
        </select>
        <button>등록</button>
      </form>
    </div>
  );
}
export default CreateBlog;