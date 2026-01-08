# 📱 Challenge Backend – Gestión de Empresas y Transferencias

## 👩‍💻 Autora
**Juliana María Florez Morales**  
Backend Developer  

---

## Descripción

Este proyecto implementa una API desarrollada en **NestJS** que permite gestionar la adhesión de empresas y la operatoria de transferencias asociadas a las mismas.

La solución fue diseñada aplicando principios de **Programación Orientada a Objetos (POO)** y una **arquitectura hexagonal (Clean Architecture)**, priorizando la separación de responsabilidades, el desacoplamiento entre capas y la facilidad de mantenimiento y testeo.

El dominio contempla dos tipos de empresas: **PyME** y **Corporativa**, las cuales comparten información general, pero difieren en su lógica de adhesión y operatoria. Estas diferencias se modelan mediante polimorfismo, evitando condicionales innecesarios y favoreciendo un diseño extensible.

Para simplificar la ejecución local y mantener el foco en la lógica de negocio y el diseño, se utiliza **persistencia en memoria**, desacoplada mediante interfaces (puertos) y adaptadores de infraestructura.

---

## Tecnologías utilizadas

- Node.js
- TypeScript
- NestJS (standalone)
- class-validator / class-transformer
- Swagger (OpenAPI)
- Jest (pruebas unitarias)

---

## Arquitectura

El proyecto sigue una **arquitectura hexagonal**, separando claramente:

- **Domain**: entidades, servicios de dominio y puertos (repositorios).
- **Application**: casos de uso, comandos y DTOs.
- **Infrastructure**: controladores HTTP, adaptadores de persistencia en memoria y providers de NestJS.

Esto permite:
- Independencia del framework en el dominio.
- Fácil reemplazo de infraestructura (por ejemplo, cambiar memoria por base de datos).
- Mayor testabilidad y claridad en la lógica de negocio.

---

## Modelo de dominio

### Company
Representa una empresa del sistema. Existen dos tipos:
- **PyME**
- **Corporativa**

Ambas comparten información general, pero se modelan como entidades distintas para permitir diferencias en comportamiento.

### Transfer
Representa una transferencia realizada por una empresa.  
Cada transferencia está asociada a una empresa mediante su `companyId`.

Las transferencias se gestionan como un agregado independiente, respetando el **Principio de Responsabilidad Única (SRP)**.

---

## Endpoints

### 1️ Registrar una empresa

**POST** `/company`

**Request body**
```json
{
  "name": "Stefanini Group",
  "type": "PYME"
}
```
**Request body**
```json
{
  "created": {
    "id": "36e440a2-446e-4c0c-97a3-a2b497d5fb6b"
  }
}
```

### 2 Obtener empresas que realizaron transferencias en el último mes

**GET** `/company`

**Response body**
```json
[
  {
    "id": "bf4af103-f146-4162-9197-92802d78b58f",
    "name": "Stefanini Group",
    "type": "PYME",
    "transfersLastMonthCount": 2
  },
  {
    "id": "2009e618-23f1-45ca-9e9d-5ef6a8a998ec",
    "name": "Software S.A.S",
    "type": "COPORATE",
    "transfersLastMonthCount": 1
  }
]
```
### 3 Registrar una transferencia

**POST** `/transfer`

**Request body**
```json
{
  "amount": 700000,
  "company_id": "bf4af103-f146-4162-9197-92802d78b58f"
}
```
## ☁️ Parte adicional – AWS (Teórica)
### AWS Lambda – Register Company

Se diseñó una AWS Lambda Function como Inbound Adapter, que:
- Recibe una solicitud HTTP desde API Gateway
- Valida el input
- Ejecuta el caso de uso RegisterCompanyHandler
- Persiste datos usando DynamoDB vía AWS SDK
```arduino
aws/
 ├─ lambda/company/register-company.lambda.ts
 └─ lamba/composition/register-company.composition.ts
```
### DynamoDB Repository (AWS SDK v3)
Implementación del puerto CompanyRepository usando @aws-sdk/client-dynamodb y @aws-sdk/lib-dynamodb.
Operaciones:
- save
- findById
- findByIds

Esto mantiene el dominio desacoplado de AWS.

## Persistencia 

La persistencia se realiza en memoria, utilizando arrays internos dentro de repositorios adaptadores.

Esta decisión fue tomada para:
- Cumplir con los requerimientos del challenge.
- Evitar complejidad innecesaria de infraestructura.
- Mantener el foco en el diseño, la lógica de negocio y la arquitectura.
- Los repositorios se inyectan mediante Dependency Injection, garantizando el uso de una única instancia compartida entre módulos.

## Manejo de errores

- 400 Bad Request: errores de validación.
- 404 Not Found: empresa inexistente al registrar una transferencia.
- 500 Internal Server Error: errores no controlados.

## Pruebas unitarias

Se incluirán pruebas unitarias enfocadas en:
- Casos de uso principales.
- Reglas de negocio del dominio.
- Repositorios en memoria.

El objetivo es validar la lógica sin depender de infraestructura externa.

Se pueden correr con 
```cmd
npm run test
```

## Ejecución local

### Requisitos
- Node.js >= 18
- npm o yarn

## Pasos
```cmd
npm install
npm run start:dev
```

### la aplicación está disponible en 
```cmd
http://localhost:8081/
```

### Swagger disponible en:
```cmd
http://localhost:8081/swagger-ui/doc
```

## Decisiones técnicas
- Se priorizó claridad de diseño sobre complejidad técnica.
- Se evitó el uso de Docker y bases de datos reales, según lo solicitado.
- Se aplicaron principios SOLID y buenas prácticas de Clean Code.
- Se buscó un diseño extensible, preparado para futuros cambios del dominio.