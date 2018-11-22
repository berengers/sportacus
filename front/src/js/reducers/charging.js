export function charging(state=false, action){
  switch (action.type) {
    case "CHARGING_STEPS":
    case "CHARGING_PROGRAM":
      return true
    case "CHARGED":
    case "CURRENT_PROGRAM":
      return false
    default:
      return state
  }
}
