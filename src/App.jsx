import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config.js'

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#212f4a"
  },
  name: {
    marginTop: '30px',
    backgroundColor: 'rgb(190 246 255)',
    // border: 'solid',
    // borderColor: '#58a6ff',
    // borderRadius: '3px'
    height: '55px',
  },
  inputs: {
    marginTop: '30px',
    width: '600px',
    backgroundColor: 'rgb(190 246 255)',
    border: 'solid',
    borderColor: '#30373c',
    borderRadius: '3px'
  },
  simulationTitle: {
    marginTop: '30px',
  },
  boxWithPostButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
  },
  simulation: {
    marginTop: '30px',
    width: '600px',
    height: '600px',
    border: 'solid',
    borderWidth: '5px',
    borderRadius: '10px',
    borderColor: '#30373c',
    backgroundColor: '#0f1218',
  },
  whiteText: {
    color: '#c8d1d9'
  },
  dot: {
    color: '#c8d1d9',
    width: '10px',
    height: '10px',
    marginRight: '15px',
  },
  alerts: {
    marginTop: '5px',
    width: '568px',
    maxWidth: '580px',
    display: 'flex',
    justifyContent: 'center',
  },
  titleAlert: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    marginLeft: '5px',
    height: '44px'
  },
  postAlert: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const App = () => {
  const classes = useStyles();

  const [titleError, setTitleError] = useState(true)
  const [title, setTitle] = useState('')
  const [challengeError, setChallengeError] = useState(true)
  const [challenge, setChallenge] = useState('')
  const [actionError, setActionError] = useState(true)
  const [action, setAction] = useState('')
  const [resultError, setResultError] = useState(true)
  const [result, setResult] = useState('')
  const [takeaway, setTakeaway] = useState('')

  const handleInputChanges = (event, num) => {
    num === 1 ? setTitle(event.target.value) : null;
    num === 2 ? setChallenge(event.target.value) : null;
    num === 3 ? setAction(event.target.value) : null;
    num === 4 ? setResult(event.target.value) : null;
    num === 5 ? setTakeaway(event.target.value) : null;

  }
  const [submitReady, setSubmitReady] = useState(false)
  const handleSubmit = () => {
    let string;
    (takeaway === '') ? string = `## Challenge \n - ${challenge} \n ## Action \n - ${action} \n ## Result \n - ${result}`
      : string = `## Challenge \n - ${challenge} \n ## Action \n - ${action} \n ## Result \n - ${result} \n ## Takeaway \n - ${takeaway}`
    // }
    let titleMd = `${title}.md`
    let file = {};
    file[titleMd] = { "content": string }
    let options = {
      'headers': { 'Authorization': `token ${config.TOKEN}` }
    }
    if (submitReady) {
      axios.post('http://localhost:3000/github', { files: file, option: options })
        .then((response) => {
          console.log('successful post')
        })
        .catch(() => console.log('error posting'))
    }
  }
  const handleErrors = () => {
    title.length > 0 ? setTitleError(false) : setTitleError(true);
    challenge.length > 0 ? setChallengeError(false) : setChallengeError(true);
    action.length > 0 ? setActionError(false) : setActionError(true);
    result.length > 0 ? setResultError(false) : setResultError(true);
  }
  const handleSubmitReady = () => {
    (!titleError && !challengeError && !actionError && !resultError) ? setSubmitReady(true) : setSubmitReady(false);

  }
  useEffect(() => {
    handleErrors()
  }, [title, challenge, action, result])

  useEffect(() => {
    handleSubmitReady()
  }, [titleError, challengeError, actionError, resultError])

  return (
    <Grid container item direction="row" justifyContent="center" className={classes.background}>
      <Typography variant="h3" className={classes.whiteText}>
        Fill out the form to create a new gist!
      </Typography>
      <Grid container item direction="column" justifyContent="center" alignItems="center">
        <form autoComplete="off">
          <Grid container item direction="row" justifyContent="center">
            <TextField
              className={classes.name}
              id="file-name"
              label="File Name"
              variant="filled"
              error={titleError}
              onChange={(event) => {
                // handleTitleChange(event)
                handleInputChanges(event, 1)
              }}
            />
            {titleError
              ? <Alert variant="filled" className={classes.titleAlert} severity="error">File Name is a required field!</Alert>
              : <Alert variant="filled" className={classes.titleAlert} severity="success">Noice</Alert>}
          </Grid>

          <Grid container item direction="row" justifyContent="center">
            <TextField
              className={classes.inputs}
              id="file-Challenge"
              label="Challenge"
              placeholder="Type the contents of your gist here"
              multiline
              variant="filled"
              error={challengeError}
              onChange={(event) => {
                // handleChallengeChange(event, 1)
                handleInputChanges(event, 2)
              }}
            />
            <Grid container item direction="row" justifyContent="center">
              {challengeError
                ? <Alert variant="filled" className={classes.alerts} severity="error">Challenge is a required field!</Alert>
                : <Alert variant="filled" className={classes.alerts} severity="success">Thanks! Now what did you do about it?</Alert>}
            </Grid>
          </Grid>
          <Grid container item direction="row" justifyContent="center">
            <TextField
              className={classes.inputs}
              id="file-action"
              label="Action"
              placeholder="Type the contents of your gist here"
              multiline
              variant="filled"
              error={actionError}
              required={true}
              onChange={(event) => {
                // handleActionChange(event)
                handleInputChanges(event, 3)
              }}
            />
          </Grid>
          <Grid container item direction="row" justifyContent="center">
            {actionError
              ? <Alert variant="filled" className={classes.alerts} severity="error">Action is a required field!</Alert>
              : <Alert variant="filled" className={classes.alerts} severity="success">Sweeeeeeeet, Youre almost there!</Alert>}
          </Grid>
          <Grid container item direction="row" justifyContent="center">
            <TextField
              className={classes.inputs}
              id="file-result"
              label="Result"
              placeholder="Type the contents of your gist here"
              multiline
              variant="filled"
              error={resultError}
              onChange={(event) => {
                // handleResultChange(event)
                handleInputChanges(event, 4)
              }}
            />
          </Grid>
          <Grid container item direction="row" justifyContent="center">
            {resultError
              ? <Alert variant="filled" className={classes.alerts} severity="error">Result is a required field!</Alert>
              : <Alert variant="filled" className={classes.alerts} severity="success">See, that wasnt that hard... BTW Takeaway is an optional field. </Alert>}
          </Grid>
          <Grid container item direction="row" justifyContent="center">
            <TextField
              className={classes.inputs}
              id="file-takeaway"
              label="Takeaway"
              placeholder="Type the contents of your gist here"
              multiline
              variant="filled"
              onChange={(event) => {
                // handleTakeawayChange(event)
                handleInputChanges(event, 5)
              }}
            />
          </Grid>
        </form>
      </Grid>
      <Grid>
        <Grid container item direction="row" className={classes.boxWithPostButton} spacing={5}>
          <Grid item>
            <Typography variant="h4" className={classes.whiteText}>Simulated Gist:</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={() => {
                handleSubmit();
              }}
            >
              Post to github
            </Button>
            {submitReady ? <Grid item><Alert variant="filled" className={classes.postAlert} severity="success">All set!</Alert></Grid> : null}
          </Grid>
        </Grid>
        <Grid container item direction="column" className={classes.simulation} spacing={4}>
          <Grid container item direction="row" justifyContent="center">
            {title === '' ? null : <Typography className={classes.whiteText} variant='h4'>Filename: {title}.md</Typography>}
          </Grid>

          <Grid container item direction="column">
            <Typography className={classes.whiteText} variant='h4'>Challenge:</Typography>
            <Typography className={classes.whiteText} variant='h6'>
              {challenge === '' ? null : <FiberManualRecordIcon className={classes.dot} />}{challenge}
            </Typography>
          </Grid>
          <Grid container item direction="column">
            <Typography className={classes.whiteText} variant='h4'>Action:</Typography>
            <Typography className={classes.whiteText} variant='h6'>
              {action === '' ? null : <FiberManualRecordIcon className={classes.dot} />}{action}
            </Typography>
          </Grid>
          <Grid container item direction="column">
            <Typography className={classes.whiteText} variant='h4'>Result:</Typography>
            <Typography className={classes.whiteText} variant='h6'>
              {result === '' ? null : <FiberManualRecordIcon className={classes.dot} />}{result}
            </Typography>
          </Grid>
          {takeaway === ''
            ? null
            : <Grid container item direction="column">
              <Typography className={classes.whiteText} variant='h4'>Takeaway:</Typography>
              <Typography className={classes.whiteText} variant='h6'>
                <FiberManualRecordIcon className={classes.dot} />{takeaway}
              </Typography>
            </Grid>}
        </Grid>
      </Grid>
    </Grid >
  )
}

export default App