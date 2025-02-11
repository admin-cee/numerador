// frontend/src/components/DocumentsTable.js
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';

const DocumentsTable = ({ documents }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedDocs = documents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ marginTop: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Solicitante</strong></TableCell>
              <TableCell><strong>Número</strong></TableCell>
              <TableCell><strong>Identificador</strong></TableCell>
              <TableCell><strong>Criado em</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedDocs.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.id}</TableCell>
                <TableCell>{doc.tipo.toUpperCase()}</TableCell>
                <TableCell>{doc.comissao}</TableCell>
                <TableCell>{doc.numero.toString().padStart(3, '0')}</TableCell>
                <TableCell>{doc.numeroFormatado}</TableCell>
                <TableCell>{new Date(doc.criadoEm).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={documents.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default DocumentsTable;
