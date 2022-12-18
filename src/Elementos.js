import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Elementos.css";
import pen from "./images/pen.svg"
import trash from "./images/trash.svg"

export default function Elementos() {
  const [elementos, setElementos] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [formato, setFormato] = useState("");
  const [tipo, setTipo] = useState("");

  const url = "https://backendexpress-sage.vercel.app/";

  useEffect(() => {
    fetch(url + "elementos")
      .then((response) => response.json())
      .then((data) => setElementos(data))
      .catch((err) => console.log(err));
  }, [url]);

  function novosDados() {
    setTipo("novo");
  }

  function limparDados() {
    setId("");
    setNome("");
    setFormato("");
    setTipo("");
  }

  function editarDados(cod) {
    let elemento = elementos.find((item) => item.id === cod);
    const { id, nome, formato } = elemento;
    setTipo("editar");
    setId(id);
    setNome(nome);
    setFormato(formato);
  }

  function apagarDados(cod) {
    axios.delete(url + "elementos/" + cod).then(() => {
      //atualizar a lista
      setElementos(elementos.filter((item) => item.id !== cod));
    });
  }

  function atualizaListaComNovoElemento(response) {
    let { id, nome, formato } = response.data;
    let obj = { id: id, nome: nome, formato: formato };
    let contents = elementos;
    contents.push(obj);
    setElementos(contents);
    limparDados("");
  }

  function atualizaListaElementoEditado(response) {
    let { id } = response.data;
    const index = elementos.findIndex((item) => item.id === id);
    let contents = elementos;
    contents[index].nome = nome;
    contents[index].formato = formato;
    setElementos(contents);
    limparDados("");
  }

  function gravaDados() {
    if (nome !== "" && formato !== "") {
      if (tipo === "novo") {
        axios
          .post(url + "elementos", {
            nome: nome,
            formato: formato,
          })
          .then((response) => atualizaListaComNovoElemento(response))
          .catch((err) => console.log(err));
      } else if (tipo === "editar") {
        axios
          .put(url + "elementos/" + id, {
            id: id,
            nome: nome,
            formato: formato,
          })
          .then((response) => atualizaListaElementoEditado(response))
          .catch((err) => console.log(err));
      }
    } else {
      console.log("Preencha os campos");
    }
  }

  return (
    <div className="corpo">
      <button className= "myButton-new" type="button" onClick={novosDados}>
        Adicionar
      </button>
      {tipo ? (
        <>
          <input
            type="text"
            name="txtNome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
          <input
            type="text"
            name="txtformato"
            value={formato}
            onChange={(e) => {
              setFormato(e.target.value);
            }}
          />
          <button className= "myButton-cancel" type="button" onClick={limparDados}>
            Cancelar
          </button>

          <button className= "myButton-cadastro" type="button" onClick={gravaDados}>
            Cadastrar
          </button>
        </>
      ) : (
        false
      )}

      {elementos
        ? elementos.map((item) => {
            return(

            <div key={item.id}>
             
              <div class = "linha">
                
                {item.id} - {item.nome} - {item.formato}{" "}

                <img className="edit"
                  alt="Editar"
                  src={pen}
                  id={item.id}
                  height={20}
                  width={20}
                  onClick={(e) => editarDados(item.id)}
                />
                <img className="delete"
                  alt="Apagar"
                  src={trash}
                  id={item.id}
                  height={20}
                  width={20}
                  onClick= {(e) => apagarDados(item.id)}
                />

              </div>
            </div>
            );
          })
        : false}
    </div>
  );
}
