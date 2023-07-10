import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { dbGet } from "../../db";
import { message } from "antd";
import { isAdmin } from "../../isLoggedIn";

const auth = getAuth();

function Login({styleClass}) {
  const [messageApi, contextHolder] = message.useMessage();
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
      var userData =  await dbGet('admin');
      var findAdmin = Object.values(userData).find(user=> user.email== data.user);
      console.log('admin login', findAdmin);
      if(!findAdmin) return messageApi.error("Invalid Email");
      
      await signInWithEmailAndPassword(auth, data.user, data.password);
      navigate('/admin');
    } catch (error) {
      console.log('login error', error.message);
      return messageApi.error("Invalid Credential");
    }
  };

  return (
    <div className={`login-wrapper ${styleClass}`}>
      {contextHolder}
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
  const navigate = useNavigate();
  useEffect(()=>{ isAdmin().then((isAdminUser)=> isAdminUser && navigate('/admin') ); }, []);
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
