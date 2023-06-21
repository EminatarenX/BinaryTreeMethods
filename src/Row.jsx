import React from "react";

export default function Row({id, categoria, setModificar, setRegistro, usuario, setObjeto, eliminarRegistro}) {
  return (
    <tr>
      <td className="py-2 px-4 border-b text-center">{id}</td>
      <td className="py-2 px-4 border-b text-center">{categoria}</td>
      <td className="flex justify-evenly py-2 px-4">
        <button className="bg-sky-600 text-white font-semibold w-[100px] rounded"
          onClick={()=>{
            setModificar(true)
            setRegistro(categoria)
            setObjeto(usuario)
          }}
        >
          Modificar
        </button>
        <button onClick={()=> eliminarRegistro(usuario.id)} className="bg-red-600 text-white font-semibold w-[100px] rounded">
          Eliminar
        </button>
      </td>
    </tr>
  );
}
