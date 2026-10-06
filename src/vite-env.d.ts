// 1. Module SCSS (Scoped styles)
declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

// 2. SCSS (import './Card.scss')
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
