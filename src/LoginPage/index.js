import { useState } from "react";
import "./style.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { dbSet } from "../db";

const auth = getAuth();



function Tabs(props) {
  const {control, handleStyle:{login, signup}} = props;
  return (
    <div className='tabsbar'>
      <button onClick={control} className={`tab ${login}`}>LOGIN</button>
      <button onClick={control} className={`tab ${signup}`}>SIGN UP</button>
    </div>
  );
}

function Login({styleClass}) {
  const {state} = useLocation();
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
  const [error, setError] = useState();
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
      await signInWithEmailAndPassword(auth, data.user, data.password);
      navigate( (state && state.redirect) || '/');
    } catch (error) {
      console.log('login error', error.message);
      setError('Invalid credential');
    }
  };

  return (
    <div className={`login-wrapper ${styleClass}`}>
      <form onSubmit={submitHandler}>
        <Input 
          name='user' 
          placeholder='Email' 
          type='email' 
          value={data.user} 
          control={{changeHandler, blurHandler, focusHandler}}
          placeholderPlace={misc.placeholderPlace.user}
          message={error}
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

function Signup({styleClass}) {
  const navigate = useNavigate();
const [data, setData] = useState({
    fullName: '',
    age: '',
    email: '',
    password: '',
    phone: '',
  });
  const [filled, setFill] = useState({
    fullName: false,
    userName: false,
    email: false,
    password: false,
    terms: false,
  });
  const [misc, setMisc] = useState({
    placeholderPlace: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
    },
    tooltip: {
      fullName: false,
      userName: false,
      email: false,
      password: false,
      terms: false,
    }
  });

  const [message, setMessage] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    let input = e.target;
    let fill = false;
    if(input.value !== '') {
      fill = true;
    }

    if(input.type === 'checkbox') {
      setData(data => {
        return {...data, [input.name]: input.checked}
      });
    } else {
      setData(data => {
        return {...data, [input.name]: input.value};
      });
      setFill(filled => {
        return {...filled, [input.name]: fill};
      });
    }

    // validation
    let test;
    switch(input.name) {
      case 'fullName':
        test = /^[a-z A-Z]{3,}$/.test(input.value);
        setMessage(message => {
          return {...message, fullName: test ? '' : 'Invalid name'}
        });
        break;

      case 'userName':
        test = /\W/.test(input.value);
        setMessage(message => {
          return {...message, userName: test ? 'Username can only contain a-z, 0-9 and _' : ''}
        });
        break;

      case 'email':
        test = /[\w.][@][\w]/.test(input.value);
        setMessage(message => {
          return {...message, email: test ? '' : 'Email is not valid'}
        });
        break;

      case 'password':
        test = /^(?=.*[0-9])[\w\W]{8,}$/.test(input.value);
        setMessage(message => {
          return {...message, password: test ? '' : 'Password must contain 8 characters and 0-9'}
        });
        break;
        
      default:

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
      const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(user, {displayName: data.fullName,phoneNumber: data.phone});

      await dbSet('users', {
        name: data.fullName,
        email: data.email,
        userId: user.uid,
        age: data.age,
        phone: data.phone,
      }, user.uid);

      navigate('/');
      
      // Signup successful
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={`signup-wrapper ${styleClass}`}>
      <form onSubmit={submitHandler}>
        <Input 
          name='fullName' 
          placeholder='Full Name' 
          type='text' 
          value={data.fullName} 
          control={{changeHandler, blurHandler, focusHandler}}
          placeholderPlace={misc.placeholderPlace.fullName}
          message={message.fullName}
        />
        <Input 
          name='age' 
          placeholder='Age' 
          type='text' 
          value={data.age} 
          control={{changeHandler, blurHandler, focusHandler}}
          placeholderPlace={misc.placeholderPlace.age}
          message={message.age}
        />
        <Input 
          name='phone' 
          placeholder='Phone' 
          type='text' 
          value={data.phone} 
          control={{changeHandler, blurHandler, focusHandler}}
          placeholderPlace={misc.placeholderPlace.phone}
          message={message.phone}
        />
        <Input 
          name='email' 
          placeholder='Email' 
          type='text' 
          value={data.email} 
          control={{changeHandler, blurHandler, focusHandler}}
          placeholderPlace={misc.placeholderPlace.email}
          message={message.email}
        />
        <Input 
          name='password' 
          placeholder='Password' 
          type='password' 
          value={data.password} 
          control={{changeHandler, blurHandler, focusHandler}}
          placeholderPlace={misc.placeholderPlace.password}
          message={message.password}
        />
        <input type='submit' className='button' value='SIGN UP' />
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

function LoginPage() {
  const [tab, setTab] = useState({
    tabs: {
      login: 'active-tab',
      signup: 'deactive-tab'
    },
    page: {
      login: '',
      signup: ''
    },
    modalHeight: '350px'
  });
  const tabHandler = (e) => {
    if(e.target.innerHTML === 'SIGN UP') {
      setTab({
        tabs: {login: 'deactive-tab', signup: 'active-tab'},
        page: {login: 'login-deactive', signup: 'signup-active'},
        modalHeight: '600px'
      });
    } else {
      setTab({
        tabs: {login: 'active-tab', signup: 'deactive-tab'},
        page: {login: 'login-active', signup: 'signup-deactive'},
        modalHeight: '330px'
      });
    }
  }; 

  if(auth.currentUser) return <Navigate to="/cart" />

  return (
    <div className="login-page">
      <div className="text-center">
        <QRCode size={150} value={window.location.href} />
      </div>
      <div className='login-modal' style={{height: tab.modalHeight}}>
        <Tabs control={tabHandler} handleStyle={tab.tabs}/>
        <Login styleClass={tab.page.login}/>
        <Signup styleClass={tab.page.signup}/>
      </div>
    </div>
  );
}

export default LoginPage;
