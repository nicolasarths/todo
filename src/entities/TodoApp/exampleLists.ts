import TodoList from "src/entities/TodoList";

const moviesList = new TodoList("My favorite movies");
moviesList.addItem("Life Of Pi");
moviesList.addItem("The Avengers");
moviesList.addItem("Girl, Interrupted");
moviesList.addItem("Planet Of The Apes");

const financeList = new TodoList("Finance");
financeList.addItem("Pay bills");
financeList.addItem("Pay car");
financeList.addItem("Salary day");

const studiesList = new TodoList("Studies");
studiesList.addItem("Tests' week");
studiesList.addItem("Study group meeting");
studiesList.addItem("Lecture at campus");

const exampleLists = [moviesList, financeList, studiesList];

export default exampleLists;
