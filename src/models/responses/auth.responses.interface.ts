export interface LoginResponse{
    msg : string,
    token : string
};

export interface RegisterResponse{
    acknowledged : boolean,
    insertedId : string
}