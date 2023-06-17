import type { Post } from '@tbcc/models';

export const POSTS: Post[] = [
  {
    id: 1,
    content: `
    <div>
      <p>React, as a JavaScript library, offers several advantages over Vue and Angular. Firstly, React provides a more flexible and component-based approach to building user interfaces. Its virtual DOM efficiently updates only the necessary parts of the UI, resulting in better performance. React's large and active community contributes to its extensive ecosystem of libraries and tools.</p>
      <p>Secondly, React's syntax is simpler and easier to grasp, making it more beginner-friendly. It allows developers to write components using JSX, which combines JavaScript and HTML-like syntax, facilitating code readability and maintainability.</p>
      <p>Lastly, React's popularity and widespread adoption mean that finding resources, tutorials, and community support is relatively easy. It is backed by Facebook, ensuring ongoing development and improvements.</p>
      <p>While Vue and Angular have their strengths, React's flexibility, performance, simplicity, and community support make it a preferred choice for many developers, particularly those seeking scalability and efficiency in their web development projects.</p>
    </div>`,
    userId: 1,
    createdAt: '2023-06-14T11:11:11.000Z',
    title: 'Why and when should you use React?',
  },
  {
    id: 2,
    content: `<div>
      <p>Angular offers a comprehensive framework that includes features such as dependency injection, a powerful CLI, and a structured architecture. It provides a more opinionated approach, making it ideal for large-scale enterprise applications with complex requirements.</p>
      <p>One of Angular's key advantages is its built-in TypeScript support, which adds static typing and improves code maintainability and tooling. TypeScript enforces strict type checking, reducing runtime errors and enhancing code quality.</p>
      <p>Angular also provides robust features for testing, including the ability to write unit tests, integration tests, and end-to-end tests using tools like Jasmine and Protractor. This ensures high code quality and makes it easier to catch bugs early in the development process.</p>
      <p>Furthermore, Angular's declarative template syntax promotes a clear separation of concerns between the template and the component logic. This improves code readability, maintainability, and team collaboration.</p>
      <p>Lastly, Angular benefits from strong corporate backing and a well-documented ecosystem, making it a reliable choice for enterprise-level projects. Its comprehensive documentation, regular updates, and long-term support ensure stability and compatibility.</p>
      <p>While React and Vue have their advantages, Angular's comprehensive features, TypeScript support, robust testing capabilities, clear separation of concerns, and strong corporate support make it a preferred choice for complex and large-scale applications.</p>
    </div>`,
    userId: 2,
    createdAt: '2023-06-16T11:11:11.000Z',
    title: 'When is Angular a great choice?',
  },
  {
    id: 3,
    content: `<div>
      <p>Vue.js excels in scenarios where simplicity and ease of use are prioritized. Its gentle learning curve makes it ideal for beginners or developers who prefer a more straightforward framework.</p>
      <p>One of Vue.js' strengths is its flexible and intuitive template syntax, which allows developers to seamlessly blend HTML templates with JavaScript code. This makes it easy to understand and work with, enhancing productivity.</p>
      <p>Vue.js' lightweight nature makes it an excellent choice for small to medium-sized projects, where simplicity and performance are essential. Its efficient rendering mechanism ensures fast updates to the DOM, resulting in a smooth user experience.</p>
      <p>Vue.js also offers a rich ecosystem of plugins and components, allowing developers to quickly add functionality to their applications. The Vue CLI provides a seamless development experience, enabling rapid prototyping and project setup.</p>
      <p>Moreover, Vue.js promotes component-based development and encourages reusability, making it suitable for building modular and maintainable codebases. Its single-file components encapsulate the template, JavaScript, and CSS, promoting clean code organization.</p>
      <p>In summary, Vue.js shines in scenarios where simplicity, ease of use, lightweightness, and rapid development are priorities. It is a great choice for smaller projects or when a gentle learning curve is preferred over the more comprehensive features of React and Angular.</p>
    </div>`,
    userId: 3,
    createdAt: '2023-06-17T11:11:11.000Z',
    title: 'When Vue.js is a great choice?',
  },
];
