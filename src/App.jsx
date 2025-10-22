import { jsxToString } from "jsx-async-runtime";

export default function HelloWorld({ greeting }) {
  return (
    <>
      {{ html: `<!DOCTYPE html>` }}
      <html>
        <head>
          <meta charset="utf-8" />
          <title>{greeting}</title>
        </head>
        <body>
          <h1>{greeting}</h1>
        </body>
      </html>
    </>
  );
}

// Use jsxToString#call with {} to create a 'this' context
console.log(await jsxToString.call({}, <HelloWorld greeting="Hello World" />));
