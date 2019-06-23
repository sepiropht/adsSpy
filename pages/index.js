import React from 'react'
import Link from 'next/link'
import Toolbar from './components/Toolbar'
import Input from './components/Input'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



export default function SimpleContainer(children) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar></Toolbar>
      <Container maxWidth="sm">
      <>
    
      <h1> Search for Ads</h1>
      <Input></Input>
      <ul>
        <li>
          <Link href='/b' as='/a'>
            <a>a</a>
          </Link>
        </li>
        <li>
          <Link href='/a' as='/b'>
            <a>b</a>
          </Link>
        </li>
        <li>
          <Link href={{ pathname: '/posts', query: { id: '2' } }} as='/posts/2'>
            <a>post #2</a>
          </Link>
        </li>
      </ul>
    </>  
      </Container>
    </React.Fragment>
  );
}