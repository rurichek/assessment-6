### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript? asynchronous callbacks, promises, async/await

- What is a Promise? a one time guarantee of future value

- What are the differences between an async function and a regular function? regular function returns a value, whereas an async function returns a promise

- What is the difference between Node.js and Express.js? Node is designed to use JavaScript in the back-end, whereas Express is designed to be a web framework built on top of node. 

- What is the error-first callback pattern? the callback function's first parameter should be listed as error. Node will supply an error object (if something bad happened), otherwise null as arguments. 

- What is middleware? a code that runs in the middle of the request . response cycle. 

- What does the `next` function do? passes control to the next middleware function in the stack

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
in this case we are sending each request one by one, meaning that the next request has to wait for the first promise to resolve before the next promise can start, and to solve this issue we call use promise.all to send the requests in parallel to each other. 

we also need to handle error because the entire code might fail if one of the promises does not resolve. 