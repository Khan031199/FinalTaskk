let tasks = [];

// Add a new task
function addTask(event) {
  event.preventDefault();

  const activityInput = document.getElementById('activity');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const statusInput = document.getElementById('status');

  const task = {
    activity: activityInput.value,
    startDate: startDateInput.value,
    endDate: endDateInput.value,
    status: statusInput.value,
  };

  tasks.push(task);
  activityInput.value = '';
  startDateInput.value = '';
  endDateInput.value = '';

  renderTable();
}

// Render the task table
function renderTable() {
  const taskTableBody = document.getElementById('task-table-body');
  taskTableBody.innerHTML = '';

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');

    const activityCell = document.createElement('td');
    activityCell.textContent = task.activity;
    row.appendChild(activityCell);

    const startDateCell = document.createElement('td');
    startDateCell.textContent = task.startDate;
    row.appendChild(startDateCell);

    const endDateCell = document.createElement('td');
    endDateCell.textContent = task.endDate;
    row.appendChild(endDateCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = task.status;
    row.appendChild(statusCell);

    const actionsCell = document.createElement('td');
    actionsCell.classList.add('actions-cell');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    actionsCell.appendChild(deleteButton);

    if (task.status !== 'Completed' && task.status !== 'Due-Passed') {
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => openEditModal(index));
      actionsCell.appendChild(editButton);
    }

    row.appendChild(actionsCell);

    if (task.status === 'Completed' || task.status === 'Due-Passed') {
      row.classList.add('strike-through');
    }

    taskTableBody.appendChild(row);
  });
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTable();
}

// Open the edit modal with task details
function openEditModal(index) {
  const task = tasks[index];
  const editModal = document.getElementById('edit-modal');

  const editTaskId = document.getElementById('edit-task-id');
  const editActivityInput = document.getElementById('edit-activity');
  const editStartDateInput = document.getElementById('edit-start-date');
  const editEndDateInput = document.getElementById('edit-end-date');
  const editStatusInput = document.getElementById('edit-status');

  editTaskId.value = index;
  editActivityInput.value = task.activity;
  editStartDateInput.value = task.startDate;
  editEndDateInput.value = task.endDate;
  editStatusInput.value = task.status;

  editModal.style.display = 'block';
}

// Save the edited task
function saveEditedTask(event) {
  event.preventDefault();

  const editTaskId = document.getElementById('edit-task-id');
  const editActivityInput = document.getElementById('edit-activity');
  const editStartDateInput = document.getElementById('edit-start-date');
  const editEndDateInput = document.getElementById('edit-end-date');
  const editStatusInput = document.getElementById('edit-status');

  const index = parseInt(editTaskId.value);
  const task = tasks[index];

  task.activity = editActivityInput.value;
  task.startDate = editStartDateInput.value;
  task.endDate = editEndDateInput.value;
  task.status = editStatusInput.value;

  closeEditModal();
  renderTable();
}

// Close the edit modal
function closeEditModal() {
  const editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
}

// Initialize the application
function initialize() {
  const taskForm = document.getElementById('task-form');
  const searchInput = document.getElementById('search-input');
  const editForm = document.getElementById('edit-form');
  const editCancel = document.getElementById('edit-cancel');

  taskForm.addEventListener('submit', addTask);
  searchInput.addEventListener('keyup', searchTasks);
  editForm.addEventListener('submit', saveEditedTask);
  editCancel.addEventListener('click', closeEditModal);
}

// Search for tasks
function searchTasks() {
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task => {
    return (
      task.activity.toLowerCase().includes(searchText) ||
      task.startDate.toLowerCase().includes(searchText) ||
      task.endDate.toLowerCase().includes(searchText) ||
      task.status.toLowerCase().includes(searchText)
    );
  });

  renderSearchResults(filteredTasks);
}

// Render the search results
function renderSearchResults(results) {
  const taskTableBody = document.getElementById('task-table-body');
  taskTableBody.innerHTML = '';

  results.forEach((task, index) => {
    const row = document.createElement('tr');

    const activityCell = document.createElement('td');
    activityCell.textContent = task.activity;
    row.appendChild(activityCell);

    const startDateCell = document.createElement('td');
    startDateCell.textContent = task.startDate;
    row.appendChild(startDateCell);

    const endDateCell = document.createElement('td');
    endDateCell.textContent = task.endDate;
    row.appendChild(endDateCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = task.status;
    row.appendChild(statusCell);

    const actionsCell = document.createElement('td');
    actionsCell.classList.add('actions-cell');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    taskTableBody.appendChild(row);
  });
}

// Initialize the application
initialize();
