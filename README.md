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
- DDH2 `<h2>{text}<h2/>`
- DDH3 `<h3>{text}<h3/>`
- DDH4 `<h4>{text}<h4/>`
- DDH5 `<h5>{text}<h5/>`
- DDH6 `<h6>{text}<h6/>`
