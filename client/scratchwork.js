body {
  font-family: sans-serif;

  a {
    text-decoration: none;
  }

  label {
    display: block;
  }

  nav a {
    display: inline-block;
    margin: 1em;
  }

  form div {
    margin: 1em;
    display: inline-block;
  }
}


 <h1 className="mt2 mb0 avenir i fw1 f1">The Ocean</h1>
      <h2 className="mt2 mb0 f6 fw4 ttu tracked"> Just fall the fuck in...love </h2>

//single ocean component 
              bubbles.map ( bubble => ( 
          <li key={bubble.id} className="f6 link dim br-pill ph3 pv2 mb2 dib grayBackground" >
          <Link to={`/bubbles/${bubble.id}`}>
           {bubble.message} 
          </Link>
          </li> ))