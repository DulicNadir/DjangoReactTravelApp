import { useState, useEffect } from 'react';
import APIService from '../APIService';
import { useCookies } from 'react-cookie';

const Form = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [token, setToken] = useCookies(['mytoken']);

  useEffect(() => {
    setTitle(props.article.title);
    setDescription(props.article.description);
  }, [props.article]);

  const updateArticle = () => {
    APIService.UpdateArticle(
      props.article.id,
      { title, description },
      token['mytoken']
    ).then((resp) => props.updatedInformation(resp));
  };
  const insertArticle = () => {
    APIService.InsertArticle({ title, description }, token['mytoken']).then(
      (resp) => props.insertedInformation(resp)
    );
  };

  return (
    <div>
      {props.article ? (
        <div>
          <label htmlFor='title'>Title</label>
          <br></br>
          <input
            type='text'
            id='title'
            placeholder='Type your title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br></br>
          <label htmlFor='description'>Description</label>
          <br></br>
          <textarea
            cols={10}
            rows={5}
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br></br>
          {props.article.id ? (
            <button onClick={updateArticle}>Update</button>
          ) : (
            <button onClick={insertArticle}>Insert</button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Form;
