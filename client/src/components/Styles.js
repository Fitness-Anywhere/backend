import styled from 'styled-components';



export const Styles = styled.div`
  * {
    font-family: 'Raleway', sans-serif;
  }
  h1 {
    text-align: center;
    color: black;
  }
  p {
    color: red;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 360px;
    margin: 100px auto;
    border: 1px solid black;
    padding: 10px;
    border-radius: 5px;
    

    label {
      margin-top: 20px;
    }

    input, select {
      font-size: 1.2em;
      width: 100%;
    }
    .errors {
      color: red;
      font-size: .8em;
    }
    
  }

  button {
    background: grey;
    padding: 10px;
    color: black;
    margin-top: 20px;
    border-radius: 5px;
    font-size: 1.2em;
    cursor: pointer;
  }
  button:hover {
    background: #FF9233;
  }
`

export const NavStyles = styled.div`
  .container {
    width: 80%;
    margin: 0 auto;
    font-family: 'Raleway', sans-serif;
  }
  
  header {
    background: #FF9233;
    height: 50px;
  }

  header::after {
    content: '';
    display: table;
    clear: both;
  }

  h1 {
    float: left;
    padding-top: 3px;
  }

  nav {
    float: right;
  }

  nav a {
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-left: 35px;
    padding-top: 13px;
    color: #000000;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 400;

    position: relative;
  }

  nav a:hover {
    color: #000000;
  }

  nav a::before {
    content: '';
    display: block;
    height: 5px;
    width: 100%;
    background-color: #444444;
    position: absolute;
    top: 0;
    width: 0%;
    transition: all ease-in-out 250ms;
  }

  nav a:hover::before {
    width: 100%;
  }

`

export const GoogleBtn = styled.div`
  button {
      background: #4285F4;
      color: white;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
      width: 100%;
      padding: 10px;
      margin-top: 20px;
      border-radius: 5px;
      font-size: 1.2em;
      cursor: pointer;
    }
    button:hover {
      cursor: pointer;
      background: white;
      color: #4285F4;
    }
`

export const FacebookBtn = styled.div`
  button {
      background: #4267b2;
      color: white;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
      width: 100%;
      padding: 10px;
      margin-top: 20px;
      border-radius: 5px;
      font-size: 1.2em;
      cursor: pointer;
    }
    button:hover {
      cursor: pointer;
      background: white;
      color: #4267b2;
    }
`