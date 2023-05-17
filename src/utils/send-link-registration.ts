import { HttpException, HttpStatus } from '@nestjs/common';

export const sendLinkRegistration = async (
  email,
  newUser,
  url,
  usersService,
  mailService,
) => {
  try {
    await mailService.sendMail(
      email,
      'Rejestracja w Head Hunter',
      './register',
      {
        registrationLink: `${url}/${newUser.id}`,
      },
    );
  } catch (e) {
    await newUser.remove();
    await usersService.remove(newUser.user.id);
    throw new HttpException(
      'Coś poszło nie tak podczas wysyłania wiadomości e-mail. Użytkownik nie został dodany',
      HttpStatus.BAD_REQUEST,
    );
  }
};
