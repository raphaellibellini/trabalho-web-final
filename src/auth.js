
export const getUserData = ()=>{
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    const id = localStorage.getItem('id');
    return (
        {
            id,
            tipoUsuario
        }
    )
}

export const checkRole = (userRole)=>{
    const { tipoUsuario } = getUserData();
    
    return tipoUsuario === userRole;
}

export const isAuthenticated = () => {
    return !!getUserData().id;
};    
