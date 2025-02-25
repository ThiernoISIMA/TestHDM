import { Check, Delete, Search } from '@mui/icons-material';
import {
  Box, Button, Container, IconButton, TextField, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ taskValues, setTaskValues ] = useState<Record<number, string>>({});
  const [ newTask, setNewTask ] = useState<string>('');
  const [ searchQuery, setSearchQuery ] = useState<string>('');

  //  Récupère toutes les tâches
  const handleFetchTasks = async () => {
    const fetchedTasks = await api.get('/tasks');
    setTasks(fetchedTasks);
    const values: Record<number, string> = {};
    // @ts-ignore
    // eslint-disable-next-line no-return-assign
    fetchedTasks.forEach((task: { id: string | number, name: string, }) => (values[task.id] = task.name));
    setTaskValues(values);
  };

  //  Recherche des tâches par nom
  const handleSearch = async () => {
    try {
      const results = await api.get(`/tasks/search?name=${searchQuery}`);
      setTasks(results);
    } catch (error) {
      console.error('Erreur lors de la recherche des tâches:', error);
    }
  };

  //  Réinitialise la recherche
  const handleResetSearch = () => {
    setSearchQuery('');
    handleFetchTasks();
  };

  //  Supprime une tâche
  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    handleFetchTasks();
  };

  //  Sauvegarde (ajout ou modification)
  const handleSave = async (id?: number) => {
    if (id) {
      await api.patch(`/tasks/${id}`, { name: taskValues[id] });
    } else if (newTask.trim()) {
      await api.post('/tasks', { name: newTask });
      setNewTask('');
    }
    handleFetchTasks();
  };

  //  Gère les changements dans le champ de texte
  const handleTaskChange = (id: number, newValue: string) => {
    setTaskValues((prev) => ({ ...prev, [id]: newValue }));
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      {/*  Barre de recherche */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={1}>
        <TextField
          size="small"
          placeholder="Rechercher une tâche par nom..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ maxWidth: 400 }}
        />
        <Button variant="contained" startIcon={<Search />} onClick={handleSearch} disabled={!searchQuery.trim()}>
          Rechercher
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleResetSearch}>
          Réinitialiser
        </Button>
      </Box>

      {/*  Liste des tâches existantes */}
      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box
            key={task.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={1}
            width="100%"
          >
            <TextField
              size="small"
              value={taskValues[task.id] ?? task.name}
              fullWidth
              sx={{ maxWidth: 350 }}
              onChange={(e) => handleTaskChange(task.id, e.target.value)}
            />
            <Box>
              <IconButton
                color="success"
                disabled={task.name === taskValues[task.id]}
                onClick={() => handleSave(task.id)}
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        {/*  Ajout de nouvelle tâche */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={1}>
          <TextField
            size="small"
            value={newTask}
            placeholder="Nouvelle tâche..."
            fullWidth
            sx={{ maxWidth: 350 }}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            variant="outlined"
            disabled={!newTask.trim()}
            onClick={() => handleSave()}
          >
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
