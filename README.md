# DynamicDelta ReactJS CMS
##### This npm module contains a collection of DynamicDelta compatible react components.

## Installing Dynamic Delta Package

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

## Available components
- DDP `<p>{text}<p/>`
- DH1 `<h1>{text}<h1/>`

## Contributing to the Dynamic Delta npm package

In order to ease development work of the Dynamic Delta npm package, we would use the Styleguidist package. This allows us to run a server and vizualize how the component will look like, which at the same time, provides us the capability to be able to test and provide documentation for the components. There are still plenty of active development work here.

In order to start the service, run the following command:

```bash
npm run styleguide
``` 

This will run a server which you can then view the ports on.

For all documentation of the components, they need to be done within the component library and they need to take the name of the component being exported. This is how styleguidist work
