export interface LoginDTO {
    Username: string;
    Password: string;
}

export interface CookieDTO {
    Token: string;
    CompleteName: string;
    UserId: number;
    Role: string;
}

export interface BaseUserDTO {
    Name: string,
    LastName: string;
    Login: LoginDTO;
}

export interface ContoCorrenteDTO {
    UserId: number;
    ContoId: number;
    TotalAmount: number;
    IsCanceled: boolean;
    NameConto: string;
    WhenCreated: Date;
}

export interface CategoryDTO {
    CategoryId: number;
    Name: string | null | undefined;
    Type: string | null | undefined;
    IsCanceled: boolean;
}

export interface MovimentiPerCategoriaDTO {
    UserId: number;
    ContoId: number;
    TotalAmount: number;
    CategoryName: string;
    Type: string;
    IsCanceled: boolean;
}

export interface MovimentoDTO {
    UsciteId: number;
    UserId: number;
    ContoId: number;
    CategoryId: number | null | undefined;
    TotalAmount: number| null | undefined;
    IsCanceled: boolean;
    WhenCreated: Date;
    Note: string| null | undefined;
    Type: string | null | undefined;
    CategoryName: string |null | undefined;
}

export interface DetailOperationDTO {
    UserId: number;
    ContoId: number;
    UsciteId: number;
    CategoryName: string;
    Type: string;
    IsCanceled: boolean;
    Note: string;
    WhenCreated: string | null;
    TotalAmount: number;
}

export interface ConfirmDialogModel {
  title: string,
  message: string,
  mode: DialogMode,
  value: number;
}

export enum DialogMode {
  ALERT = 0,
  CONFIRM = 1
}

export interface UserDTO {
    UserId: number;
    Username: string;
    Email: string;
    Role: string;
}
