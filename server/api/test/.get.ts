import Handlebars from "handlebars";


export default defineEventHandler(async (event) => {
  console.log("here");
  const { sendMail } = useNodeMailer()

  const template = Handlebars.compile('{{ name }}');
  const html = template({ name: 'myself' });
  try {
    sendMail({ subject: 'me', html, to: 'developer413ksz@gmail.com'})
  } catch (error) {
    console.log(error);
  }
  return {message:"email sent"}
})
