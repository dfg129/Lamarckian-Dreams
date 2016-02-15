import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import router from './../routes.js'
import App from './App/App.js'

console.log("Enter the app")

let cssContainer = document.getElementById('css')
const appContainer = document.getElementById('app')
const context = {
  onSetTitle: value => document.title = value,
  onSetMeta: (name, content) => {
    const meta = document.createElement('meta')
    meta.setAttribute('nama', name)
    meta.setAttribute('content', content)
    document.getElementsByTagName('head')[0].appendChild(meta)
  }
}

function requreAuth(nextState, replaceState) {
  if(!auth.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

router.render()

console.log("This is past router")

/*
if(['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
*/
