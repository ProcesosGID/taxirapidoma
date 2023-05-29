import axios from "axios";
import {urlAzure} from "../config";

export async function getCodigoTaxi(setValue, id) {
  var config = {
    method: 'get',
    url: `${urlAzure}formulario/list/${id}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios(config);
    setValue(response.data);
    return response.data;
  } catch (error) {
    // Manejar el error aquí si es necesario
    console.error('Error al obtener el código del pedido de taxi:', error);
    throw error;
  }
}

export async function insertConteo(datos, setValue) {
    try {
      var data = JSON.stringify(datos);
      var config = {
        method: 'post',
        url: `${urlAzure}formulario/create`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      const response = await axios(config);
      setValue(response.data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Maneja el error de acuerdo a tus necesidades
    }
  }