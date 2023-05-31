import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';

const auth = getAuth();

function Login({styleClass}) {
  const [data, setData] = useState({
    user: '',
    password: '',
    rememberMe: false,
  });
  const [filled, setFill] = useState({
    user: false,
    password: false,
  });
  const [misc, setMisc] = useState({
    placeholderPlace: {
      user: '',
      password: ''
    },
    tooltip: {
      user: false,
      password: false
    }
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    let misc = e.target;
    let fill = false;
    if(misc.value !== '') {
      fill = true;
    }

    if(misc.type === 'checkbox') {
      setData(data => {
        return {...data, [misc.name]: misc.checked}
      });
    } else {
      setData(data => {
        return {...data, [misc.name]: misc.value};
      });
      setFill(filled => {
        return {...filled, [misc.name]: fill};
      });
    }
  };

  const blurHandler = (e) => {
    let input = e.target.name;
    if(!filled[input]) {
      setMisc(misc => {
        return {...misc, placeholderPlace: {...misc.placeholderPlace, [input]: ''}};
      });
    }
  };

  const focusHandler = (e) => {
    let input = e.target.name;
    setMisc(misc => {
      return {...misc, placeholderPlace: {...misc.placeholderPlace, [input]: 'input-filled'}};
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      var user = await signInWithEmailAndPassword(auth, data.user, data.password);
      
    } catch (error) {
      console.log('login error', error.message);
    }
    
    // if(data.user=='demo' && data.password=='demo'){
    //   navigate('/');
    // }
  };

  return (
    <div className={`login-wrapper ${styleClass}`}>
      <form onSubmit={submitHandler}>
        <Input 
          name='user' 
          placeholder='Email' 
          type='text' 
          value={data.user} 
          control={{changeHandler, blurHandler, focusHandler}}
          placeholderPlace={misc.placeholderPlace.user}
          message={' '}
        />
        <Input 
          name='password' 
          placeholder='Password' 
          type='password' 
          value={data.password} 
          control={{changeHandler, blurHandler, focusHandler}}
          placeholderPlace={misc.placeholderPlace.password}
          message={' '}
        />
        <div>
          <label>
            <input 
              name='rememberMe' 
              type='checkbox'
              checked={data.rememberMe}
              onChange={changeHandler}
            /> Remember Me
          </label>
        </div>
        <input type='submit' className='button' value='LOGIN' />
      </form>
    </div>
  );
}


function Input(props) {
  const {
    name,
    placeholder,
    type,
    value,
    placeholderPlace,
    message,
    control: {
      changeHandler,
      blurHandler,
      focusHandler
    }
  } = props;

  const validation = (
    <>
      {
        value === '' ? (
          <></>
        ) : (
          !message ? (
            <span className='checkmark'></span>
          ) : (
            <span className='message'>{message}</span>
          )
        )
      }
    </>
  );
  return (
    <label className='input-wrapper'>
      <input 
        name={name}
        type={type}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
      />
      <span className={`placeholder ${placeholderPlace}`}>{placeholder}</span>
      {validation}
    </label>
  );
}

function AdminLogin() {
  return (
    <div className="login-page">
      <div className='login-modal' style={{height: '350px'}}>
        <h1 className="text-center login-title pt-3">Amine Shop Administration</h1>
        <Login styleClass="" />
      </div>
    </div>
  );
}

export default AdminLogin;
