import Handlebars from "handlebars";
import fs from 'fs'

export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer()
  let htmlTeamplate = fs.readFileSync('./server/emailTemplates/layouts/verifyEmail.html', 'utf-8');
  htmlTeamplate = await Handlebars.compile(htmlTeamplate)({ name: 'John Doe' });
  try {
    sendMail({ subject: 'me', html: htmlTeamplate, to: 'developer413ksz@gmail.com'})
  } catch (error) {

  }
  return {message:"email sent"}
})
