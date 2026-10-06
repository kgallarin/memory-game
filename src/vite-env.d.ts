/// <reference types="vite/client" />

// 1. Module SCSS (Scoped styles with imported class mapping object)
declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

// 2. Global Side-Effect SCSS (import './Card.scss')
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
