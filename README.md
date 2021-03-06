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
- P `<p>{text}<p/>`
- H1 `<h1>{text}<h1/>`
- H2 `<h2>{text}<h2/>`
- H3 `<h3>{text}<h3/>`
- H4 `<h4>{text}<h4/>`
- H5 `<h5>{text}<h5/>`
- H6 `<h6>{text}<h6/>`
- Img `<img />`
- Blog HOC

### Component props
## H1
```js
import { H1 } from 'dynamicdelta'

<H1
  componentID="xxxxx"
  style={{ fontSize: 42 }}
  className="my-class"
  loadingText="custom loading text"
  itemProp="title"
/>
```

### Blog Component
The blog component is diffrent than other components because it does not return
one html element.

```javascript
static childContextTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

static contextTypes = {
  projectID: PropTypes.string.isRequired,
}

static propTypes = {
  loadingText: PropTypes.any,
  style: PropTypes.shape({}),
  className: PropTypes.string,
}

static defaultProps = {
  loadingText: '\u00A0',
  style: {},
  className: '',
}
```

If you need to load blogposts from a diffrent project you can override
the `DynamicDelta` project id by passing the blog component a `overrideProjectID` prop.
```jsx
<Blog
  loadingText="loading posts"
  overrideProjectID="123"
>
  <Posts />
</Blog>
```
