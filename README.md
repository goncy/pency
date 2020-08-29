# Pency
Tu tienda online, fácil.

## Qué es?
Pency es una tienda online multipropósito, pensada para quienes venden (o quieren vender) vía WhatsApp.

## Qué tiene?
* Catálogo online
* Panel de administración para cargar productos
* Carrito de compra
* Imagen, precio y descripción para cada producto
* Opciones para cada producto (pueden modificar el precio del producto)
* Envío del pedido vía WhatsApp
* Configuración de la tienda (color, título, descripción, imagen, logo, etc)

## Algo no me anda!
Podés crear un `issue` acá en GitHub.

## Quiero ayudar!
Entrá a los `issues` acá en GitHub

## Quiero mi tienda!
Mandame un mail a gonzalo.pozzo4@gmail.com

## Tengo otra pregunta
Mandame un mail a gonzalo.pozzo4@gmail.com

## ¿Cómo puedo correr el proyecto?
Completá todas las variables que aparecen en `.env.template` y guardalo como `.env.development.local`

Todas las variables de firebase las encontramos en la configuración del proyecto de firebase, `GOOGLE_API_KEY` es la api key de firebase, pero como también necesitamos usarla para Google Places le cambié el nombre, tomá en cuenta que para que funcione el campo de `ubicación` necesitás tener la api de places habilitada en el proyecto y billing activado (o podés no usar el campo / deshabilitarlo, la app funciona sin eso).

En `firebase/credentials.ts` están las credenciales de firebase admin para cada ambiente, necesitás obtener el json de una cuenta de servicio que podés encontrar en firebase yendo a `Configuración > Usuarios y permisos > Cuentas de servicio` y generando una nueva clave privada. Después andá a https://www.devglan.com/online-tools/aes-encryption-decryption y seleccioná tu archivo de credenciales, en `mode` seleccioná `CBC`, `Key Size in Bits` `128`, `Enter IV (Optional)` la misma clave iv que en tu archivo `.env.development.local`, `Enter Secret Key` la misma secret key que en tu archivo `.env.development.local`, `Output Text Format` en `Base64`, clickea `Encrypt` y pegá el contenido en `firebase/credentials.ts` en el ambiente que corresponda.

Luego en consola ejecutá:
```bash
# Yarn
yarn
yarn start

# O si usas npm
npm install
npm start
```
> Necesitás tener un .env.[ambiente].local para cada ambiente en el que vas a correr la app.

## ¿Cómo correr Storybook?
Storybook nos permite observar los distintos componentes visuales utilizados en el proyecto en un ambiente aislado.

Ejecutá en la consola los siguientes comandos para abrir Storybook:

```bash
# Yarn
yarn storybook

# O si usas npm
npm run storybook
```

## Configurando Firebase
Para esta aplicación vamos a necesitar dos cosas de Firebase, la primera va a ser configurar las reglas de firestore (las podés encontrar en el archivo `firestore.rules`) y habilitar en firebase el inicio de sesión con usuario y contraseña (lo haces en Firebase desde `Auth > Sign in methods`).

## Configurando Cloudinary
También vamos a necesitar una cuenta en Cloudinary para alojar las imágenes de la tienda. De allí vamos a necesitar el Cloudinary Cloud name para la variable `CLOUDINARY_CLOUD` del _environment_ (lo vas a ver arriba a la derecha una vez que inicies sesión). Además vamos a tener que ir a `Settings > Upload` donde podemos configurar los presets. El `CLOUDINARY_PRESET_LOW` se va a usar para las imágenes de los productos cargados y `CLOUDINARY_PRESET_HIGH` para las imágenes de banner y logo. Tenemos que asegurarnos de setear el Signing Mode en *Unsigned*, el resto de las configuraciones depende de tus preferencias. También vamos a setear la variable `CLOUDINARY_FOLDER` con el nombre de la carpeta donde queremos que se guarden las imágenes dentro de cloudinary, "pency", por ejemplo.

## Configurando el proyecto
Una vez que tengamos nuestro `.env.[ambiente].local` listo, vamos a la consola, nos paramos en la carpeta de nuestro proyecto y ejecutamos:

```bash
# yarn
yarn && yarn dev

# o si usas npm
npm install && npm run dev
```

## Creando la tienda
 - Bajamos y abrimos [Postman](https://www.postman.com/downloads/).
 - Comprobamos que la aplicación este corriendo en **http://localhost:3000/**.
 - Seleccionamos POST Request y colocamos como URL: `http://localhost:3000/api/tenant` (si bien podemos poner lo que queramos en slug recomiendo que sean solo letras minúsculas y guiones)
 - En `body` seleccionamos `x-www-form-urlencoded` y colocamos los siguientes valores:
```markdown
	|   KEY  |                    VALUE                         |
	|:------:|:------------------------------------------------:|
	|slug    | slug de la tienda                                |
	|email   | tuEmail@email.com                                |
	|password| tuContraseña                                     |
	|secret  | valor de SECRET en .env.[ambiente].local         |
```
 - Hacemos click en `Send` y comprobamos si se creó la tienda seteando la variable `STORE_SLUG` con el nombre de la tienda y entrando en: `http://localhost:3000`
 -  Para acceder al panel de administración debemos entrar mediante el siguiente link: `http://localhost:3000/admin`
 > Tomá en cuenta que ya que usamos el uid del usuario como id del documento, no podémos tener más de un usuario por tienda ni tampoco más de una tienda por usuario.

## ¿Qué puedo hacer con Pency?
Podés leer la licencia [acá](./LICENSE.md). En resumen, podés usar Pency para lo que quieras mientras no lucres con eso y menciones la fuente original cuando lo uses 🥰.
