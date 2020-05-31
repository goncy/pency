export default function validator(value: string) {
  return Boolean(value) || "Este campo es requerido";
}
