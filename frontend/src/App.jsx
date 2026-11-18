import Titulo from "./components/Titulo.jsx";

function App() {
  const anoAtual = new Date().getFullYear();

  return (
    <main>
      <Titulo />
      <p>© {anoAtual}</p>
    </main>
  );
}

export default App;
