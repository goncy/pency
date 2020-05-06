## ¿Cómo crear tienda estando en modo *desarrollo*?

Para poder crear una tienda y poder probar el código de forma local debemos tener las siguientes cosas:

 - Variables del archivo .env.development completas.
 - Tener corriendo el proyecto haciendo uso de los comandos.
	> **Si usas Yarn**
	yarn *(si todavía no hiciste instalación de las dependencias)*
	yarn start
	>
	> **Si usas npm**
	> npm install *(si todavía no hiciste instalación de las dependencias)*
	> npm start

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
