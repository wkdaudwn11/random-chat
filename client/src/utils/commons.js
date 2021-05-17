export function getName() {
  const nowName = localStorage.getItem("socket-test-app-name");
  return nowName ? nowName : "anonymous";
}

export function setNameLocalStorage(name) {
  if (!name) return false;
  localStorage.setItem("socket-test-app-name", name);
  return true;
}
