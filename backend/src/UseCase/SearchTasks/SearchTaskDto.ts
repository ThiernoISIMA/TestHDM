export default class SearchTaskDto {
  // Le nom peut être partiel (recherche "contains")
  name?: string;
  // La date au format "YYYY-MM-DD" pour filtrer les tâches créées ce jour-là
  date?: string;
}
