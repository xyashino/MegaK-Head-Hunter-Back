import { HttpException, HttpStatus } from '@nestjs/common';

export const userRegistration = async (
  email,
  newUser,
  role,
  url,
  usersService,
  mailService,
) => {
  try {
    newUser.user = await usersService.create({
      email,
      role,
    });
    await newUser.save();
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
