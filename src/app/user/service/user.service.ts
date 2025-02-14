Assil
assil_dk_82199
En ligne

Assil — 19/11/2024 17:03
package com.example.devmobilereseau;


import android.content.Intent;

import android.net.Uri;
Afficher plus
message.txt
4 Ko
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
Afficher plus
message.txt
3 Ko
https://www.youtube.com/watch?v=g2Iibnnqga0
YouTube
Foxandroid
Upload Image to Firebase in Android Studio | Upload Image to Fireba...
Image
Assil — 19/11/2024 18:02
plugins {
    id("com.android.application")
    id("com.google.gms.google-services")
}

android {
    namespace = "com.example.devmobilereseau"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.devmobilereseau"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    buildFeatures {
        viewBinding = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.2.0")
    implementation("com.google.firebase:firebase-database:21.0.0")
    implementation("com.google.firebase:firebase-storage:21.0.1")

    // Add Firestore with exclusion to resolve duplicate class issue
    implementation("com.google.firebase:firebase-firestore:23.0.3")
    implementation("com.google.firebase:firebase-common:21.0.0")

    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}
package com.example.devmobilereseau;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
Afficher plus
message.txt
7 Ko
Duplicate class com.google.firebase.Timestamp found in modules firebase-common-21.0.0-runtime (com.google.firebase:firebase-common:21.0.0) and firebase-firestore-23.0.3-runtime (com.google.firebase:firebase-firestore:23.0.3)
mehdi — 19/11/2024 18:05
dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.2.0")
    implementation("com.google.firebase:firebase-database:20.3.0")
    implementation("com.google.firebase:firebase-storage:20.2.1")
    implementation("com.google.firebase:firebase-firestore:24.7.1") // Updated Firestore

    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}
Assil — 19/11/2024 18:11
package com.example.devmobilereseau;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
Afficher plus
message.txt
7 Ko
mehdi — 19/11/2024 18:16
FirebaseApp.initializeApp(this);
Assil — 19/11/2024 18:23
package com.example.devmobilereseau;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
Afficher plus
message.txt
8 Ko
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
Afficher plus
message.txt
4 Ko
plugins {
    id("com.android.application")
    id("com.google.gms.google-services")
}

android {
    namespace = "com.example.devmobilereseau"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.devmobilereseau"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    buildFeatures {
        viewBinding = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.2.0")
    implementation("com.google.firebase:firebase-database:20.3.0")
    implementation("com.google.firebase:firebase-storage:20.2.1")
    implementation("com.google.firebase:firebase-firestore:24.7.1") // Updated Firestore

    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}
Assil — 22/11/2024 14:54
import numpy as np
import matplotlib.pyplot as plt

# Étape 1 : Initialisation
def initialize_population(pop_size, num_variables):
    """Générer une population initiale aléatoire."""
Afficher plus
message.txt
9 Ko
donc je veux a chaque etapes :
INITIALISATION ET CREATION DE LA POPULATION 
CROISEMENT ET MUTATION
Tri Non Dominé et Sélection des Fronts
Normalisation et Association aux Points de Référence
Nichage et Sélection pour la Prochaine Génération

Je veux a chaque sortie d'une etape avoir un diagramme
mehdi — 27/11/2024 14:33
j
Pour exécuter le code en fonction des paramètres et de la configuration (comme la taille de la population et le nombre d'objectifs), voici une explication de l'exécution du code pour un problème DTLZ2, basé sur l'algorithme NSGA-III :

Étapes pour l'exécution du code avec DTLZ2 :
Initialisation des paramètres :

Définir les paramètres globaux :
Afficher plus
message.txt
3 Ko
Assil — 27/11/2024 14:34
s
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Étape 1 : Initialisation en 3D avec bornes personnalisées
def initialize_population_3d(pop_size, lower_bounds, upper_bounds):
Afficher plus
message.txt
3 Ko
Assil — 27/11/2024 19:32
Type de fichier joint : archive
nsga3cpp.zip
2.00 MB
Assil — 04/12/2024 19:27
Type de fichier joint : acrobat
Compte Rendu Réseaux Les Tubes Dekhil Assil.pdf
641.84 KB
Assil — 10/12/2024 20:04
Transféré
https://filesender.renater.fr/?s=download&token=334adc87-e202-4e8b-9b9b-2d0e3acef352
mehdi — 11/12/2024 10:48
merci
Assil — 13/12/2024 19:17
Transféré
https://filesender.renater.fr/?s=download&token=6a74ff7b-b98f-41f1-9f57-e7ddae2e911f
mehdi a commencé un appel qui a duré 10 minutes. — 02/01/2025 12:07
Assil — 02/01/2025 12:23
Image
Assil a commencé un appel qui a duré 3 minutes. — 02/01/2025 12:23
Assil — 10/02/2025 08:38
//3D Point Cloud Visualization
//Filename: main.cpp
//Release: 1.0 (version ECM)
//*********************************************************
//Librairie STL
#include <iostream>
Afficher plus
message.txt
8 Ko
Assil — 10/02/2025 08:59
Type de fichier joint : archive
Tp2.zip
2.44 MB
Assil — Hier à 11:57
import { RouterModule, Routes } from '@angular/router';
import { OffreListComponent } from './offre/offre-list/offre-list.component';
import { NgModule } from '@angular/core';
import { MesOffresComponent } from './offre/mes-offres/mes-offres.component';


export const routes: Routes = [ {path:'',component:OffreListComponent},
                                 {path:'mesoffres',component:MesOffresComponent},
  {
    path: 'offre',
    loadChildren: () => import('./offre/offre.module')
      .then(m => m.OffreModule),

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffreRoutingModule } from './offre-routing.module';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OffreRoutingModule,
    AddOffreComponent,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class OffreModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffreListComponent } from './offre-list/offre-list.component';

const routes: Routes = [
  {path:"offres",component:OffreListComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
mehdi — Aujourd’hui à 09:38
def E(x):
    E=0
    for i in range(len(data)):
        E+=(data[i][1]-(x[0]data[i][0]+x[1]))**2
    return E
def gradE(x):
    gradE=np.array((0,0),dtype=float)
    for i in range(len(data)):
        gradE+=np.array((data[i][0],1))-2(data[i][1]-(x[0]data[i][0]+x[1]))
    return gradE

gd=GradientDescent(gradE, learning_rate=0.001,  max_iterations=10000,epsilon=0.01)

a-np.array([0.75,-2])
result=gd.descent(a)
num_epochs=gd.num_iterations
print("a= ",a)
print("result= ",result)
print("f(result)= ",f(result))
print("nb iterations= ",num_epochs)
a=np.array([0.75,-2])
result=gd.descent(a)
num_epochs=gd.num_iterations
print("a= ",a)
print("result= ",result)
print("E(result)= ",E(result))
print("nb iterations= ",num_epochs)
Assil — Aujourd’hui à 09:40
Données
data = np.array([
    [4, 1],  # A1
    [7, 3],  # A2
    [8, 3],  # A3
    [10, 6], # A4
    [12, 7]  # A5
])


def E(x):
    E=0
    for i in range(len(data)):
        E+=(data[i][1]-(x[0] * data[i][0]+ x[1]))*2
    return E
def gradE(x):
    gradE=np.array((0,0),dtype=float)
    for i in range(len(data)):
        gradE+=np.array((data[i][0],1)) -2 * (data[i][1]- (x[0] * data[i][0]+x[1]))
    return gradE

gd=GradientDescent(gradE, learning_rate=0.001,  max_iterations=10000,epsilon=0.01)

a=np.array([0.75,-2])
result=gd.descent(a)
num_epochs=gd.num_iterations
print("a= ",a)
print("result= ",result)
print("E(result)= ",E(result))
print("nb iterations= ",num_epochs)
mehdi — Aujourd’hui à 19:22
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity.Data;
Afficher plus
message.txt
6 Ko
using System.ComponentModel.DataAnnotations;

namespace SherElec_Back_end.Model
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public required string Nom { get; set; }
        public required string Prenom { get; set; }
        public required string Email { get; set; }
        public required string NumeroTelephone { get; set; }
        public required string MotDePasse { get; set; }
        public double sommeEnergie { get;  set; }

    }
}
mehdi — Aujourd’hui à 19:33
namespace SherElec_Back_end.Models
{
    public class EmailVerifier
    {
        public int Id { get; set; }

        public string VerificationCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string Nom { get; set; }
        public required string Prenom { get; set; }
        public required string Email { get; set; }
        public required string NumeroTelephone { get; set; }
        public required string MotDePasse { get; set; }
        public double sommeEnergie { get; set; }
    }

}


EmailVerifier.cs
namespace SherElec_Back_end.DTO
{
    public class UserRequestDTO
    {
        public string nom { get; set; }
        public string prenom { get; set; }
        public string email { get; set; }
        public string numeroTelephone { get; set; }
        public string motDePasse { get; set; }
    }
}

UserRequestDTO.cs
namespace SherElec_Back_end.DTO
{
    public class UserRespenseDTO
    {
        public int ID { get; set; }
        public string nom { get; set; }
        public string prenom { get; set; }
        public string email { get; set; }
        public string numeroTelephone { get; set; }
        public double sommeEnergie { get; set; }

    }
}


UserRespenseDTO.cs
using SherElec_Back_end.DTO;

namespace SherElec_Back_end.DTOs
{
    public class VerificationRequest
    {
        public string Email { get; set; }
        public string Code { get; set; }

    }
}

VerificationRequest.cs
using AutoMapper;
using SherElec_Back_end.DTO;
using SherElec_Back_end.Model;

namespace SherElec_Back_end.Mapper
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            // Configuration des mappings
            CreateMap<User, UserRespenseDTO>();
            CreateMap<UserRequestDTO, User>();
        }
    }
}

using AutoMapper;
using SherElec_Back_end.DTO;
using SherElec_Back_end.Model;

namespace SherElec_Back_end.Mapper
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            // Configuration des mappings
            CreateMap<User, UserRespenseDTO>();
            CreateMap<UserRequestDTO, User>();
        }
    }
}
UserMapping
mehdi — Aujourd’hui à 19:41
using SherElec_Back_end.DTO;
using SherElec_Back_end.Model;
using SherElec_Back_end.Models;

namespace SherElec_Back_end.Repositories
{
    public interface IUserRepository
    {
        Task AddUser(User user);
        Task<User> GetUserById(int id);
         Task<User> GetUserByEmailAsync(string email);


        Task UpdateUser(User user);
        Task DeleteUser(int id);
        Task AddEmailVerification(EmailVerifier emailVerifier);

        Task<EmailVerifier> GetEmailVerification(string email, string code);


    }
}

IUserRepository
using Microsoft.EntityFrameworkCore;
using SherElec_Back_end.DTO;
using SherElec_Back_end.Model;
using SherElec_Back_end.Models;
using SherElec_Back_end.Repositories;
using System.Collections.Generic;
Afficher plus
message.txt
3 Ko
mehdi — Aujourd’hui à 19:54
using SherElec_Back_end.DTO;
using SherElec_Back_end.Model;

namespace SherElec_Back_end.Services
{
    public interface IUserService
    {
        Task ajoutCompteAsync(UserRequestDTO req);
        string GenererToken(UserRespenseDTO utilisateur);
        Task<UserRespenseDTO> AuthentifierUtilisateurAsync(string email, string motDePasse);

        Task<UserRespenseDTO> UpdateUserAsync(int id, UserRequestDTO requestDto);
        Task removeUser(int id);
        Task<UserRespenseDTO> GetUserInfo(int id);
        Task InitiateEmailVerification(UserRequestDTO req);
        Task<bool> VerifyEmailAndCreateUser(string email, string code);

    }
}
IUserService
using AutoMapper;
using Microsoft.Extensions.Logging;

using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
Afficher plus
message.txt
8 Ko
public DbSet<EmailVerifier> EmailVerifierTable { get; set; }
using Microsoft.EntityFrameworkCore;
using SherElec_Back_end.DTO;
using SherElec_Back_end.Model;
using SherElec_Back_end.Models;
using SherElec_Back_end.Repositories;
using System.Collections.Generic;
Afficher plus
message.txt
3 Ko
mehdi — Aujourd’hui à 20:06
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShareElec.Repositories;
using SherElec_Back_end.Mapper; // Assure-toi que ce namespace est correct
Afficher plus
message.txt
4 Ko
using AutoMapper;
using SherElec_Back_end.DTO;
using SherElec_Back_end.Model;

namespace SherElec_Back_end.Mapper
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            // Configuration des mappings
            CreateMap<User, UserRespenseDTO>();
            CreateMap<UserRequestDTO, User>();
        }
    }
}
mehdi — Aujourd’hui à 20:36
UserController
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity.Data;
Afficher plus
message.txt
6 Ko
Assil — Aujourd’hui à 20:41
dotnet ef migrations add InitialCreate
dotnet ef database update
mehdi — Aujourd’hui à 20:48
"SmtpSettings": {
    "Server": "smtp.gmail.com",
    "Port": 587,
    "SenderEmail": "badr8boukries@gmail.com",
    "SenderName": "<@noreply>",
    "SenderPassword": "aobb zijw quli ocuf",
    "#",": null,
    "EnableSsl": true
  },


  "Jwt": {
    "Issuer": "TonNomDeDomaine",
    "Audience": "TonPublic",
    "Secret": "VotreClefSecreteTresLongueEtComplexe123!@#$%^&"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": ""
}
"SmtpSettings": {
    "Server": "smtp.gmail.com",
    "Port": 587,
    "SenderEmail": "badr8boukries@gmail.com",
    "SenderName": "<@noreply>",
    "SenderPassword": "aobb zijw quli ocuf",
    "#",": null,
    "EnableSsl": true
  },


  "Jwt": {
    "Issuer": "TonNomDeDomaine",
    "Audience": "TonPublic",
    "Secret": "VotreClefSecreteTresLongueEtComplexe123!@#$%^&"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": ""
}
mehdi — Aujourd’hui à 21:02
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UserRoutingModule } from './user-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    VerifyEmailComponent,
    UserRoutingModule,
    HttpClientModule
  ],

})
export class UserModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [

    { path: 'profile', component: ProfileComponent },
    {path: 'verify-email', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequestModel } from '../model/user-request.model';
import { catchError } from 'rxjs/operators';
import { UserResponseModel } from '../model/user-response.model';
Afficher plus
message.txt
3 Ko
﻿
mehdi
mehdika_21
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequestModel } from '../model/user-request.model';
import { catchError } from 'rxjs/operators';
import { UserResponseModel } from '../model/user-response.model';
import { LoginRequestModel } from '../model/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5240/api/user';

  constructor(private http: HttpClient) {}

  // ✅ Changed to match backend endpoint path
  signUp(userData: UserRequestModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log('Sending signup request:', userData); // Debug log

    return this.http.post(`${this.baseUrl}/sign-in`, userData, { headers })
      .pipe(
        catchError(error => {
          console.error('Signup error details:', error);
          throw error;
        })
      );
  }
  

  // ✅ Changed to match backend endpoint path
  getUserInfo(id: number): Observable<UserResponseModel> {
    return this.http.get<UserResponseModel>(`${this.baseUrl}/${id}`);
  }

  // ✅ Changed to match backend endpoint path
  login(credentials: LoginRequestModel): Observable<{ token: string; utilisateur: UserResponseModel }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<{ token: string; utilisateur: UserResponseModel }>(
      `${this.baseUrl}/login`, 
      credentials,
      { headers }
    );
  }

  // ✅ Added to match backend endpoint
  verifyEmail(email: string, code: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/veriferEmail`, { email, code });
  }
  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/del/${id}`, { headers });
  }
  
}