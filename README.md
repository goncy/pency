# Pency
Tu tienda online

## Qué es?
Pency es una tienda online multipropósito, pensada para quienes venden (o quieren vender) via WhatsApp.

## Qué tiene?
* Catálogo online
* Panel de administración para cargar productos
* Carrito de compra
* Imagen, precio y descripción para cada producto
* Opciones para cada producto (pueden modificar el precio del producto)
* Envío del pedido via WhatsApp
* Configuración de la tienda (color, título, descripción, imagen, logo, etc)

## Algo no me anda!
Podés crear un `issue` acá en GitHub

## Quiero ayudar!
Entrá a los `issues` acá en GitHub

## Quiero mi tienda!
Mandame un mail a gonzalo.pozzo4@gmail.com

## Tengo otra pregunta
Mandame un mail a gonzalo.pozzo4@gmail.com

## ¿Cómo puedo correr el proyecto?
Completá todas las variables que aparecen en `.env.template` y guardalo como `.env.development`

> Todas las variables de firebase se sacan del proyecto y las de firebase admin de una cuenta de servicio que podés encontrar en firebase yendo a `Configuración > Usuarios y permisos > Cuentas de servicio` y generando una nueva clave privada. El único campo diferente es `FIREBASE_PRIVATE_KEY` que antes de agregarlo al archivo `.env.[ambiente]` lo tenés que pasar a Base64 (podés usar cualquier convertor online). Luego el `next.config.js` se encarga de decodificarlo. Copialo con los \n, los espacios, todo, exactamente igual que como está en el archivo .json.

Luego en consola ejecutá:
```bash
# Yarn
yarn
yarn start

# O si usas npm
npm install
npm start
```
> Necesitás tener un .env.[ambiente] para cada ambiente en el que vas a correr la app

## ¿Cómo crear tienda estando en modo *desarrollo*?
Para poder crear una tienda y poder probar el código de forma local debemos tener las siguientes cosas:

- Variables del archivo .env.development completas.
- Tener corriendo el proyecto haciendo uso de los comandos.
```bash
# yarn
yarn && yarn dev

# o si usas npm
npm install && npm run dev
```

## Creando la tienda
 - Bajamos y abrimos [Postman](https://www.postman.com/downloads/).
 - Comprobamos que la aplicación corre en **http://localhost:3000/**.
 - Seleccionamos POST Request y colocamos como URL: `http://localhost:3000/api/tenant?slug=NOMBRE_DE_TU_TIENDA`
 - En Query Params agregamos la key `slug` dandole el `NOMBRE_DE_TU_TIENDA` como valor (minúsculas sin espacios)
 - En *Body* seleccionamos `x-www-form-urlencoded` y colocamos los siguientes valores:
```markdown

	|   KEY  |                    VALUE                         |
	|:------:|:------------------------------------------------:|
	|email   | tuEmail@email.com                                |
	|password| tuContraseña                                     |
	|secret  | valor de SECRET en .env.development              |

```
 - Hacemos click en `Send` y comprobamos si se creó la tienda entrando en: `http://localhost:3000/NOMBRE_DE_TU_TIENDA`
 -  Para acceder al panel de administración debemos entrar mediante el siguiente link: `http://localhost:3000/NOMBRE_DE_TU_TIENDA/admin`

 > Tomá en cuenta que los usuarios no se pueden repetir y que la aplicación actualmente no valida si ya existe otra tienda con ese slug, asegurate de que no pase!

## Qué puedo hacer con Pency?
Podés leer la licencia [acá](./LICENSE.md).
