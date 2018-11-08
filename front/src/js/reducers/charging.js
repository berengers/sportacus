export function charging(state=false, action){
  switch (action.type) {
    case "CHARGING_STEPS":
      return true
    case "CHARGED":
      return false
    default:
      return state
  }
}
