import Header from "./components/page/Header.jsx";
import Body from "./components/page/Body.jsx";

function App() {
  return (
    <div className="react-todo-list flex flex-col h-dvh selection:bg-cyan-200 selection:text-cyan-950">
      <Header></Header>
      <Body></Body>
    </div>
  )
}

export default App
