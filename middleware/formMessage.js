export function error(message){
    switch (message) {
        case "Email is already taken.":
            return "Ya hay un usuario con este Email"
        case "Identifier or password invalid.":
            return "Usuario o contraseña incorrecta"
        default:
            return "Error, intente la accion mas tarde";
    }
}