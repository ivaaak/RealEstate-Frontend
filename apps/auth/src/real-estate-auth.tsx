/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Auth from './Auth/Auth';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Auth,
  errorBoundary(err, info, props) {
    // root microfrontend error:
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
