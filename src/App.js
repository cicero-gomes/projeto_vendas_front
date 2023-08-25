import React, { useEffect, useState } from "react";
import api from "./services/api";
import { Table, Paper } from '@mantine/core';
import { Input, Button } from '@mantine/core';

import { Group, Text, rem } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Alert } from '@mantine/core';

export default function App() {
  const [sale, setSale] = useState([]);
  const [cardFile, setCardFile] = useState(null);
  const [precoBruto, setPrecoBruto] = useState(0.0)


  const handleUploadFile = (e) => setCardFile(e.target.files[0]);

  function table(sale) {

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>descricao</th>
              <th>preco</th>
              <th>quantidade</th>
              <th>nome</th>
              <th>cpfCnpj</th>
              <th>endereco</th>
            </tr>
          </thead>
          <tbody>
            {
              sale.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.descricao}</td>
                    <td>{element.preco}</td>
                    <td>{element.quantidade}</td>
                    <td>{element.nome}</td>
                    <td>{element.cpfCnpj}</td>
                    <td>{element.endereco}</td>
                  </tr>

                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }

  function precoTotal(precoBruto) {
    return (
      <label>Renda Bruta:
        <Input
          type="text"
          value={precoBruto.receitaBruta} readonly></Input>
      </label>
    )
  }


  const addNewCard = () => {
    window.location.reload(true);
    let data = new FormData();
    data.append("file", cardFile);
    console.log(data)
    api.post('/sale/upload', data)
      .then((response) => setPrecoBruto(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

  };

  useEffect(() => {
    api
      .get("/sale")
      .then((response) => setSale(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);



  return (
    <div className="App">
      <Paper shadow="xs" p="md" withBorder>
        <Input
          type="file"
          multiple="multiple"
          color="dark"
          accept="text/plain"
          onChange={handleUploadFile}
          required

        />
        <Button color="dark"
          onClick={addNewCard}
        >Send File</Button >
        {/* {precoBruto.receitaBruta != null &&
          <label>Renda Bruta:
            <Input
              type="text"
              value={precoBruto.receitaBruta} readonly></Input>
          </label>

        } */}

        {precoTotal(precoBruto)}

        {sale && table(sale)}

        {/* <Table>
          <thead>
            <tr>
              <th>descricao</th>
              <th>preco</th>
              <th>quantidade</th>
              <th>nome</th>
              <th>cpfCnpj</th>
              <th>endereco</th>
            </tr>
          </thead>
          <tbody>
            {
              sale.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.descricao}</td>
                    <td>{element.preco}</td>
                    <td>{element.quantidade}</td>
                    <td>{element.nome}</td>
                    <td>{element.cpfCnpj}</td>
                    <td>{element.endereco}</td>
                  </tr>

                )
              })
            }
          </tbody>
        </Table> */}
      </Paper>
    </div>

  );
}