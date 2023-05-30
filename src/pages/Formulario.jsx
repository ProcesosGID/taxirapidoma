import styled from "styled-components";
import { Btnoperaciones } from "../components/Btnoperaciones";
import { FcPicture } from "react-icons/fc";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import moment from 'moment';
import {MomentLocaleEs} from '../constants/MomentLocaleEs';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { RiFlagLine } from 'react-icons/ri';
import * as FormularioService from '../services/FormularioService';
import { useState } from "react";
import { useEffect } from "react";

export function Formulario() {
  const [response,setResponse] = useState([]);
  const [guardar,setGuardar] = useState();
  const { register, formState: { errors }, handleSubmit, reset, watch, setValue } = useForm({defaultValues:{
    codigo:"",correo:"",nombres:"",documento:"",telefono:"",tipoCarro:"",fechaNacimiento:""
  }});

  const onSubmit = async (data) => {
    // Verificar si el código del pedido de taxi está registrado
    try {
      const response = await FormularioService.getCodigoTaxi(setValue, data.codigo);
      console.log(response); // Muestra el cuerpo de la respuesta en la consola
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('El recurso no fue encontrado');
        setGuardar(data);
      } else {
        console.log('Ocurrió un error al obtener el código del taxi:', error.message);
        swal('error', "El codigo del taxi ya existe")
      }
    }
  };
  useEffect(() => {
    if(guardar){
      insertar(guardar);
    }
  }, [guardar])
  



  function insertar(data) {
    const datos = {
      codigo: data.codigo,
      tipo_carro: data.tipoCarro,
      nombres: data.nombres,
      numero_telefono: data.telefono,
      correo: data.correo,
      dni: data.documento,
      fecha_nacimiento: moment(data.fechaNacimiento).locale('es', MomentLocaleEs),
      fecha_creacion: moment().locale('es', MomentLocaleEs)
    }
    
    FormularioService.insertConteo(datos, setResponse)
      .then(() => {
        swal("Se registró correctamente", data.nombres);
        reset();
      })
      .catch((error) => {
        console.error("Error al registrar los datos:", error);
        swal("Error", "No se pudo registrar el formulario", "error");
      });
  }
 
function handlePhoneInputChange(value) {
  setValue("telefono", value); // Actualizar el valor del campo de teléfono
}
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="header">
          <TituloPrincipal>📤Registro Maria Almenara</TituloPrincipal>
           {/* <h1>Viendo: {watch("codigo")}</h1>  */}
        </div>

        <form className="entradas" onSubmit={handleSubmit(onSubmit)}>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Código del pedido de taxi:</h4>
              <Inputs
                placeholder="Código del pedido de taxi"
                type="text"
                {...register("codigo", {
                  required: true,
                  minLength: 1,
                })}
              />
              {errors.codigo?.type === "required" && (
                <p>Ingrese código del pedido de taxi</p>
              )}
              {errors.codigo?.type === "minLength" && (
                <p>Ingrese como minimo 2 caracteres</p>
              )}
              {/* {errors.codigo?.type === "maxLength" && (
                <p>Ingrese como maximo 20 caracteres</p>
              )} */}
            </div>
          </ContainerInputs>
          <ContainerInputs>
              <div className="subcontainer">
                <h4>Selecciona el tipo de carro:</h4>
                <select className="select-field" {...register("tipoCarro", { required: true })}>
                  <option value="">Selecciona el tipo de carro</option>
                  <option value="Lite">Lite</option>
                  <option value="Confort">Confort</option>
                  <option value="XL">XL</option>
                  <option value="VAN">VAN</option>
                  {/* Agrega más opciones según tus necesidades */}
                </select>
                {errors.tipoCarro?.type === "required" && (
                  <p>Selecciona el tipo de carro</p>
                )}
              </div>
            </ContainerInputs>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Nombres y apellidos:</h4>
              <Inputs
                type="text"
                placeholder="Ingrese nombres y apellidos"
                {...register("nombres", { required: true, pattern: /^[A-Za-z\s]+$/ })}
              />
              {errors.nombres?.type === "required" && (
                <p>Ingrese por favor los nombres y apellidos</p>
              )}
              {errors.nombres?.type === "pattern" && (
                <p>Ingrese solo caracteres alfabéticos en el campo</p>
              )}
            </div>
          </ContainerInputs>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Correo electrónico </h4>
              <Inputs
                type="text"
                placeholder="Ingrese su Correo electrónico "
                {...register("correo", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
              />
              {errors.correo?.type === "pattern" && (
               <p>Ingrese un correo electrónico válido</p>
              )}
                {errors.correo?.type === "required" && (
                <p>El correo  es requerido</p>
              )}
            </div>
          </ContainerInputs>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>DNI</h4>
              <Inputs
                type="text"
                placeholder="Ingrese DNI"
               {...register("documento",{required:true,minLength: 8, maxLength: 8})}
              />
              {errors.documento?.type === "required" && (
                <p>El DNI es requerido</p>
              )}
               {errors.documento?.type === "minLength" && (
                <p>El DNI debe tener al menos 8 caracteres</p>
              )}
              {errors.documento?.type === "maxLength" && (
                <p>El DNI no puede exceder los 8 caracteres</p>
              )}
            </div>
          </ContainerInputs>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Número de teléfono:</h4>
              <PhoneInput
                {...register("telefono", { required: true })}
                defaultCountry="PE"
                placeholder="Ingrese número de teléfono"
                value={watch("telefono")}
                onChange={handlePhoneInputChange}
                countrySelectProps={{ tabIndex: -1 }}
                inputProps={{ autoFocus: true }}
                icon={<RiFlagLine />}
              />
              {errors.telefono?.type === "required" && (
                <p>Ingrese por favor el número de teléfono</p>
              )}
            </div>
          </ContainerInputs>
          <ContainerInputs>
              <div className="subcontainer">
                <h4>Fecha de nacimiento</h4>
                <input type="date" className="inputdate" {...register("fechaNacimiento", { required: true })} />
                {errors.fechaNacimiento?.type === "required" && (
                  <p>Ingrese la fecha de nacimiento</p>
                )}
              </div>
          </ContainerInputs>
          <div className="footercontent">
            <Btnoperaciones titulo="enviar" icono={<FcPicture />} />
          </div>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  margin-top:2em;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    color: white;
    text-shadow: 0px 0px 1px black;
   }
  @media screen and (max-width: 507px) {
    margin-top: 0;
  }
  .sub-contenedor {
    width: 100%;
    background-color: #e7ebf0;
    border-radius: 10px;
    padding: 10px 20px;
    margin: 0px 20px;
    @media screen and (max-width: 320px) {
      padding: 0;
      margin: 0;
    }  
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
    }
    .pictureContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-direction: column;
      img {
        width: 100px;
        object-fit: cover;
      }
      input {
        display: none;
      }
    }
    .entradas {
      .footercontent {
        display: flex;
        align-items: center;
        height: 100%;
        gap: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: center;
      }
    }
  }
`;
const TituloPrincipal =styled.h1`
font-size:2em;
color:#ff0000;
@media screen and (max-width: 507px) {
  padding-top: 1em;
  text-align: center;
}  
`;
const ContainerInputs = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  .subcontainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-direction: column;
    .inputdate{
      border: 2px solid #e8e8e8;
      padding: 15px;
      border-radius: 10px;
      background-color: white;
      font-size: small;
      font-weight: bold;
      color: black;
      width: 70%;
      text-align: center;
      &:focus {
        outline-color: white;
        background-color: white;
        color: black;
        box-shadow: 5px 5px #888888;
      }
      &::-webkit-calendar-picker-indicator {
        margin-right: -.35em; // @note Harmonisation avec les icônes remplacées.
        filter: invert(48%) sepia(40%) saturate(0%) hue-rotate(203deg) brightness(90%) contrast(95%); // @note Harmonisation avec les icônes remplacées @see https://stackoverflow.com/a/43960991/4960244
        cursor: pointer;
        }
       &::-webkit-calendar-picker-indicator:hover {
          filter: invert(60%) sepia(100%) saturate(1854%) hue-rotate(3deg) brightness(107%) contrast(106%);
          
        }
        @media screen and (max-width: 479px) {
          width: 90%;
        }
    }
    .select-field{
      border: 2px solid #e8e8e8;
  padding: 15px;
  border-radius: 10px;
  background-color: white;
  font-size: small;
  font-weight: bold;
  color: black;
  width: 70%;
  border-right: 8px solid transparent;
  @media screen and (max-width: 479px) {
    width: 90%;
  }
    }
    .PhoneInput {
      display: flex;
      align-items: center;
      width: 70%;
      @media screen and (max-width: 479px) {
        width: 90%;
      }
      
  }
    .PhoneInputCountry + input{
      border: 2px solid rgb(232, 232, 232);
      padding: 15px;
      border-radius: 10px;
      background-color: white;
      font-size: small;
      font-weight: bold;
      color: black;
      text-align: start;
      width: 100%;
      &::placeholder {
        color:black;
      }
      &:focus {
        outline-color: white;
        background-color: white;
        color: black;
        box-shadow: 5px 5px #888888;
        border:none !important;
      }
    }
  }
  p{
    color: red;
    @media screen and (max-width: 479px) {
      text-align:center;
    }
  }
`;
const Inputs = styled.input`
  border: 2px solid #e8e8e8;
  padding: 15px;
  border-radius: 10px;
  background-color: white;
  font-size: small;
  font-weight: bold;
  text-align: center;
  color: black;
  text-align: start;
  width: 70%;
  ::placeholder {
    color:black;
  }
  @media screen and (max-width: 479px) {
    width: 90%;
  }
  &:focus {
    outline-color: white;
    background-color: white;
    color: black;
    box-shadow: 5px 5px #888888;
  }
`;
