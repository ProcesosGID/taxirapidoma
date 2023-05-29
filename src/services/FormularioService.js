import axios from "axios";
import {urlAzure} from "../config";

export async function getCodigoTaxi(setValue,id) {
    var data = '';
    var config = {
        method: 'get',
        url: `${urlAzure}formulario/list/${id}`,
        headers: {},
        data : data
      };
    const response = await axios(config)
    setValue(response.data)
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