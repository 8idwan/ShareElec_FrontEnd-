export class UserResponseModel {
    id!: number; // ✅ Match "ID" (C# PascalCase maps to camelCase in JSON)
    nom!: string;
    prenom!: string;
    email!: string;
    numeroTelephone!: string;
    sommeEnergie!: number; // ✅ Match "double" in C#
  }
  