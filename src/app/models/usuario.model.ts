export interface Usuario{
    uid: string;
    email: string;
    rol: 'admin' | 'usuario' | 'cliente';
    activo: boolean;
}