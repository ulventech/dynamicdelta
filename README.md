# DynamicDelta ReactJS CMS
##### This npm module contains a collection of DynamicDelta compatible react components.

### Install
```bash
# using npm
npm i --save dynamicdelta
# using yarn
yarn add dynamicdelta
```

### Configuration
In order to use the DD (DynamicDelta) components you need to wrap your application in
the `<DynamicDelta/>` root component.
```jsx harmony
ReactDOM.render((
  <DymamicDelta
    projectID="xxx-xxxx-xxxx-xxxxx"
  >
    <App />
  </DymamicDelta>
), document.getElementById('root'));
```

### Available components
- DDP `<p>{text}<p/>`
- DDH1 `<h1>{text}<h1/>`
