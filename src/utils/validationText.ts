export function validation(text: string) {
  const regexp = /^[а-яіa-z\d\s-_.:]+$/i;
  return regexp.test(text);
}
