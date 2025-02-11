// frontend/src/components/DocumentsTable.js
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import api from "../services/api";

const DocumentsTable = ({
  documents,
  onDocumentUpdated,
  onDocumentDeleted,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [editAssunto, setEditAssunto] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openEditDialog = (doc) => {
    setCurrentDoc(doc);
    setEditAssunto(doc.assunto || "");
    setEditStatus(doc.status || "Em andamento");
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentDoc(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/api/documents/${currentDoc.id}`, {
        assunto: editAssunto,
        status: editStatus,
      });
      onDocumentUpdated(response.data.document);
      closeEditDialog();
    } catch (error) {
      console.error("Erro ao atualizar documento:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/documents/${id}`);
      onDocumentDeleted(id);
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
    }
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
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Tipo</strong>
              </TableCell>
              <TableCell>
                <strong>Solicitante</strong>
              </TableCell>
              <TableCell>
                <strong>Número</strong>
              </TableCell>
              <TableCell>
                <strong>Identificador</strong>
              </TableCell>
              <TableCell>
                <strong>Criado em</strong>
              </TableCell>
              <TableCell>
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedDocs.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.id}</TableCell>
                <TableCell>{doc.tipo.toUpperCase()}</TableCell>
                <TableCell>{doc.comissao}</TableCell>
                <TableCell>{doc.numero.toString().padStart(3, "0")}</TableCell>
                <TableCell>{doc.numeroFormatado}</TableCell>
                <TableCell>{doc.assunto}</TableCell>
                <TableCell>{doc.status}</TableCell>
                <TableCell>{new Date(doc.criadoEm).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => openEditDialog(doc)}
                    variant="text" // Usando "text" deixa o botão mais discreto que "outlined" ou "contained"
                    size="small"
                    sx={{
                      minWidth: 0, // Remove o mínimo de largura
                      padding: "4px 6px", // Diminui o padding interno
                      fontSize: "0.75rem", // Diminui o tamanho da fonte
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(doc.id)}
                    variant="text"
                    size="small"
                    color="error"
                    sx={{
                      minWidth: 0,
                      padding: "4px 6px",
                      fontSize: "0.75rem",
                      ml: 1, // Margin left para separar um botão do outro
                    }}
                  >
                    Excluir
                  </Button>
                </TableCell>
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

      {/* Dialog de edição */}
      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Editar Documento</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Assunto"
            fullWidth
            value={editAssunto}
            onChange={(e) => setEditAssunto(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            helperText="Ex: Em andamento, Aprovado, Rejeitado"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DocumentsTable;
