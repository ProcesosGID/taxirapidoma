import React,{ useEffect,useMemo} from 'react'
import moment from 'moment';
import {MomentLocaleEs} from '../constants/MomentLocaleEs';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import * as FormularioService from '../services/FormularioService';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
const LeerDatos = () => {
    const [fechaInicio, setFechaInicio] = useState(moment().locale('es', MomentLocaleEs).subtract(365, 'days'));
  const [fechahoy, setFechahoy] = useState(moment().locale('es', MomentLocaleEs));
  const [value,setValue] = useState([]);

    useEffect(() => {
        const list={
            fromDate:fechaInicio,
            toDate:fechahoy
        }
        FormularioService.getFormularios(list,setValue)
    }, [])
    useEffect(() => {
        if(value) {
            console.log(value);
        }
        
    }, [value])
    
    const columns = useMemo(
        () => [
          {
            accessorKey: 'id', //access nested data with dot notation
            header: 'N°',
            size: 140,
          },
          {
            accessorKey: 'codigo', //access nested data with dot notation
            header: 'Codigo',
            size: 140,
          },
          {
            accessorKey: 'nombres', //access nested data with dot notation
            header: 'Nombres',
            size: 140,
          },
          {
            accessorKey: 'tipo_carro', //access nested data with dot notation
            header: 'Tipo Carro',
            size: 140,
          },
          {
            accessorKey: 'correo', //access nested data with dot notation
            header: 'Correo',
            size: 140,
          },
          {
            accessorKey: 'dni', //access nested data with dot notation
            header: 'DNI',
            size: 140,
          },
          {
            accessorKey: 'numero_telefono', //access nested data with dot notation
            header: 'Telefono',
            size: 140,
          },
          {
            accessorFn: (row) => moment(row.compradoEn).format("DD-MM-YYYY"),
            accessorKey: 'fecha_nacimiento', //access nested data with dot notation
            header: 'Fecha Nacimiento',
            size: 140,
          },
          {
            accessorFn: (row) => moment(row.compradoEn).format("DD-MM-YYYY hh:mm.ss"),
            accessorKey: 'fecha_creacion', //access nested data with dot notation
            header: 'Fecha Creacion',
            size: 140,
          }
        ],
        [],
      );
      const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
      };
      
      const csvExporter = new ExportToCsv(csvOptions);
      const handleExportRows = (rows) => {
        csvExporter.generateCsv(rows.map((row) => row.original));
      };
    
      const handleExportData = () => {
        csvExporter.generateCsv(data);
      };
    
 return (
 <> 
    <h1>Lista de registros</h1>
     <MaterialReactTable 
    columns={columns} 
    data={value}
      localization={MRT_Localization_ES}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
        >
      
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Exportar en CSV
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Por pagina
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Exportar por seleccionar
          </Button>
        </Box>
      )}
     />
 </>
 )
}

export default LeerDatos