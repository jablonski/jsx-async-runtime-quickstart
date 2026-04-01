import { jsxToString } from "jsx-async-runtime";

export default function App({ greeting }: { greeting: string }) {
  return (
    <>
      {{ html: `<!DOCTYPE html>` }}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>{`Hello ${greeting} | jsx-async-runtime`}</title>
        </head>
        <Body>
          <h1>Hello {greeting}</h1>
          <Todos quantity={5} />
          <Footer />
        </Body>
      </html>
    </>
  );
}

function Body({ children }: { children: JSX.Element[] }) {
  return (
    <body>
      <main>{children}</main>
    </body>
  );
}

/* Example: use `this` as context object to avoid prop drilling */
function Footer(this: { date: Date }) {
  return (
    <footer
      class="footer highlight"
      style={{
        "background-color": "red",
        color: "white",
      }}
    >
      {this.date.toLocaleString("en")}
    </footer>
  );
}

async function Todos({ quantity = 3 }) {
  const { todos } = await (await fetch("https://dummyjson.com/todos")).json();

  return (
    quantity > 0 && (
      <table style="margin: 0 auto; padding: 1rem; border: 1px solid lightgrey">
        <thead
          class={
            // Generate space separated class names for true properties
            {
              striped: false,
              sticky: true,
              '"classname-with-quotes"': true,
            }
          }
          // For all attributes besides class & style objects get stringified
          data-props={{ foo: "bar", count: 10 }}
        >
          <tr
            // Use array for class names, join string values with space
            class={["a", "b", "", undefined, "c"] as string[]}
          >
            <th>Label</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody class="striped">
          {todos
            .slice(0, quantity)
            .map(({ todo, completed }: { todo: string; completed: boolean }, index: number) => (
              <tr>
                <td>
                  <label for={`todo-${index}`}>
                    <input id={`todo-${index}`} type="text" readonly value={todo} />
                  </label>
                </td>
                <td>
                  <label for={`status-${index}`}>
                    <input id={`status-${index}`} type="checkbox" checked={completed} />
                  </label>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  );
}

// Use jsxToString#call with {} to create a 'this' context
console.log(await jsxToString.call({ date: new Date() }, <App greeting="World" />));
