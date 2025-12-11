"use client";

import { get } from "http";
import Link from "next/link";
import { useEffect, useState } from "react";
type Tarefa = {
  id: number;
  texto: string;
  categoria: string;
};

export default function InputPage() {
  // estado do input de texto
  const [texto, setTexto] = useState("");

  // estado do seletor
  const [categoria, setCategoria] = useState("React");

  // lista de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    const tarefasStored = localStorage.getItem('tarefas'); 
    return tarefasStored ? JSON.parse(tarefasStored): []
  });

  // edição de tarefas
  const [idEmEdicao, setIdEmEdicao] = useState<number | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  // adicionar tarefa
  function adicionarTarefa() {
    const textoLimpo = texto.trim();
    if (!textoLimpo) return;

    const novaTarefa: Tarefa = {
      id: Date.now(),
      texto: textoLimpo,
      categoria,
    };

    setTarefas((prev) => [...prev, novaTarefa]);
    setTexto("");
  }

  // apagar tarefa
  function apagarTarefa(id: number) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
    if (idEmEdicao === id) {
      setIdEmEdicao(null);
      setTextoEdicao("");
    }
  }

  // iniciar edição
  function iniciarEdicao(tarefa: Tarefa) {
    setIdEmEdicao(tarefa.id);
    setTextoEdicao(tarefa.texto);
  }

  // guardar edição
  function guardarEdicao(id: number) {
    const textoLimpo = textoEdicao.trim();
    if (!textoLimpo) return;

    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, texto: textoLimpo } : t
      )
    );
    setIdEmEdicao(null);
    setTextoEdicao("");
  }

  // cancelar edição
  function cancelarEdicao() {
    setIdEmEdicao(null);
    setTextoEdicao("");
  }

  useEffect (() => {
    localStorage.setItem('tarefas',JSON.stringify(tarefas))
  },[tarefas])

  

  

  return (
    <>
      <h2>Input & Tarefas</h2>

      {/* INPUT DE TEXTO */}
      <div className= "mt-4 mb-6">
        <label className="block mb-2">
          Escrever algo:
        </label>
        <input
          type="text"
          className="border rounded-lg px-3 py-2 w-full max-w-md"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escrever aqui..."
        />
        <p className="mt-2">
          Texto digitado:{" "}
          <span className="font-semibold">
            {texto}
          </span>
        </p>
      </div>

      {/* SELETOR DE CATEGORIAS */}
      <div className="mt-4 mb-6">
        <label className="block mb-2">
          Escolher categoria / tecnologia:
        </label>
        <select
          className="border rounded-lg px-3 py-2 w-full max-w-xs"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option>React</option>
          <option>Next.js</option>
          <option>JavaScript</option>
          <option>HTML &amp; CSS</option>
          <option>Outros</option>
        </select>
      </div>

      {/* BOTÃO PARA ADICIONAR TAREFA */}
      <div className="mt-2 mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded-xl"
          onClick={adicionarTarefa}
        >
          Inserir tarefa
        </button>
      </div>

      {/* LISTA DE TAREFAS */}
      <h3>Lista de tarefas:</h3>
      {tarefas.length === 0 ? (
        <p className="mt-2 text-sm text-gray-600">
          Ainda não há tarefas.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className="flex items-start justify-between gap-2 bg-white/50 rounded-lg px-3 py-2"
            >
              <div className="flex-1">
                <span className="text-xs text-gray-500">
                  {tarefa.categoria}
                </span>
                {idEmEdicao === tarefa.id ? (
                  <input
                    type="text"
                    className="border rounded-lg px-2 py-1 w-full mt-1"
                    value={textoEdicao}
                    onChange={(e) =>
                      setTextoEdicao(e.target.value)
                    }
                  />
                ) : (
                  <p className="mt-1">{tarefa.texto}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                {idEmEdicao === tarefa.id ? (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-2 py-1 rounded-lg text-sm"
                      onClick={() => guardarEdicao(tarefa.id)}
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white px-2 py-1 rounded-lg text-sm"
                      onClick={cancelarEdicao}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={() => iniciarEdicao(tarefa)}
                  >
                    Editar
                  </button>
                )}

                <button
                  className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1 rounded-lg text-sm"
                  onClick={() => apagarTarefa(tarefa.id)}
                >
                  Apagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
