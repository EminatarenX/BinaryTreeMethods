import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BinaryTree } from "./classes/arbol";
import Row from "./Row";
import { generarId } from "./classes/generarID";
import { ArbolBinario } from "./classes/ArbolBinario";

function App() {
  let lista = new ArbolBinario();

  lista.insertar({ id: 4123, categoria: "Principiante" });
  lista.insertar({ id: 1123, categoria: "Avanzado" });
  lista.insertar({ id: 2343, categoria: "Intermedio" });
  lista.insertar({ id: 6678, categoria: "Avanzado" });
  lista.insertar({ id: 1245, categoria: "Principiante" });
  const inorder = lista.obtenerOrdenados();

  const [registro, setRegistro] = useState("");
  const [registros, setRegistros] = useState(inorder);
  const [buscar, setBuscar] = useState("");
  const [modificar, setModificar] = useState(false);
  const [objeto, setObjeto] = useState({});

  const guardarRegistro = (e) => {
    e.preventDefault();

    if ([registro].includes("")) {
      Swal.fire({
        title: "Faltan campos por llenar",
        showConfirmButton: false,
        position: "top-end",
        icon: "warning",
      });
      return;
    }
    if (modificar) {
      lista.actualizarNodo(objeto.id, { categoria: registro });
      registros.find((usuario) => {
        if (usuario.id === objeto.id) {
          usuario.categoria = registro;
        }
      });

      setObjeto({});
      setRegistro("");
      setModificar(false);
      Swal.fire({
        title: "usuario actualizado",
        icon: "success",
      });
      return;
    }

    const nuevoId = generarId();
    const nuevoObjeto = { id: nuevoId, categoria: registro };
   
    lista.insertar(nuevoObjeto)
    
    setRegistros([...registros, nuevoObjeto]);
    setRegistro("");
    Swal.fire({
      title: "Registro guardado exitosamente",
      icon: "success",
    });
    
  };

  function listaOrdenada() {
    const listaOrdenada = lista.obtenerOrdenados();
    console.log(listaOrdenada)
    setRegistros([...listaOrdenada]); // Actualiza el estado de registros con la lista ordenada
  }



  function buscarFolio() {
    let numero = buscar;

    if (!numero || buscar === "") {
      setRegistros(inorder);
      return;
    }

    const arreglo = registros.filter((usuario) => usuario.id == numero);
    if (arreglo.length === 0) {
      return;
    } else {
      setRegistros(arreglo);
    }
  }

  useEffect(() => {
    if (buscar === "") {
      setRegistros(inorder);
      return;
    }
  }, [buscar]);

  const eliminarRegistro = (id) => {
    lista.eliminarNodo(id);
    const guardar = () => {
      const nuevoRegistros = registros.filter((usuario) => usuario.id !== id);
      setRegistros(nuevoRegistros);
      Swal.fire({
        title: "registro eliminado",
        icon: "success",
      });
    };
    guardar();
  };

  return (
    <main className="bg-slate-800 h-screen flex justify-center items-center flex-col">
      <button
        onClick={listaOrdenada}
        className="fixed left-5 top-[50px] w-[200px] p-2 rounded bg-slate-600 text-white font-semibold"
      >
        Lista ordenada
      </button>

      <form
        onSubmit={guardarRegistro}
        className="flex flex-col p-20 bg-slate-900 text-white rounded-xl"
      >
        <h1 className="mb-2 text-4xl font-bold">Arbolito de emionehot</h1>
        <label className="text-xs " htmlFor="ingresar">
          Guarda un registro
        </label>
        <input
          className="rounded focus:outline-slate-400 text-black p-2 mt-1"
          type="text"
          id="ingresar"
          value={registro}
          onChange={(e) => setRegistro(e.target.value)}
        />
        <input
          type="submit"
          value="Guardar"
          className="bg-slate-800 p-2 rounded mt-3 text-lg font-semibold"
        />
      </form>
      {/* <div className="flex justify-center items-center"> */}
      <h1 className="text-3xl text-white font-semibold mt-5">Folio</h1>
      <input
        type="number"
        className="rounded outline-slate-500 p-1"
        onChange={(e) => setBuscar(e.target.value)}
      />
      <button
        className="bg-slate-700 p-2 text-xl font-semibold text-white mt-5"
        onClick={buscarFolio}
      >
        Buscar
      </button>
      {/* </div> */}

      <section className="w-full max-h-[200px] flex mt-5 px-20 overflow-y-scroll">
        <table className="w-full bg-white border-slate-950">
          <thead>
            <tr className="bg-slate-900">
              <th className="py-2 px-4 border-b text-white">Folio</th>
              <th className="py-2 px-4 border-b text-white">Categoria</th>
              <th className="py-2 px-4 border-b text-white">Acciones</th>
            </tr>
          </thead>
          <tbody className=" overflow-scroll">
            {registros.map((usuario) => (
              <Row
                key={usuario.id}
                id={usuario.id}
                categoria={usuario.categoria}
                setModificar={setModificar}
                setRegistro={setRegistro}
                usuario={usuario}
                setObjeto={setObjeto}
                eliminarRegistro={eliminarRegistro}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
