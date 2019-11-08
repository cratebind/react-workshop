# React Training Workshop

### Getting Started With This Demo:
1. Clone Repository
2. `yarn install` in the repo directory
3. `yarn start`

# What makes React exciting?

React makes it easier to split your code into reusable components and avoid duplication.

In general, we know it's best to avoid copy / pasting or duplicating identical pieces of code. However, when building a frontend with just HTML or ERB, we end up duplicating code frequently.

While ERB does allow us to split things into partials, it can be difficult to make partials work together in  reliable ways. Additionally, if the partials require Javascript for interactions, it can get difficult to keep track of.

React was created to solve this issue. If we think about our backend as a collection of methods / functions that are used to build a service, on the frontend we think of it as a collection of "components" that are the building blocks for a UI.

Components can be as small as a button or the entire container for an app.

## Composable

- Show example of using a button twice in the same place
- Show reusability
- Explain how jQuery example would be hard to reuse, involves copying HTML and JS

## Declarative

- Difference between imperative (jQuery, DOM manipulation) vs declarative (React):
    - Let's say you wanted your car to always stay around 72 degrees:
        - The "imperative" way would be a car that has one knob that goes from "cold" to "hot" (without any specific numbers) and a second knob that controls the air speed. In order to reach 72 degrees, it's up to you to tweak the knobs until it gets to a comfortable temperature
            - Also, if it's warm outside vs cold outside, you'd have to make different adjustments
        - The "declarative" way would be a car that has a dial that let's you select the desire temperature, and the car figures out how to adjust the AC to reach that temperature
- When building a UI, a "declarative" mental model is easier to work with because we can focus on what the desired "outcome" needs to look like rather than fiddling with DOM changes and changing HTML on the page
- React fully embraces this because it handles all the page changes for us. Our only job is to "declare" what we want our UI to look like, and React will find the most efficient way to render that to the page.

# How React Works

## How do you get React to render on the page?

To render on the page, React requires a React "element" to render and a target DOM element to be the "root" of the app:
```html
    <!-- index.html -->
    <div id="root"></div>

    // first we describe what our app looks like
    const App = <div>👋</div>
    // then we tell React where we want to render it
    const root = document.getElementById('root');

    // then we use ReactDOM to render it
    ReactDOM.render(App, root);
```
### JSX

The HTML-like syntax used here is called JSX, and it's a way to more easily declare what we want our apps to look like in our Javascript.

You can think of any element or React component as a "function", and all the "attributes" (called 'props' in React) are parameters for that function.

Behind the scenes, this:
```jsx
<button className="submit-button">Order Pizza</button>
```
Gets converted into this (don't worry, you won't ever need to write React like this):
```js
React.createElement(
  'button', // the element type or component is the first argument
  { className: 'submit-button' }, // the "props" (attributes) to pass the component
  'Order Pizza' // the "children", or content of the component
)
```
Ultimately, components are just functions. So they take an "input" as parameters (props) and return JSX.

When you're writing JSX, you can pass variables into your markup by wrapping it in curly brackets, much like you would use something like `<%= post.title %>` in ERB.
```js
const name = 'Dan Abramov';
return (
  <h3>Hi, I'm {name}</h3>
)
```
The reason JSX is so powerful is provides all the functionality of Javascript alongside your markup. For example, let's say we had an array of links we wanted to display.
```jsx
function LibraryLinks() {
  const libraries = [
    { name: 'Chakra UI', url: 'https://chakra-ui.com' },
    { name: 'Minerva UI', url: 'https://minerva-ui.netlify.com' },
  ];

  // we're able to map over an array of items and return JSX
  return (
    <ul>
      {libraries.map(library => (
        <li>
          {/* you can also pass variables
          as props (attributes) by using curly brackets */}
          <a href={library.url}>
            {/* then we can just pass the name as the text for the link */}
            {library.name}
          </a>
        </li>
      )}
    </ul>
  )
}
```
This `LibraryLinks` component would return:
```jsx
<ul>
  <li>
    <a href="https://chakra-ui.com">Chakra UI</a>
  </li>
  <li>
    <a href="https://minerva-ui.netlify.com">Minerva UI</a>
  </li>
</ul>
```
# Demo

Starting code can be [found here](https://github.com/cratebind/react-workshop), with the end result on the `final` branch.

## Rendering Elements

- The first thing we're going to do is have our value displayed. For now we'll just hard code it, then we'll figure out how to change it later
    - The styles are included, since we're not worried about learning CSS for now
```jsx
function App() {
  return (
    <div className="App">
      <div className="counter-value">
        10
      </div>
    </div>
  )
}
```
- Then we'll add a "minus" and "plus" button to either side
```jsx
function App() {
  return (
    <div className="App">
      <button className="counter-button">-</button>
      <div className="counter-value">
        10
      </div>
      <button className="counter-button">+</button>
    </div>
  )
}
```
- Now that we have our basic UI, we need to make it interactive
    - If we were going to do this with jQuery (the "imperative" way), we would have to add a listener to each button, get the value from the "counter-value" element, then increment it and change it
```js
$('.counter-add-button').click(function () {
  var value = $('.counter-value).text();
  $('.counter-value').text(parseInt(value + 1);
});
```
- With React, we just "declare" what we want the UI to look like
- We can pass variables to our code by putting it in brackets:
```jsx
const count = 10;

return (
  <div>{count}</div>
)
```

## State

But this constant value isn't really useful. To create values that we can change, we have to use "state".

State refers to any value you want to keep track of in React. Whenever state is changed, it tells React to update the page by making the minimum number of changes required
```js
const [count, setCount] = useState(10);
```

When you call `useState`, it returns a tuple:

- The first item in the tuple is the variable you're going to keep in state
- The second item is a function that allows you to update that value, and also tells React it needs to re-render anything using that value

Now we can make our buttons interactive. React gives us [event "props" for all DOM events](https://reactjs.org/docs/handling-events.html), including `onClick`.

When we use onClick, we **must** pass a "reference" to a function:
```jsx
return <button onClick={() => setCount(count + 1)}>+</button>
```
Instead of a function call:
```jsx
return <button onClick={setCount(count + 1)}>+</button>
```

The reason for this is that if it was a function "call" like this, it would run on every render. In this case it would actually cause a rendering loop, because `setCount` triggers a re-render.

But don't worry, React has helpful warnings and will also stop executing code if it detects a rendering loop.
```jsx
function App() {
  const [count, setCount] = useState(10);

  return (
    <div className="App">
      <button
        className="counter-button"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
      <div className="counter-value">
        {count}
      </div>
      <button
        className="counter-button"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
}
```
## Creating Components

So our counter is working pretty well! But if you look at our component, you'll notice that the "minus" and "plus" buttons have almost identical code. And also, we'll probably want to use these nice round buttons somewhere else in our app.

So once we have this working, we can refactor our `App` component into smaller reusable components. We'll copy one of our buttons into its own component:

```jsx
function Button() {
  return (
    <button
      className="counter-button"
    >
      -
    </button>
  )
}
```
Components must use `PascalCase`, because on the web ReactDOM will assume anything with a lowercase letter is a web element, like `<span />`

### Component Children

In order to make this component "composable", we want to be able to pass our own content / children to the component like we would with HTML:
```jsx
<button>Submit</button>
```

To do this, there's a special prop called `children` in React that lets you render all of the components *inside* your component:
```jsx
function Button({ children }) {
  return (
    <button
      className="counter-button"
    >
      {children}
    </button>
  )
}

// now if we rendered <Button>Delete</Button>
// the content "Delete" would be rendered where we have {children}
```

We would also need to pass the `onClick` prop to pass along the functionality:
```jsx
function Button({ children, onClick }) {
  return (
    <button
      className="counter-button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```
If you're extending an HTML element like `<button />` or `<input />`, you can make it more flexible by "spreading" the props to the underlying component:
```jsx
function Button({ children, ...props }) {
  return (
    <button
      className="counter-button"
      {...props}
    >
      {children}
    </button>
  )
}

// for example, let's say we rendered our component like this:
<Button onClick={submitForm} type="submit" />

// our component would get an object that looked like:
// { onClick: submitForm, type: 'submit' }

// the {...props} line basically copies over all the
// remaining props to the component, and would be the same as this:
<button
  onClick={submitForm}
  type="submit"
>
```
Great! Now our app should look something like this:
```jsx
function Button({ children, onClick }) {
  return (
    <button
      className="counter-button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function App() {
  const [count, setCount] = useState(10);

  return (
    <div className="App">
      <Button
        onClick={() => setCount(count - 1)}
      >
        -
      </Button>
      <div className="counter-value">
        {count}
      </div>
      <Button
        onClick={() => setCount(count + 1)}
      >
        +
      </Button>
      {/* we could even make an additional button if we wanted to reset the counter */}
      <Button
        onClick={() => setCount(0)}
      >
        Reset
      </Button>
    </div>
  );
}
```