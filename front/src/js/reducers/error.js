
export function error(state='', action){
  switch (action.type) {
    case "ERROR_LOGIN":
      return "error login"
    default:
      return state
  }
}
