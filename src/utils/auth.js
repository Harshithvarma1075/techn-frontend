export function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers")) || [];
}

export function saveRegisteredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

export function findUserByEmail(email) {
  const users = getRegisteredUsers();

  return users.find(
    user => user.email.toLowerCase() === email.toLowerCase()
  );
}
