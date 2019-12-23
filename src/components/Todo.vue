<template>
  <div class="container">
    <h4>{{ heading }}</h4>
    <div class="row container">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input
              v-model="addTodo.title"
              id="title"
              type="text"
              class="validate"
              placeholder="Title"
            />
            <!-- <label for="title">Title</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              v-model="addTodo.description"
              id="description"
              type="text"
              class="validate"
              placeholder="Description"
            />
            <!-- <label for="description">Description</label> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <button
              v-if="editBtn"
              class="btn waves-effect waves-light"
              @click="onEdit"
            >
              Edit
              <i class="material-icons right">send</i>
            </button>
            <button v-else class="btn waves-effect waves-light" @click="onAdd">
              Submit
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>

    <table class="centered highlight">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody class="striped" v-for="todo in todos" v-bind:key="todo.id">
        <tr class="todos-list">
          <td>{{ todo.title }}</td>
          <td>{{ todo.description }}</td>
          <td>
            <i @click="setEdit(todo)" class="del material-icons small"
              >mode_edit</i
            >
            <i @click="onDelete(todo.id)" class="del material-icons small"
              >delete</i
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import firebase from "firebase";
import { db } from "../db";

export default {
  name: "Todo",
  props: { heading: String },
  data() {
    return {
      todos: [],
      addTodo: {
        id: 0,
        title: "",
        description: ""
      },
      editBtn: false
    };
  },
  created() {
    this.getTodos();
  },
  // mounted() {
  //   db.enablePersistence().catch(err => {
  //     if(err.code == 'failed-precondition'){
  //       alert('Persistance Failed!');
  //     } else if(err.code == 'unimplemented') {
  //       alert('Persistance not available!');
  //     }
  //   })
  // },
  methods: {
    getTodos() {
      db.collection("items")
        .get()
        .then(querySnapshot => {
          const todos = [];
          querySnapshot.forEach(doc => {
            todos.push(doc.data());
          });
          this.todos = todos;
        });
    },
    onAdd(e) {
      e.preventDefault();
      this.addTodo.id = Math.floor(Math.random() * 1000);
      db.collection("items")
        .add(this.addTodo)
        .then(() => {
          this.addTodo.id = 0;
          this.addTodo.title = "";
          this.addTodo.description = "";
          this.getTodos();
        })
        .catch(err => {
          alert(err.toString());
        });
    },
    onDelete(id) {
      db.collection("items")
        .where("id", "==", id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete().then(this.getTodos);
          });
        });
      this.addTodo.title = "";
      this.addTodo.description = "";
      this.addTodo.id = 0;
      this.editBtn = false;
    },
    setEdit(todo) {
      this.addTodo.title = todo.title;
      this.addTodo.description = todo.description;
      this.addTodo.id = todo.id;
      this.editBtn = true;
    },
    onEdit(e) {
      e.preventDefault();
      db.collection("items")
        .where("id", "==", this.addTodo.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            db.collection("items")
              .doc(doc.id)
              .update(this.addTodo)
              .then(() => {
                this.addTodo.title = "";
                this.addTodo.description = "";
                this.addTodo.id = 0;
                this.getTodos();
              });
          });
        });
      this.editBtn = false;
    }
  }
};
</script>

<style scoped>
.todos-list {
  padding: 20px;
  text-align: left;
}
.del {
  cursor: pointer;
}
</style>
