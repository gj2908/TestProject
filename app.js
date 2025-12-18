const { createApp } = Vue;

createApp({
  template: `
    <div id="app">
      <header>
        <nav class="navbar">
          <div class="logo">
            <h2>My To-Do App</h2>
          </div>
        </nav>
      </header>
      <div class="container">
        <h1 class="title">TODO LIST</h1>
        <hr>
        <div class="input-group">
          <input type="text"
          class="form-control" 
          placeholder="Add item..." 
          v-model="userInput" 
          @keyup.enter="addItem">
          <button class="btn btn-success"
          @click="addItem">ADD</button>
        </div> 
        <div class="todo-table">
          <div class="table-header">
            <div class="table-cell">Task</div>
            <div class="table-cell">Actions</div>
          </div>
          <div class="table-body">
            <div class="table-row" v-for="(item, index) in filteredList" 
            :key="index" :class="{ 'even-row': index % 2 === 0, 'completed': item.completed }">
              <div class="table-cell" :class="{ 'completed-cell': item.completed }">{{ item.value }}</div>
              <div class="table-cell">
                <button class="btn btn-primary"
                @click="toggleCompleted(index)">
                  {{ item.completed ? 'Undo' : 'Complete' }}
                </button>
                <button class="btn btn-info" 
                @click="editItem(index)">Edit</button>
                <button class="btn btn-danger"
                @click="deleteItem(index)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      userInput: '',
      todoList: []
    };
  },
  computed: {
    filteredList() {
      return this.todoList;
    }
  },
  methods: {
    addItem() {
      if (this.userInput.trim()) {
        this.todoList.push({
          value: this.userInput,
          completed: false
        });
        this.userInput = '';
      }
    },
    deleteItem(index) {
      this.todoList.splice(index, 1);
    },
    toggleCompleted(index) {
      this.todoList[index].completed = !this.todoList[index].completed;
    },
    editItem(index) {
      const newValue = prompt('Edit task:', this.todoList[index].value);
      if (newValue) {
        this.todoList[index].value = newValue;
      }
    }
  }
}).mount('#app');
