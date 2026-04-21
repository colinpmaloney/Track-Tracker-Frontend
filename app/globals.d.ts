// Type declarations for CSS side-effect imports
declare module "*.css" {
  const content: string;
  export default content;
}