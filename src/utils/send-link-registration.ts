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
      'Something went wrong by sending the email. User has not been added',
      HttpStatus.BAD_REQUEST,
    );
  }
};
