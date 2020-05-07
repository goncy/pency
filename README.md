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
Completá todas las variables que aparecen en `.env.template`

Luego en consola ejecutá:
```bash
# Yarn
yarn
yarn dev

# O si usas npm
npm install
npm run dev
```

## ¿Cómo crear tienda estando en modo *desarrollo*?
Para poder crear una tienda y poder probar el código de forma local debemos tener las siguientes cosas:

 - Variables del archivo .env.development completas.
 - Tener corriendo el proyecto haciendo uso de los comandos.
    ```bash
    # yarn
    yarn && start

    # o si usas npm
    npm install && npm start
    ```

 - Postman ([descargar](https://www.postman.com/downloads/)).

## ¿Y ahora?
 - Comprobar que tu aplicación corre en **http://localhost:3000/**.
 - Abrir Postman.
 - Seleccionar POST Request y colocar como URL el siguiente valor:
			  `http://localhost:3000/api/tenant?slug=NOMBRE_DE_TU_TIENDA`
 - En Query Params colocar como *KEY* el valor `slug` y como *VALUE* el `NOMBRE_DE_TU_TIENDA`
 - En *Body* seleccionamos `x-www-form-urlencoded` y colocamos los valores en *KEY* y en *VALUE*:
```markdown

	|   KEY  |                    VALUE                         |
	|:------:|:------------------------------------------------:|
	|email   |             tuEmail@email.com                    |
	|password|             tuContraseña                         |
	|secret  |valor variable SECRET del archivo .env.development|

```
 - Hacemos click en Send y comprobamos si se creó la tienda entrando en: `http://localhost:3000/NOMBRE_DE_TU_TIENDA`
 -  Para acceder al panel de administración debemos entrar mediante el siguiente link: `http://localhost:3000/NOMBRE_DE_TU_TIENDA/admin`


## Qué puedo hacer con Pency?
Podés leer la licencia [acá](./LICENSE.md).
